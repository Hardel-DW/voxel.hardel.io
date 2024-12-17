import { Identifier } from "@/lib/minecraft/core/Identifier.ts";
import { isPresentInTag } from "@/lib/minecraft/core/Tag.ts";
import {
    type Analysers,
    type DataDrivenElement,
    type GetAnalyserMinecraft,
    type GetAnalyserVoxel,
    type VoxelElement,
    getAnalyserForVersion
} from "@/lib/minecraft/core/engine/Analyser.ts";
import { calculateInitialToggle } from "@/lib/minecraft/core/engine/managers/InitialToggle.ts";
import type { ToolConfiguration } from "@/lib/minecraft/core/schema/primitive";
import type { ToggleSectionMap } from "@/lib/minecraft/core/schema/primitive/toggle";
import { type RegistryElement, getRegistry, parseZip, readDatapackFile } from "@/lib/minecraft/mczip.ts";
import type { TagType } from "@voxel/definitions";
import { Logger } from "./migrations/logger";
import type { Log } from "./migrations/types";
import type { Unresolved } from "./resolver/field/type";

interface PackMcmeta {
    pack: {
        pack_format: number;
        description: string;
    };
}

export type Parser<T extends VoxelElement, K extends DataDrivenElement, UseTags extends boolean = false> = UseTags extends true
    ? (element: RegistryElement<K>, tags: string[]) => RegistryElement<T>
    : (element: RegistryElement<K>) => RegistryElement<T>;

export function parseDatapackElement<T>(files: Record<string, Uint8Array>, config: string): RegistryElement<T>[] {
    return getRegistry<T>(files, config);
}

export interface ParseDatapackResult<T extends VoxelElement> {
    name: string;
    files: Record<string, Uint8Array>;
    elements: RegistryElement<T>[];
    version: number;
    toggleSection: ToggleSectionMap;
    currentElementId: Identifier;
    isJar: boolean;
    configuration: Unresolved<ToolConfiguration>;
    logger: Logger;
}

/**
 * Parses a datapack and returns the elements.
 */
export async function parseDatapack<T extends keyof Analysers>(
    tool: T,
    file: FileList
): Promise<ParseDatapackResult<GetAnalyserVoxel<T>> | string> {
    const isJar = file[0].name.endsWith(".jar");
    const files = await parseZip(file[0]);

    const packMcmetaFile = files["pack.mcmeta"];
    if (!packMcmetaFile) {
        return "tools.enchantments.warning.invalid_datapack";
    }

    const packMcmeta: PackMcmeta = JSON.parse(new TextDecoder().decode(packMcmetaFile));
    const packFormat = packMcmeta.pack.pack_format;
    const description = packMcmeta.pack.description;
    const namespaces = Object.keys(files)
        .filter((path) => path.startsWith("data/"))
        .map((path) => path.split("/")[1])
        .filter((namespace, index, self) => namespace && self.indexOf(namespace) === index);

    const analyserResult = getAnalyserForVersion(tool, packFormat);
    if (!analyserResult) return "tools.enchantments.warning.no_analyser";

    const { analyser, config } = analyserResult;
    if (!config) return "tools.enchantments.warning.no_config";
    const initialToggle = calculateInitialToggle(config.interface);

    const main = config.analyser.registries.main;
    if (typeof main !== "string") {
        throw new Error("Main registry must be a string");
    }

    const mainRegistry = parseDatapackElement<GetAnalyserMinecraft<T>>(files, main);

    const tagsRegistry = config.analyser.registries.tags ? parseDatapackElement<TagType>(files, config.analyser.registries.tags) : [];

    const compiled = mainRegistry.map((element) => {
        const tags = tagsRegistry
            .filter((tag) => isPresentInTag(tag, element.identifier.toString()))
            .map((tag) => tag.identifier.toString());

        return analyser.parser(element, tags);
    });

    if (compiled.length === 0) return "tools.enchantments.warning.no_elements";
    const name = `Modified-${file[0].name.replace(/\.(zip|jar)$/, "")}`;

    // Chercher le fichier de log dans le datapack
    const logFile = files["voxel/logs.json"];
    const id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const date = new Intl.DateTimeFormat("fr-FR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    }).format(new Date());

    let logger: Logger = new Logger(id, date, packFormat, isJar, {
        name,
        description,
        namespaces
    });
    if (logFile) {
        const existingLog: Log = JSON.parse(new TextDecoder().decode(logFile));
        logger = new Logger(existingLog.id, existingLog.date, existingLog.version, existingLog.isModded, existingLog.datapack, existingLog);
    }

    return {
        name,
        files,
        elements: compiled,
        version: packFormat,
        toggleSection: initialToggle,
        currentElementId: Identifier.sortRegistry(compiled)[0].identifier,
        isJar,
        configuration: config,
        logger
    };
}

/**
 * Parse un élément spécifique à partir d'un identifiant et du contexte
 */
export function parseSpecificElement<T extends keyof Analysers>(
    identifier: Identifier,
    files: Record<string, Uint8Array>,
    version: number,
    tool: T
): RegistryElement<GetAnalyserVoxel<T>> | undefined {
    const dataDrivenElement = readDatapackFile<GetAnalyserMinecraft<T>>(files, identifier);

    if (!dataDrivenElement || !version) return undefined;
    const analyserResult = getAnalyserForVersion(tool, version);
    if (!analyserResult?.analyser) return undefined;

    const tagsRegistry = analyserResult.config.analyser.registries.tags
        ? parseDatapackElement<TagType>(files, analyserResult.config.analyser.registries.tags)
        : [];

    const tags = tagsRegistry.filter((tag) => isPresentInTag(tag, identifier.toString())).map((tag) => tag.identifier.toString());

    return analyserResult.analyser.parser(
        {
            identifier,
            data: dataDrivenElement
        },
        tags
    );
}

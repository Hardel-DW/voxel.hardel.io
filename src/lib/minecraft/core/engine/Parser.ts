import type { PackMcmeta } from "@/lib/minecraft/core/Datapack.ts";
import type { ConfiguratorConfigFromDatapack, DataDrivenElement, VoxelElement } from "@/lib/minecraft/core/Element";
import { Identifier, type IdentifierObject } from "@/lib/minecraft/core/Identifier.ts";
import { type DataDrivenRegistryElement, type VoxelRegistryElement, getRegistry, sortRegistry } from "@/lib/minecraft/core/Registry";
import { isPresentInTag } from "@/lib/minecraft/core/Tag.ts";
import {
    type Analysers,
    type GetAnalyserMinecraft,
    type GetAnalyserVoxel,
    getAnalyserForVersion
} from "@/lib/minecraft/core/engine/Analyser.ts";
import { calculateInitialToggle } from "@/lib/minecraft/core/engine/managers/InitialToggle.ts";
import type { ToolConfiguration } from "@/lib/minecraft/core/schema/primitive";
import type { ToggleSectionMap } from "@/lib/minecraft/core/schema/primitive/toggle";
import { getVoxelConfig, parseZip, readDatapackFile } from "@/lib/minecraft/mczip.ts";
import type { TagType } from "@voxel/definitions";
import { Logger } from "./migrations/logger";
import type { Log } from "./migrations/types";

export interface ParserParams<K extends DataDrivenElement> {
    element: DataDrivenRegistryElement<K>;
    tags?: string[];
    configurator?: ConfiguratorConfigFromDatapack;
}

export type Parser<T extends VoxelElement, K extends DataDrivenElement> = (params: ParserParams<K>) => VoxelRegistryElement<T>;

export function parseDatapackElement<T extends DataDrivenElement>(
    files: Record<string, Uint8Array>,
    config: string
): DataDrivenRegistryElement<T>[] {
    return getRegistry<T>(files, config);
}

export interface ParseDatapackResult<T extends VoxelElement> {
    name: string;
    files: Record<string, Uint8Array>;
    elements: Map<string, T>;
    version: number;
    identifiers: IdentifierObject[];
    toggleSection: ToggleSectionMap;
    currentElementId: string;
    isJar: boolean;
    configuration: ToolConfiguration;
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
    const files = await parseZip(new Uint8Array(await file[0].arrayBuffer()));

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

    const mainRegistryIdentifiers = mainRegistry.map((element) => element.identifier);
    const tagsRegistryIdentifiers = tagsRegistry.map((element) => element.identifier);

    const compiled = mainRegistry.map((element) => {
        const configurator = getVoxelConfig(files, element.identifier);
        const tags = tagsRegistry
            .filter((tag) => isPresentInTag(tag, new Identifier(element.identifier).toString()))
            .map((tag) => new Identifier(tag.identifier).toString());

        return analyser.parser({
            element,
            tags,
            configurator
        });
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

    let logger: Logger = new Logger({
        id,
        date,
        version: packFormat,
        isModded: isJar,
        datapack: {
            name,
            description,
            namespaces
        },
        isMinified: true,
        logs: []
    });

    if (logFile) {
        const existingLog: Log = JSON.parse(new TextDecoder().decode(logFile));
        logger = new Logger(existingLog);
    }

    return {
        name,
        files,
        elements: new Map(compiled.map((element) => [element.identifier, element.data])),
        version: packFormat,
        toggleSection: initialToggle,
        identifiers: [...mainRegistryIdentifiers, ...tagsRegistryIdentifiers],
        currentElementId: sortRegistry(compiled)[0].identifier,
        isJar,
        configuration: config,
        logger
    };
}

/**
 * Parse un élément spécifique à partir d'un identifiant et du contexte
 */
export function parseSpecificElement<T extends keyof Analysers>(
    identifier: IdentifierObject,
    files: Record<string, Uint8Array>,
    version: number,
    tool: T
): VoxelRegistryElement<GetAnalyserVoxel<T>> | undefined {
    const dataDrivenElement = readDatapackFile<GetAnalyserMinecraft<T>>(files, identifier);

    if (!dataDrivenElement || !version) return undefined;
    const analyserResult = getAnalyserForVersion(tool, version);
    if (!analyserResult?.analyser) return undefined;

    const tagsRegistry = analyserResult.config.analyser.registries.tags
        ? parseDatapackElement<TagType>(files, analyserResult.config.analyser.registries.tags)
        : [];

    const tags = tagsRegistry
        .filter((tag) => isPresentInTag(tag, new Identifier(identifier).toString()))
        .map((tag) => new Identifier(tag.identifier).toString());

    const configurator = getVoxelConfig(files, identifier);
    return analyserResult.analyser.parser({
        element: {
            identifier,
            data: dataDrivenElement
        },
        tags,
        configurator
    });
}

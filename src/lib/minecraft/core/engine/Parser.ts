import type { ConfiguratorContextType } from "@/components/tools/ConfiguratorContext.tsx";
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
import { type RegistryElement, getRegistry, parseZip, readDatapackFile } from "@/lib/minecraft/mczip.ts";
import type { TagType } from "@voxel/definitions";
import { Logger } from "./migrations/logger";
import type { Log } from "./migrations/types";

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

/**
 * Parses a datapack and returns the elements.
 * @param context
 * @param file
 */
export async function parseDatapack<T extends keyof Analysers>(
    context: ConfiguratorContextType<GetAnalyserVoxel<T>>,
    file: FileList
): Promise<string | null> {
    const isJar = file[0].name.endsWith(".jar");
    const files = await parseZip(file[0]);

    const packMcmetaFile = files["pack.mcmeta"];
    if (!packMcmetaFile) return "tools.enchantments.warning.invalid_datapack";
    const packMcmeta: PackMcmeta = JSON.parse(new TextDecoder().decode(packMcmetaFile));
    const packFormat = packMcmeta.pack.pack_format;
    const description = packMcmeta.pack.description;
    const namespaces = Object.keys(files)
        .filter((path) => path.startsWith("data/"))
        .map((path) => path.split("/")[1])
        .filter((namespace, index, self) => namespace && self.indexOf(namespace) === index);

    const analyserResult = getAnalyserForVersion(context.tool, packFormat);
    if (!analyserResult) return "tools.enchantments.warning.no_analyser";

    const { analyser, config } = analyserResult;
    if (!config) return "tools.enchantments.warning.no_config";
    const initialToggle = calculateInitialToggle(config.interface);

    const mainRegistry = parseDatapackElement<GetAnalyserMinecraft<T>>(files, config.parser.registries.main);
    const tagsRegistry = config.parser.registries.tags ? parseDatapackElement<TagType>(files, config.parser.registries.tags) : [];

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
    let logger: Logger;

    if (logFile) {
        try {
            const existingLog: Log = JSON.parse(new TextDecoder().decode(logFile));
            logger = new Logger(existingLog.version, existingLog.isModded, existingLog.datapack, existingLog);
        } catch (e) {
            logger = new Logger(packFormat, isJar, {
                name,
                description,
                namespaces
            });
        }
    } else {
        logger = new Logger(packFormat, isJar, {
            name,
            description,
            namespaces
        });
    }

    context.setLogger(logger);

    context.setName(name);
    context.setFiles(files);
    context.setElements(compiled);
    context.setVersion(packFormat);
    context.setToggleSection(initialToggle);
    context.setCurrentElementId(Identifier.sortRegistry(compiled)[0].identifier);
    context.setIsJar(isJar);
    context.setConfiguration(config);
    return null;
}

/**
 * Parse un élément spécifique à partir d'un identifiant et du contexte
 */
export function parseSpecificElement<T extends keyof Analysers>(
    identifier: Identifier,
    context: ConfiguratorContextType<GetAnalyserVoxel<T>>
): RegistryElement<GetAnalyserVoxel<T>> | undefined {
    const dataDrivenElement = readDatapackFile<GetAnalyserMinecraft<T>>(context.files, identifier);

    if (!dataDrivenElement || !context.version) return undefined;
    const analyserResult = getAnalyserForVersion(context.tool, context.version);
    if (!analyserResult?.analyser) return undefined;

    const tagsRegistry = analyserResult.config.parser.registries.tags
        ? parseDatapackElement<TagType>(context.files, analyserResult.config.parser.registries.tags)
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

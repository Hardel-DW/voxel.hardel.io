import Datapack from "@/lib/minecraft/core/Datapack.ts";
import type { ConfiguratorConfigFromDatapack, DataDrivenElement, VoxelElement } from "@/lib/minecraft/core/Element";
import type { DataDrivenRegistryElement } from "@/lib/minecraft/core/Element";
import { sortVoxelElements } from "@/lib/minecraft/core/Element";
import type { Analysers, GetAnalyserMinecraft, GetAnalyserVoxel } from "@/lib/minecraft/core/engine/Analyser.ts";
import { getAnalyserForVersion } from "@/lib/minecraft/core/engine/Analyser.ts";
import { calculateInitialToggle } from "@/lib/minecraft/core/engine/managers/InitialToggle.ts";
import { Logger } from "@/lib/minecraft/core/engine/migrations/logger";
import { DatapackError } from "@/lib/minecraft/core/errors/DatapackError";
import type { ToolConfiguration } from "@/lib/minecraft/core/schema/primitive";
import type { ToggleSectionMap } from "@/lib/minecraft/core/schema/primitive/toggle";
import { Identifier } from "@/lib/minecraft/core/Identifier";
export interface ParserParams<K extends DataDrivenElement> {
    element: DataDrivenRegistryElement<K>;
    tags?: string[];
    configurator?: ConfiguratorConfigFromDatapack;
}

export type Parser<T extends VoxelElement, K extends DataDrivenElement> = (params: ParserParams<K>) => T;

export interface ParseDatapackResult<T extends VoxelElement> {
    name: string;
    files: Record<string, Uint8Array>;
    elements: Map<string, T>;
    version: number;
    toggleSection: ToggleSectionMap;
    currentElementId: string;
    isModded: boolean;
    config: ToolConfiguration;
    logger: Logger;
}

/**
 * Parses a datapack and returns the elements.
 */
export async function parseDatapack<T extends keyof Analysers>(tool: T, file: File): Promise<ParseDatapackResult<GetAnalyserVoxel<T>>> {
    const id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const date = new Intl.DateTimeFormat("fr-FR", { year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());

    const datapack = await Datapack.parse(file);
    const namespaces = datapack.getNamespaces();
    const version = datapack.getPackFormat();
    const description = datapack.getDescription();
    const isModded = datapack.isModded();
    const name = datapack.getFileName();
    const logs = datapack.getVoxelLogs();
    const files = datapack.getFiles();

    const { analyser, config } = getAnalyserForVersion(tool, version);
    const toggleSection = calculateInitialToggle(config.interface);

    const mainRegistry = datapack.getRegistry<GetAnalyserMinecraft<T>>(config.analyser);
    const compiled = mainRegistry.map((element) => {
        const configurator = datapack.readFile<ConfiguratorConfigFromDatapack>(element.identifier, "voxel");
        const tags = datapack.getRelatedTags(`tags/${config.analyser}`, element.identifier);

        return {
            identifier: new Identifier(element.identifier).toUniqueKey(),
            data: analyser.parser({ element, tags, configurator })
        };
    });

    if (compiled.length === 0) throw new DatapackError("tools.warning.no_elements");
    const elements = new Map(compiled.map((element) => [element.identifier, element.data]));
    const currentElementId = sortVoxelElements(elements)[0];
    const logger = logs
        ? new Logger(JSON.parse(new TextDecoder().decode(logs)))
        : new Logger({ id, date, version, isModded, datapack: { name, description, namespaces }, isMinified: true, logs: [] });

    return { name, files, elements, version, toggleSection, currentElementId, isModded, config, logger };
}

import type { ConfiguratorContextType } from "@/lib/minecraft/components/ConfiguratorContext.tsx";
import { Identifier } from "@/lib/minecraft/core/Identifier.ts";
import { isPresentInTag } from "@/lib/minecraft/core/Tag.ts";
import {
    type Analysers,
    type DataDrivenElement,
    type GetAnalyserMinecraft,
    type GetAnalyserVoxel,
    type VoxelElement,
    analyserCollection
} from "@/lib/minecraft/core/engine/Analyser.ts";
import { type RegistryElement, getRegistry, parseZip } from "@/lib/minecraft/mczip.ts";
import type { TagType } from "@/lib/minecraft/schema/tag/TagType.ts";

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
    const parserConfig = context.configuration?.parser;
    if (!parserConfig) return "No parser configuration found.";

    const analyser = analyserCollection[parserConfig.id];
    if (!analyser) return "No analyser found.";

    const mainRegistry = parseDatapackElement<GetAnalyserMinecraft<T>>(files, parserConfig.registries.main);
    const tagsRegistry = parserConfig.registries.tags ? parseDatapackElement<TagType>(files, parserConfig.registries.tags) : [];

    const compiled = mainRegistry.map((element) => {
        const tags = tagsRegistry
            .filter((tag) => isPresentInTag(tag, element.identifier.toString()))
            .map((tag) => tag.identifier.toString());

        return analyser.parser(element, tags);
    });

    if (compiled.length === 0) return "No elements found.";
    context.setName(file[0].name);
    context.setFiles(files);
    context.setElements(compiled);
    context.setCurrentElementId(Identifier.sortRegistry(compiled)[0].identifier);
    context.setIsJar(isJar);
    return null;
}

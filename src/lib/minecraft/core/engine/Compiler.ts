import type { ConfiguratorContextType } from "@/lib/minecraft/components/ConfiguratorContext.tsx";
import { Identifier, type IdentifierOneToMany } from "@/lib/minecraft/core/Identifier.ts";
import { compileTags } from "@/lib/minecraft/core/Tag.ts";
import {
    type Analysers,
    type DataDrivenElement,
    type GetAnalyserMinecraft,
    type GetAnalyserVoxel,
    type VoxelElement,
    analyserCollection
} from "@/lib/minecraft/core/engine/Analyser.ts";
import { type RegistryElement, readDatapackFile } from "@/lib/minecraft/mczip.ts";
import type { TagType } from "@/lib/minecraft/schema/tag/TagType.ts";

export type Compiler<T extends VoxelElement, K extends DataDrivenElement> = (
    element: RegistryElement<T>,
    original: K
) => RegistryElement<K>;

/**
 * Compile all enchantment from Voxel Format to Data Driven Format.
 * @param context
 */
export function compileDatapack<T extends keyof Analysers>(
    context: ConfiguratorContextType<GetAnalyserVoxel<T>>
): Array<RegistryElement<GetAnalyserMinecraft<T>> | RegistryElement<TagType>> {
    const parserConfig = context.configuration?.parser;
    if (!parserConfig) return [];
    const analyser = analyserCollection[parserConfig.id];
    if (!analyser) return [];

    const compiledElements = context.elements
        .map((element) => {
            const original = readDatapackFile<GetAnalyserMinecraft<T>>(context.files, element.identifier);
            return original ? analyser.compiler(element, original) : null;
        })
        .filter((enchantment) => enchantment !== null);

    const identifiers: IdentifierOneToMany[] = context.elements.map((element) => {
        if (element.data.softDelete) return { primary: element.identifier, related: [] };

        return {
            primary: element.identifier,
            related: element.data.tags.map((tag) => Identifier.fromString(tag, parserConfig.registries.tags))
        };
    });

    const compiledTags = compileTags(identifiers)
        .map((tag) => {
            const original = readDatapackFile<TagType>(context.files, tag.identifier);
            const valueToAdd = original ? original.values.map(Identifier.getValue).filter((resource) => resource.startsWith("#")) : [];

            tag.data.values = [...tag.data.values, ...valueToAdd];
            return tag;
        })
        .filter((tag) => tag !== null);

    return [...compiledElements, ...compiledTags];
}

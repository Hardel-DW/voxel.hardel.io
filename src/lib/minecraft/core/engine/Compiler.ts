import type { ConfiguratorContextType } from "@/lib/minecraft/components/ConfiguratorContext.tsx";
import { Identifier, type IdentifierOneToMany } from "@/lib/minecraft/core/Identifier.ts";
import { compileTags } from "@/lib/minecraft/core/Tag.ts";
import {
    type Analysers,
    type DataDrivenElement,
    type GetAnalyserMinecraft,
    type GetAnalyserVoxel,
    type VoxelElement,
    getAnalyserForVersion
} from "@/lib/minecraft/core/engine/Analyser.ts";
import { type RegistryElement, readDatapackFile } from "@/lib/minecraft/mczip.ts";
import type { TagType } from "@voxel/definitions";

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
    const compilerConfig = context.configuration?.compiler;
    if (!parserConfig) return [];

    if (context.version === null) {
        throw new Error("Minecraft version not set");
    }

    const config = getAnalyserForVersion(parserConfig.id, context.version);
    if (!config) throw new Error("No analyser found for the specified version.");

    const compiledElements = context.elements
        .map((element) => {
            const original = readDatapackFile<GetAnalyserMinecraft<T>>(context.files, element.identifier);
            return original ? config.analyser.compiler(element, original) : null;
        })
        .filter((enchantment) => enchantment !== null);

    const identifiers: IdentifierOneToMany[] = context.elements.map((element) => {
        if (element.data.softDelete) return { primary: element.identifier, related: [] };

        const related = element.data.tags.map((tag) => Identifier.fromString(tag, parserConfig.registries.tags));

        const mergedTags =
            compilerConfig?.merge_field_to_tags.flatMap((field) => {
                const value = element.data[field as keyof GetAnalyserVoxel<T>];
                if (typeof value === "string") {
                    return [Identifier.fromString(value, parserConfig.registries.tags)];
                }

                return [];
            }) ?? [];

        return {
            primary: element.identifier,
            related: [...mergedTags, ...related]
        };
    });

    const compiledTags = compileTags(identifiers)
        .map((tag) => {
            const original = readDatapackFile<TagType>(context.files, tag.identifier);
            const valueToAdd = original ? original.values.map(Identifier.getValue).filter((resource) => resource.startsWith("#")) : [];

            const uniqueValues = new Set([...tag.data.values, ...valueToAdd]);
            tag.data.values = Array.from(uniqueValues);
            return tag;
        })
        .filter((tag) => tag !== null);

    return [...compiledElements, ...compiledTags];
}

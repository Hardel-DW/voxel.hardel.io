import { Identifier, type IdentifierOneToMany } from "@/lib/minecraft/core/Identifier.ts";
import { compileTags } from "@/lib/minecraft/core/Tag.ts";
import {
    type Analysers,
    type DataDrivenElement,
    type GetAnalyserMinecraft,
    type GetAnalyserVoxel,
    type VoxelElement,
    getAnalyserForVersion,
    versionedAnalyserCollection
} from "@/lib/minecraft/core/engine/Analyser.ts";
import type { Unresolved } from "@/lib/minecraft/core/engine/resolver/field/type.ts";
import type { ToolConfiguration } from "@/lib/minecraft/core/schema/primitive";
import { type RegistryElement, readDatapackFile } from "@/lib/minecraft/mczip.ts";
import type { OptionalTag, TagType } from "@voxel/definitions";

export type Compiler<T extends VoxelElement, K extends DataDrivenElement> = (
    element: RegistryElement<T>,
    original: K
) => RegistryElement<K>;

export interface CompileDatapackParams<T extends VoxelElement> {
    elements: RegistryElement<T>[];
    version: number;
    files: Record<string, Uint8Array>;
    configuration: Unresolved<ToolConfiguration>;
}

/**
 * Compile all elements from Voxel Format to Data Driven Format.
 */
export function compileDatapack<T extends keyof Analysers>({
    elements,
    version,
    files,
    configuration
}: CompileDatapackParams<GetAnalyserVoxel<T>>): Array<RegistryElement<GetAnalyserMinecraft<T>> | RegistryElement<TagType>> {
    const parserConfig = configuration?.analyser;
    const compilerConfig = configuration?.compiler;
    if (!parserConfig) return [];

    if (typeof parserConfig.id !== "string" || !(parserConfig.id in versionedAnalyserCollection)) {
        throw new Error(`Invalid analyser ID. Must be one of: ${Object.keys(versionedAnalyserCollection).join(", ")}`);
    }

    const config = getAnalyserForVersion(parserConfig.id as T, version);
    if (!config) throw new Error("No analyser found for the specified version.");

    const compiledElements = elements
        .map((element) => {
            const original = readDatapackFile<GetAnalyserMinecraft<T>>(files, element.identifier);
            return original ? config.analyser.compiler(element, original) : null;
        })
        .filter((element) => element !== null);

    const identifiers: IdentifierOneToMany[] = elements.map((element) => {
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
            const original = readDatapackFile<TagType>(files, tag.identifier);
            const valueToAdd = original
                ? original.values
                      .map(Identifier.getValue)
                      .filter((resource) => resource.startsWith("#") || resource.startsWith("minecraft"))
                : [];

            const uniqueValuesMap = new Map<string, string | OptionalTag>();
            for (const value of tag.data.values as Array<string | OptionalTag>) {
                const key = typeof value === "string" ? value : value.id;
                uniqueValuesMap.set(key, value);
            }

            for (const value of valueToAdd) {
                if (!uniqueValuesMap.has(value)) {
                    uniqueValuesMap.set(value, value);
                }
            }

            tag.data.values = Array.from(uniqueValuesMap.values());
            return tag;
        })
        .filter((tag) => tag !== null);

    return [...compiledElements, ...compiledTags];
}

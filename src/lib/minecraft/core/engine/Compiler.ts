import { Identifier } from "@/lib/minecraft/core/Identifier.ts";
import {
    type Analysers,
    type DataDrivenElement,
    type GetAnalyserMinecraft,
    type GetAnalyserVoxel,
    type VoxelElement,
    getAnalyserForVersion
} from "@/lib/minecraft/core/engine/Analyser.ts";
import { type RegistryElement, readDatapackFile } from "@/lib/minecraft/mczip.ts";
import type { OptionalTag, TagType } from "@voxel/definitions";

export type Compiler<T extends VoxelElement, K extends DataDrivenElement> = (
    element: RegistryElement<T>,
    original: K,
    config: keyof Analysers
) => {
    element: RegistryElement<K>;
    tags: Identifier[];
};

/**
 * Compile all elements from Voxel Format to Data Driven Format.
 */
export function compileDatapack<T extends keyof Analysers>({
    elements,
    version,
    files,
    tool
}: {
    elements: RegistryElement<GetAnalyserVoxel<T>>[];
    version: number;
    files: Record<string, Uint8Array>;
    tool: T;
}): Array<RegistryElement<GetAnalyserMinecraft<T>> | RegistryElement<TagType>> {
    const analyserResult = getAnalyserForVersion(tool, version);
    if (!analyserResult) throw new Error("No analyser found for the specified version.");
    const { analyser } = analyserResult;

    const compiledElements = elements
        .map((element) => {
            const original = readDatapackFile<GetAnalyserMinecraft<T>>(files, element.identifier);
            return original ? analyser.compiler(element, original, tool) : null;
        })
        .filter((element) => element !== null);

    const registryElements: RegistryElement<TagType>[] = [];
    const temp: Record<string, { identifier: Identifier; elements: string[] }> = {};

    for (const holder of compiledElements) {
        for (const tags of holder.tags) {
            const path = tags.filePath();

            if (!temp[path]) {
                temp[path] = {
                    identifier: tags,
                    elements: []
                };
            }

            temp[path].elements.push(holder.element.identifier.toString());
        }
    }

    for (const path in temp) {
        registryElements.push({
            identifier: temp[path].identifier,
            data: { values: temp[path].elements }
        });
    }

    const compiledTags = registryElements
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

    return [...compiledElements.map((element) => element.element), ...compiledTags];
}

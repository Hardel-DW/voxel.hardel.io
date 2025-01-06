import type { Identifier } from "@/lib/minecraft/core/Identifier.ts";
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

export type CompileDatapackResult<T extends keyof Analysers> = NewOrUpdated<T> | Deleted;

interface NewOrUpdated<T extends keyof Analysers> {
    type: "new" | "updated";
    element: RegistryElement<GetAnalyserMinecraft<T>> | RegistryElement<TagType>;
}

interface Deleted {
    type: "deleted";
    identifier: Identifier;
}

export function getIdentifierFromCompiler(element: CompileDatapackResult<keyof Analysers>): Identifier {
    return element.type === "deleted" ? element.identifier : element.element?.identifier;
}

/**
 * Compile all elements from Voxel Format to Data Driven Format.
 */
export function compileDatapack<T extends keyof Analysers>({
    elements,
    version,
    files,
    tool,
    identifiers
}: {
    elements: RegistryElement<GetAnalyserVoxel<T>>[];
    version: number;
    files: Record<string, Uint8Array>;
    tool: T;
    identifiers: Identifier[];
}): Array<CompileDatapackResult<T>> {
    const analyserResult = getAnalyserForVersion(tool, version);
    if (!analyserResult) throw new Error("No analyser found for the specified version.");
    const { analyser } = analyserResult;

    /**
     * For each "main element" for example enchantments, will get the corresponding original element.
     * And then will compile the element to the Minecraft Data Driven Format.
     */
    const compiledElements = elements
        .map((element) => {
            const original = readDatapackFile<GetAnalyserMinecraft<T>>(files, element.identifier);
            return original ? analyser.compiler(element, original, tool) : null;
        })
        .filter((element) => element !== null);

    /**
     * For each "main element" for example enchantments, will be obtained the corresponding tags.
     * And then will create tags files and add the "main element" to the tags.
     */
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

    /**
     * Add the "minecraft" namespace values or subtags, to the tag if they are not already present.
     * For example, if the tag has original values "minecraft:fire_aspect". He adds it to the tag.
     */
    const compiledTags = registryElements
        .map((tag) => {
            const original = readDatapackFile<TagType>(files, tag.identifier);
            const uniqueValuesMap = new Map<string, string | OptionalTag>();

            for (const value of tag.data.values) {
                const key = typeof value === "string" ? value : value.id;
                uniqueValuesMap.set(key, value);
            }

            if (original?.values) {
                for (const value of original.values) {
                    const key = typeof value === "string" ? value : value.id;
                    if ((key.startsWith("#") || key.startsWith("minecraft")) && !uniqueValuesMap.has(key)) {
                        uniqueValuesMap.set(key, value);
                    }
                }
            }

            tag.data.values = Array.from(uniqueValuesMap.values());
            return tag;
        })
        .filter((tag) => tag !== null);

    /**
     * Determine if the element is new, updated or deleted.
     * If the ones that were there at the beginning are no longer there, I'll delete them.
     * If it wasn't in the initial list but is new, I create it.
     * If it was there at the beginning and is still there at the end, just keep it.
     * if it wasn't there at the beginning and isn't there at the end, I do nothing.
     */
    const everything = [...compiledElements.map((element) => element.element), ...compiledTags];
    const result: CompileDatapackResult<T>[] = [];
    const processedIds = new Set<string>();

    for (const original of identifiers) {
        const element = everything.find((element) => element.identifier.toString() === original.toString());
        if (!element) {
            result.push({ type: "deleted", identifier: original });
        } else {
            result.push({ type: "updated", element });
            processedIds.add(element.identifier.toString());
        }
    }

    for (const element of everything) {
        if (!processedIds.has(element.identifier.toString())) {
            result.push({ type: "new", element });
        }
    }

    return result;
}

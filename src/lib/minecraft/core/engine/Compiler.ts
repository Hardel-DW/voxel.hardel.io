import { identifierEquals, identifierToFilePath, identifierToString, type IdentifierObject } from "@/lib/minecraft/core/Identifier.ts";
import {
    type Analysers,
    type DataDrivenElement,
    type GetAnalyserMinecraft,
    type GetAnalyserVoxel,
    type VoxelElement,
    getAnalyserForVersion
} from "@/lib/minecraft/core/engine/Analyser.ts";
import type { OptionalTag, TagType } from "@voxel/definitions";
import { readDatapackFile } from "@/lib/minecraft/mczip";
import type { DataDrivenRegistryElement } from "@/lib/minecraft/core/Registry";

export type Compiler<T extends VoxelElement, K extends DataDrivenElement> = (
    element: T,
    original: K,
    config: keyof Analysers
) => {
    element: DataDrivenRegistryElement<K>;
    tags: IdentifierObject[];
};

export type CompileDatapackResult<T extends keyof Analysers> = NewOrUpdated<T> | Deleted;

interface NewOrUpdated<T extends keyof Analysers> {
    type: "new" | "updated";
    element: DataDrivenRegistryElement<GetAnalyserMinecraft<T>> | DataDrivenRegistryElement<TagType>;
}

interface Deleted {
    type: "deleted";
    identifier: IdentifierObject;
}

export function getIdentifierFromCompiler(comp: CompileDatapackResult<keyof Analysers>): IdentifierObject {
    return comp.type === "deleted" ? comp.identifier : comp.element.identifier;
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
    elements: GetAnalyserVoxel<T>[];
    version: number;
    files: Record<string, Uint8Array>;
    tool: T;
    identifiers: IdentifierObject[];
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
    const registryElements: DataDrivenRegistryElement<TagType>[] = [];
    const temp: Record<string, { identifier: IdentifierObject; elements: string[] }> = {};

    for (const holder of compiledElements) {
        for (const tags of holder.tags) {
            const path = identifierToFilePath(tags);

            if (!temp[path]) {
                temp[path] = {
                    identifier: tags,
                    elements: []
                };
            }

            temp[path].elements.push(identifierToString(holder.element.identifier));
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
    console.log("------------ Compiled Elements ------------");
    const everything = [...compiledElements.map((element) => element.element), ...compiledTags];
    console.debug(everything);
    console.log("------------ Identifiers ------------");
    console.debug(identifiers);
    console.log("------------------------------------------");
    const result: CompileDatapackResult<T>[] = [];
    const processedIds = new Set<string>();

    for (const original of identifiers) {
        const element = everything.find((element) => identifierEquals(element.identifier, original));
        if (!element) {
            result.push({ type: "deleted", identifier: original });
        } else {
            result.push({ type: "updated", element });
            processedIds.add(identifierToString(element.identifier));
        }
    }

    for (const element of everything) {
        if (!processedIds.has(identifierToString(element.identifier))) {
            result.push({ type: "new", element });
        }
    }

    return result;
}

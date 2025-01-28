import { Identifier } from "@/lib/minecraft/core/Identifier.ts";
import type { RegistryElement } from "@/lib/minecraft/mczip.ts";
import type { TagType } from "@voxel/definitions";

/**
 * Searches for a tag in a list of tags.
 * @param tag - The JSON tag object.
 * @param value - The value to search for.
 */
export const isPresentInTag = (tag: RegistryElement<TagType>, value: string): boolean => {
    return tag.data.values.some((tagValue) => {
        if (typeof tagValue === "string") {
            return tagValue === value;
        }

        if (typeof tagValue === "object") {
            return tagValue.id === value;
        }

        return false;
    });
};

/**
 * Converts a list of tags to identifiers.
 * @param tags - The list of tags to convert.
 * @param registry - The registry to use.
 * @returns The list of identifiers.
 */
export const tagsToIdentifiers = (tags: string[], registry?: string): Identifier[] => {
    if (!registry) {
        return [];
    }

    return tags.map((tag) => Identifier.fromString(tag, registry));
};

export const getTagsFromRegistry = (el: TagType): string[] => {
    return el.values.map((value) => (typeof value === "string" ? value : value.id));
};

export const isTag = (element: RegistryElement<unknown>): element is RegistryElement<TagType> => {
    return element.identifier.getRegistry()?.startsWith("tags/") || element.identifier.isTagged();
};

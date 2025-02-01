import type { OptionalTag, TagType } from "@voxel/definitions";
import { Identifier } from "./Identifier";
import type { IdentifierObject } from "./Identifier";
import type { DataDrivenRegistryElement } from "./Registry";

/**
 * Searches for a tag in a list of tags.
 * @param tag - The JSON tag object.
 * @param value - The value to search for.
 */
export const isPresentInTag = (tag: DataDrivenRegistryElement<TagType>, value: string): boolean => {
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
export const tagsToIdentifiers = (tags: string[], registry: string): IdentifierObject[] => {
    return tags.map((tag) => Identifier.of(tag, registry));
};

/**
 * Get the tags from a registry element.
 * @param el - The registry element.
 * @returns The tags.
 */
export const getTagsFromRegistry = (el: TagType): string[] => {
    return el.values.map((value) => (typeof value === "string" ? value : value.id));
};

/**
 * Check if an element is a tag.
 * @param element - The element to check.
 * @returns Whether the element is a tag.
 */
export const isTag = (element: DataDrivenRegistryElement<any>): element is DataDrivenRegistryElement<TagType> => {
    return element.identifier.registry?.startsWith("tags/");
};

/**
 * Get the value of a tag.
 * @param tag - The tag to get the value from.
 * @returns The value of the tag.
 */
export const getValue = (tag: string | OptionalTag): string => {
    return typeof tag === "string" ? tag : tag.id;
};

/**
 * Output a tag.
 * @param identifier - The identifier of the tag.
 * @param required - Whether the tag is required.
 * @returns The tag.
 */
export const output = (identifier: IdentifierObject, required: boolean): string | OptionalTag => {
    const isTagged = identifier.registry?.startsWith("tags/");
    return isTagged ? { id: new Identifier(identifier).toString(), required } : new Identifier(identifier).toString();
};

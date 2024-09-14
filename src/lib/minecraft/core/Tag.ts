import type { Identifier, IdentifierOneToMany } from "@/lib/minecraft/core/Identifier.ts";
import type { RegistryElement } from "@/lib/minecraft/mczip.ts";
import type { TagType } from "@/lib/minecraft/schema/tag/TagType.ts";

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

export const compileTags = (elements: IdentifierOneToMany[]): RegistryElement<TagType>[] => {
    const tags: RegistryElement<TagType>[] = [];

    // File name, all tags
    const tempTags: Record<
        string,
        {
            identifier: Identifier;
            tags: string[];
        }
    > = {};

    for (const identifier of elements) {
        for (const tags of identifier.related) {
            const path = tags.filePath();

            if (!tempTags[path]) {
                tempTags[path] = {
                    identifier: tags,
                    tags: []
                };
            }

            if (identifier.primary.toString().startsWith("tags/")) {
                tempTags[path].tags.push(`#${identifier.primary.toString()}`);
                continue;
            }

            tempTags[path].tags.push(identifier.primary.toString());
        }
    }

    for (const path in tempTags) {
        tags.push({
            identifier: tempTags[path].identifier,
            data: { values: tempTags[path].tags }
        });
    }

    return tags;
};

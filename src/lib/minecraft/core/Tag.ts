import type { EnchantmentTag } from "@/components/pages/tools/enchant/EnchantmentsContext.tsx";
import type { Identifier } from "@/lib/minecraft/core/Identifier.ts";
import type { RegistryElement } from "@/lib/minecraft/mcschema.ts";
import type { Enchantment } from "@/lib/minecraft/schema/enchantment/Enchantment.ts";

/**
 * Searches for a tag in a list of tags.
 * @param tag - The JSON tag object.
 * @param value - The value to search for.
 */
export const isPresentInTag = (tag: TagType, value: string): boolean => {
    return tag.values.some((tagValue) => {
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
 * Get all tags that contain the given name.
 * @param tags - The tags to search in.
 * @param name - The identifier of the tag element to search for. E.g. "minecraft:sharpness"
 */
export const getTagsFromRegistry = (tags: RegistryElement<TagType>[], name: Identifier): Identifier[] => {
    const tagContainingEnchant: Identifier[] = [];

    for (const tag of tags) {
        if (isPresentInTag(tag.data, name.toString())) {
            tagContainingEnchant.push(tag.identifier);
        }
    }

    return tagContainingEnchant;
};

/**
 * Get all tags that are linked to enchantments registry.
 * @param registryEnchantment - The enchantment registry.
 * @param registryTag - The tag registry.
 */
export const getTagsLinkedToEnchantmentRegistry = (
    registryEnchantment: RegistryElement<Enchantment>[],
    registryTag: RegistryElement<TagType>[]
): EnchantmentTag[] => {
    const tags: EnchantmentTag[] = [];
    for (const enchantment of registryEnchantment) {
        const resourceTags: Identifier[] = getTagsFromRegistry(registryTag, enchantment.identifier);
        tags.push({
            enchant: enchantment.identifier,
            tags: resourceTags
        });
    }

    return tags;
};

export const compileTags = (enchantmentTags: EnchantmentTag[]): RegistryElement<TagType>[] => {
    const tags: RegistryElement<TagType>[] = [];

    // File name, all tags
    const tempTags: Record<
        string,
        {
            identifier: Identifier;
            tags: string[];
        }
    > = {};

    for (const enchant of enchantmentTags) {
        for (const tags of enchant.tags) {
            const path = tags.filePath();

            if (!tempTags[path]) {
                tempTags[path] = {
                    identifier: tags,
                    tags: []
                };
            }

            tempTags[path].tags.push(enchant.enchant.toString());
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

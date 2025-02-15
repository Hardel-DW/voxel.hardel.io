import type { DataDrivenRegistryElement, IdentifierObject } from "@voxelio/breeze";
import type { Enchantment } from "@voxelio/breeze/schema";

/**
 * This class allows comparing enchantments with each other, to sort them according to specific criteria.
 */
export class EnchantmentComparator {
    constructor(private readonly enchantments: DataDrivenRegistryElement<Enchantment>[]) {}

    /**
     * Get enchantments grouped by supported_items
     * Key: supported_items identifier e.g (minecraft:stone)
     * Value: list of enchantments that support this item
     * If supported_items is a list or empty, the enchantment is put in the "other" category
     */
    public getEnchantmentsBySupportedItems(): Map<string, IdentifierObject[]> {
        const supportedItems: Map<string, IdentifierObject[]> = new Map();

        // Loop through all enchantments
        for (const enchantment of this.enchantments) {
            const supported = enchantment.data.supported_items;

            // If supported_items is empty or is a list, put it in "other"
            if (!supported || Array.isArray(supported)) {
                const otherEnchants = supportedItems.get("other") || [];
                otherEnchants.push(enchantment.identifier);
                supportedItems.set("other", otherEnchants);
                continue;
            }

            // If it's a single item, add it to its category
            const enchants = supportedItems.get(supported) || [];
            enchants.push(enchantment.identifier);
            supportedItems.set(supported, enchants);
        }

        return supportedItems;
    }

    /**
     * Get enchantments grouped by slots
     * Key: slot identifier e.g (armor, armor.chest, weapon.melee)
     * Value: list of enchantments that can be applied to this slot
     * Note: An enchantment can appear in multiple groups if it has multiple slots
     */
    public getEnchantmentsBySlots(): Map<string, IdentifierObject[]> {
        const slotGroups: Map<string, IdentifierObject[]> = new Map();

        // Loop through all enchantments
        for (const enchantment of this.enchantments) {
            const slots = enchantment.data.slots;

            // If no slots defined, put in "other"
            if (!slots || slots.length === 0) {
                const otherEnchants = slotGroups.get("other") || [];
                otherEnchants.push(enchantment.identifier);
                slotGroups.set("other", otherEnchants);
                continue;
            }

            // Add the enchantment to each slot group
            for (const slot of slots) {
                const slotEnchants = slotGroups.get(slot) || [];
                slotEnchants.push(enchantment.identifier);
                slotGroups.set(slot, slotEnchants);
            }
        }

        return slotGroups;
    }
}

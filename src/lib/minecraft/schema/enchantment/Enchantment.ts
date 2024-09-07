import type { SlotRegistryType } from "@/lib/minecraft/registry/SlotRegistry.ts";
import type { EffectComponentsRecord } from "@/lib/minecraft/schema/enchantment/EffectComponents.ts";

export interface Enchantment {
    description: TextComponent;
    exclusive_set?: SingleOrMultiple<string>;
    supported_items: SingleOrMultiple<string>;
    primary_items?: SingleOrMultiple<string>;
    weight: number;
    max_level: number;
    min_cost: EnchantmentCost;
    max_cost: EnchantmentCost;
    anvil_cost: number;
    slots: SlotRegistryType[];
    effects?: EffectComponentsRecord;
}

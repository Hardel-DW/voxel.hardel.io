import type { DataDrivenElement } from "@/lib/minecraft/core/engine/Analyser.ts";
import type { SlotRegistryType } from "@/lib/minecraft/core/engine/managers/SlotManager.ts";
import type { EffectComponentsRecord } from "@/lib/minecraft/schema/enchantment/EffectComponents.ts";

export interface Enchantment extends DataDrivenElement {
    description: TextComponentType;
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

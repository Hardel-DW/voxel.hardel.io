import type { SharedEffects } from "@/lib/minecraft/schema/enchantment/SharedEffects.ts";

export type EnchantmentEntityEffect = {
    type: EnchantmentEntityEffectTypeRegistryType;
} & SharedEffects & {
        "minecraft:all_of"?: { effects: EnchantmentEntityEffect[] };
    };

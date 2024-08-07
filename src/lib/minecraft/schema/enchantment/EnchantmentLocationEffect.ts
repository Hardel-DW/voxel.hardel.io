import type { SharedEffects } from "@/lib/minecraft/schema/enchantment/SharedEffects.ts";

export type EnchantmentLocationEffect = {
    type: EnchantmentLocationBasedEffectType;
} & SharedEffects & {
        "minecraft:all_of"?: { effects: EnchantmentLocationEffect[] };
        "minecraft:attribute"?: AttributeEffectFields;
    };

import type { EnchantmentEntityEffect } from "@/lib/minecraft/schema/enchantment/EnchantmentEntityEffect.ts";
import type { EnchantmentLocationEffect } from "@/lib/minecraft/schema/enchantment/EnchantmentLocationEffect.ts";
import type { TargetedConditionalEffect } from "@/lib/minecraft/schema/enchantment/TargetedConditionalEffect.ts";

export interface EffectComponents {
    "minecraft:damage_protection"?: ConditionalEffect<EnchantmentValueEffect>[];
    "minecraft:damage_immunity"?: ConditionalEffect<{}>[];
    "minecraft:damage"?: ConditionalEffect<EnchantmentValueEffect>[];
    "minecraft:smash_damage_per_fallen_block"?: ConditionalEffect<EnchantmentValueEffect>[];
    "minecraft:knockback"?: ConditionalEffect<EnchantmentValueEffect>[];
    "minecraft:armor_effectiveness"?: ConditionalEffect<EnchantmentValueEffect>[];
    "minecraft:post_attack"?: TargetedConditionalEffect<EnchantmentEntityEffect>[];
    "minecraft:hit_block"?: ConditionalEffect<EnchantmentEntityEffect>[];
    "minecraft:item_damage"?: ConditionalEffect<EnchantmentValueEffect>[];
    "minecraft:attributes"?: AttributeEffectFields[];
    "minecraft:equipment_drops"?: TargetedConditionalEffect<EnchantmentValueEffect>[];
    "minecraft:location_changed"?: ConditionalEffect<EnchantmentLocationEffect>[];
    "minecraft:tick"?: ConditionalEffect<EnchantmentEntityEffect>[];
    "minecraft:ammo_use"?: ConditionalEffect<EnchantmentValueEffect>[];
    "minecraft:projectile_piercing"?: ConditionalEffect<EnchantmentValueEffect>[];
    "minecraft:projectile_spawned"?: ConditionalEffect<EnchantmentEntityEffect>[];
    "minecraft:projectile_spread"?: ConditionalEffect<EnchantmentValueEffect>[];
    "minecraft:projectile_count"?: ConditionalEffect<EnchantmentValueEffect>[];
    "minecraft:crossbow_charge_time"?: ConditionalEffect<EnchantmentValueEffect>[];
    "minecraft:trident_return_acceleration"?: ConditionalEffect<EnchantmentValueEffect>[];
    "minecraft:fishing_time_reduction"?: ConditionalEffect<EnchantmentValueEffect>[];
    "minecraft:fishing_luck_bonus"?: ConditionalEffect<EnchantmentValueEffect>[];
    "minecraft:block_experience"?: ConditionalEffect<EnchantmentValueEffect>[];
    "minecraft:mob_experience"?: ConditionalEffect<EnchantmentValueEffect>[];
    "minecraft:trident_spin_attack_strength"?: ConditionalEffect<EnchantmentValueEffect>[];
    "minecraft:repair_with_xp"?: ConditionalEffect<EnchantmentValueEffect>[];
    "minecraft:crossbow_charging_sounds"?: {
        start: SoundValue;
        mid: SoundValue;
        end: SoundValue;
    }[];
    "minecraft:trident_sound"?: SoundValue[];
    "minecraft:prevent_equipment_drop"?: {};
    "minecraft:prevent_armor_change"?: {};
}

export type AttributeEffect = {
    type: "minecraft:attribute";
    id: string;
    attribute: AttributeType;
    amount: LevelBasedValue;
    operation: AttributeOperationRegistry;
};

export type AllOfEffect = {
    type: "minecraft:all_of";
    effects: EnchantmentLocationEffect[];
};

export type EffectComponentsRecord = Record<keyof EffectComponents, EffectComponents[keyof EffectComponents]>;

type EnchantmentValueEffectKey = {
    [K in keyof EffectComponents]: EffectComponents[K] extends ConditionalEffect<EnchantmentValueEffect>[] ? K : never;
}[keyof EffectComponents] &
    string;

export function isConditionalEnchantmentValueEffectKey(key: string): key is EnchantmentValueEffectKey {
    return [
        "minecraft:damage_protection",
        "minecraft:damage",
        "minecraft:smash_damage_per_fallen_block",
        "minecraft:knockback",
        "minecraft:armor_effectiveness",
        "minecraft:item_damage",
        "minecraft:ammo_use",
        "minecraft:projectile_piercing",
        "minecraft:projectile_spread",
        "minecraft:projectile_count",
        "minecraft:crossbow_charge_time",
        "minecraft:trident_return_acceleration",
        "minecraft:fishing_time_reduction",
        "minecraft:fishing_luck_bonus",
        "minecraft:block_experience",
        "minecraft:mob_experience",
        "minecraft:trident_spin_attack_strength",
        "minecraft:repair_with_xp"
    ].includes(key);
}

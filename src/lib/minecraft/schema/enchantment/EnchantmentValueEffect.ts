interface EnchantmentValueEffect {
    type: EnchantmentValueEffectRegistryType;
    "minecraft:add"?: { value: LevelBasedValue };
    "minecraft:all_of"?: { effects: EnchantmentValueEffect[] };
    "minecraft:multiply"?: { factor: LevelBasedValue };
    "minecraft:remove_binomial"?: { chance: LevelBasedValue };
    "minecraft:set"?: { value: LevelBasedValue };
}

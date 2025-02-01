import type { DataDrivenRegistryElement } from "@/lib/minecraft/core/Registry";
import type { Enchantment } from "@voxel/definitions";

export type ModifiedEnchantment = Omit<Enchantment, "effects"> & {
    effects: Record<string, any>;
};

const baseEnchantment = {
    weight: 2,
    anvil_cost: 4,
    max_level: 1,
    min_cost: {
        base: 20,
        per_level_above_first: 9
    },
    max_cost: {
        base: 65,
        per_level_above_first: 9
    }
};

export const DATA_DRIVEN_TEMPLATE_ENCHANTMENT: DataDrivenRegistryElement<ModifiedEnchantment>[] = [
    {
        identifier: { namespace: "enchantplus", registry: "enchantment", resource: "bow/accuracy_shot" },
        data: {
            ...baseEnchantment,
            description: {
                translate: "enchantment.enchantplus.accuracy_shot",
                fallback: "Accuracy Shot"
            },
            supported_items: "#voxel:enchantable/range",
            slots: ["mainhand", "offhand"],
            effects: {
                "minecraft:projectile_spawned": [
                    {
                        effect: {
                            type: "minecraft:run_function",
                            function: "enchantplus:actions/accuracy_shot/on_shoot"
                        }
                    }
                ]
            }
        }
    },
    {
        identifier: { namespace: "enchantplus", registry: "enchantment", resource: "boots/agility" },
        data: {
            ...baseEnchantment,
            description: {
                translate: "enchantment.enchantplus.agility",
                fallback: "Agility"
            },
            slots: ["feet"],
            supported_items: "#minecraft:enchantable/foot_armor",
            effects: {
                "minecraft:attributes": [
                    {
                        id: "minecraft:enchantment.agility",
                        attribute: "minecraft:movement_speed",
                        amount: {
                            type: "minecraft:linear",
                            base: 0.2,
                            per_level_above_first: 0.2
                        },
                        operation: "add_multiplied_total"
                    }
                ]
            }
        }
    },
    {
        identifier: { namespace: "enchantplus", registry: "enchantment", resource: "elytra/armored" },
        data: {
            ...baseEnchantment,
            description: {
                translate: "enchantment.enchantplus.armored",
                fallback: "Armored"
            },
            effects: {
                "minecraft:damage_protection": [
                    {
                        effect: {
                            type: "minecraft:add",
                            value: 9
                        },
                        requirements: {
                            condition: "minecraft:damage_source_properties",
                            predicate: {
                                tags: [
                                    {
                                        expected: false,
                                        id: "minecraft:bypasses_invulnerability"
                                    }
                                ]
                            }
                        }
                    }
                ]
            },
            slots: ["chest"],
            supported_items: "#voxel:enchantable/elytra",
            weight: 1
        }
    },
    {
        identifier: { namespace: "enchantplus", registry: "enchantment", resource: "sword/attack_speed" },
        data: {
            ...baseEnchantment,
            description: {
                translate: "enchantment.enchantplus.harvest",
                fallback: "Harvest"
            },
            supported_items: "#voxel:enchantable/hoes",
            slots: ["mainhand"],
            effects: {}
        }
    },
    {
        identifier: { namespace: "enchantplus", registry: "enchantment", resource: "sword/death_touch" },
        data: {
            ...baseEnchantment,
            description: {
                translate: "enchantment.enchantplus.death_touch",
                fallback: "Death Touch"
            },
            exclusive_set: "#enchantplus:exclusive_set/sword_effect",
            supported_items: "#minecraft:enchantable/weapon",
            primary_items: "#minecraft:enchantable/sword",
            slots: ["mainhand"],
            effects: {
                "minecraft:post_attack": [
                    {
                        enchanted: "attacker",
                        affected: "victim",
                        effect: {
                            type: "minecraft:run_function",
                            function: "enchantplus:actions/death_touch"
                        },
                        requirements: {
                            condition: "minecraft:random_chance",
                            chance: 0.5
                        }
                    }
                ]
            }
        }
    },
    {
        identifier: { namespace: "enchantplus", registry: "enchantment", resource: "sword/poison_aspect" },
        data: {
            ...baseEnchantment,
            description: {
                translate: "enchantment.enchantplus.poison_aspect",
                fallback: "Poison Aspect"
            },
            effects: {
                "minecraft:post_attack": [
                    {
                        affected: "victim",
                        enchanted: "attacker",
                        effect: {
                            type: "minecraft:apply_mob_effect",
                            max_duration: {
                                type: "minecraft:linear",
                                base: 3.25,
                                per_level_above_first: 1.25
                            },
                            max_amplifier: {
                                type: "minecraft:linear",
                                base: 2,
                                per_level_above_first: 1
                            },
                            min_duration: 3.25,
                            min_amplifier: 2,
                            to_apply: "minecraft:wither"
                        }
                    }
                ]
            },
            primary_items: "#minecraft:enchantable/sword",
            slots: ["mainhand"],
            exclusive_set: "#enchantplus:exclusive_set/aspect",
            supported_items: "#minecraft:enchantable/weapon"
        }
    }
];

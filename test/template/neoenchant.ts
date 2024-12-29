import { Identifier } from "@/lib/minecraft/core/Identifier";
import type { EnchantmentProps } from "@/lib/minecraft/core/schema/enchant/EnchantmentProps";
import type { RegistryElement } from "@/lib/minecraft/mczip.ts";
import type { EffectComponentsRecord } from "@voxel/definitions";

const prefiledProperties = {
    maxLevel: 1,
    weight: 2,
    anvilCost: 4,
    minCostBase: 20,
    minCostPerLevelAboveFirst: 9,
    maxCostBase: 65,
    maxCostPerLevelAboveFirst: 9,
    exclusiveSet: "",
    primaryItems: "",
    supportedItems: "",
    slots: [],
    tags: [],
    assignedTags: [],
    softDelete: false,
    disabledEffects: [],
    effects: {} as EffectComponentsRecord
};

export const TEMPLATE_ENCHANTMENT: RegistryElement<EnchantmentProps>[] = [
    {
        identifier: new Identifier("enchantplus", "enchantment", "bow/accuracy_shot"),
        data: {
            ...prefiledProperties,
            description: {
                translate: "enchantment.enchantplus.accuracy_shot",
                fallback: "Accuracy Shot"
            },
            supportedItems: "#voxel:enchantable/range",
            tags: [
                "#minecraft:non_treasure",
                "#yggdrasil:structure/alfheim_tree/ominous_vault",
                "#yggdrasil:structure/alfheim_tree/random_loot",
                "#yggdrasil:structure/asflors/common"
            ],
            slots: ["mainhand", "offhand"]
        }
    },
    {
        identifier: new Identifier("enchantplus", "enchantment", "boots/agility"),
        data: {
            ...prefiledProperties,
            description: {
                translate: "enchantment.enchantplus.agility",
                fallback: "Agility"
            },
            supportedItems: "#minecraft:enchantable/foot_armor",
            tags: [
                "#minecraft:non_treasure",
                "#yggdrasil:equipment/item/boots",
                "#yggdrasil:structure/alfheim_tree/random_loot",
                "#yggdrasil:structure/runic_labyrinth/library",
                "#yggdrasil:structure/runic_labyrinth/shulker",
                "#yggdrasil:structure/runic_labyrinth/vault"
            ],
            slots: ["feet"]
        }
    },
    {
        identifier: new Identifier("enchantplus", "enchantment", "elytra/armored"),
        data: {
            ...prefiledProperties,
            description: {
                translate: "enchantment.enchantplus.armored",
                fallback: "Armored"
            },
            supportedItems: "#voxel:enchantable/elytra",
            tags: ["#yggdrasil:structure/alfheim_tree/ominous_vault", "#yggdrasil:structure/runic_labyrinth/ominous_vault"],
            slots: ["chest"]
        }
    },
    {
        identifier: new Identifier("enchantplus", "enchantment", "sword/attack_speed"),
        data: {
            ...prefiledProperties,
            description: {
                translate: "enchantment.enchantplus.attack_speed",
                fallback: "Attack Speed"
            },
            exclusiveSet: "#enchantplus:exclusive_set/sword_attribute",
            supportedItems: "#minecraft:enchantable/sword",
            tags: [
                "#enchantplus:exclusive_set/sword_attribute",
                "#minecraft:non_treasure",
                "#yggdrasil:equipment/item/sword",
                "#yggdrasil:structure/alfheim_tree/random_loot"
            ],
            slots: ["mainhand"],
            assignedTags: ["#enchantplus:exclusive_set/sword_attribute"]
        }
    },
    {
        identifier: new Identifier("enchantplus", "enchantment", "helmet/auto_feed"),
        data: {
            ...prefiledProperties,
            description: {
                translate: "enchantment.enchantplus.auto_feed",
                fallback: "Auto Feed"
            },
            supportedItems: "#minecraft:enchantable/head_armor",
            tags: [
                "#minecraft:on_random_loot",
                "#yggdrasil:structure/alfheim_tree/trial_spawner",
                "#yggdrasil:structure/alfheim_tree/vault"
            ],
            slots: ["head"]
        }
    },
    {
        identifier: new Identifier("enchantplus", "enchantment", "tools/auto_smelt"),
        data: {
            ...prefiledProperties,
            description: {
                translate: "enchantment.enchantplus.auto_smelt",
                fallback: "Auto Smelt"
            },
            supportedItems: "#minecraft:enchantable/mining_loot",
            tags: [
                "#minecraft:non_treasure",
                "#minecraft:on_traded_equipment",
                "#minecraft:tradeable",
                "#yggdrasil:structure/alfheim_tree/trial_spawner",
                "#yggdrasil:structure/alfheim_tree/vault",
                "#yggdrasil:structure/asflors/rare",
                "#yggdrasil:structure/generic/ominous_trial_spawner",
                "#yggdrasil:structure/generic/trial_spawner",
                "#yggdrasil:structure/runic_fracture/trial_spawner"
            ],
            slots: ["mainhand"]
        }
    },
    {
        identifier: new Identifier("enchantplus", "enchantment", "pickaxe/bedrock_breaker"),
        data: {
            ...prefiledProperties,
            description: {
                translate: "enchantment.enchantplus.bedrock_breaker",
                fallback: "Bedrock Breaker"
            },
            exclusiveSet: "#enchantplus:exclusive_set/mining",
            supportedItems: "#voxel:enchantable/pickaxes",
            tags: [
                "#enchantplus:exclusive_set/mining",
                "#yggdrasil:structure/asflors/rare",
                "#yggdrasil:structure/runic_fracture/trial_spawner"
            ],
            slots: ["mainhand"],
            assignedTags: ["#enchantplus:exclusive_set/mining"]
        }
    },
    {
        identifier: new Identifier("enchantplus", "enchantment", "bow/breezing_arrow"),
        data: {
            ...prefiledProperties,
            description: {
                translate: "enchantment.enchantplus.breezing_arrow",
                fallback: "Breezing Arrows"
            },
            exclusiveSet: "#enchantplus:exclusive_set/bow",
            supportedItems: "#voxel:enchantable/range",
            tags: [
                "#enchantplus:exclusive_set/bow",
                "#yggdrasil:equipment/item/bow",
                "#yggdrasil:structure/alfheim_tree/ominous_trial_spawner",
                "#yggdrasil:structure/alfheim_tree/ominous_vault",
                "#yggdrasil:structure/asflors/common",
                "#yggdrasil:structure/runic_fracture/monster_trial_spawner",
                "#yggdrasil:structure/runic_labyrinth/ominous_vault"
            ],
            slots: ["mainhand", "offhand"],
            assignedTags: ["#enchantplus:exclusive_set/bow"]
        }
    },
    {
        identifier: new Identifier("enchantplus", "enchantment", "helmet/bright_vision"),
        data: {
            ...prefiledProperties,
            description: {
                translate: "enchantment.enchantplus.bright_vision",
                fallback: "Bright Vision"
            },
            supportedItems: "#minecraft:enchantable/head_armor",
            tags: ["#minecraft:non_treasure"],
            slots: ["head"],
            assignedTags: [],
            softDelete: false,
            disabledEffects: []
        }
    },
    {
        identifier: new Identifier("enchantplus", "enchantment", "chestplate/builder_arm"),
        data: {
            ...prefiledProperties,
            description: {
                translate: "enchantment.enchantplus.builder_arm",
                fallback: "Builder Arm"
            },
            supportedItems: "#minecraft:enchantable/chest_armor",
            tags: [
                "#minecraft:on_random_loot",
                "#minecraft:treasure",
                "#yggdrasil:structure/alfheim_tree/trial_spawner",
                "#yggdrasil:structure/alfheim_tree/vault",
                "#yggdrasil:structure/asflors/common"
            ],
            slots: ["chest"]
        }
    },
    {
        identifier: new Identifier("enchantplus", "enchantment", "durability/curse_of_breaking"),
        data: {
            ...prefiledProperties,
            description: {
                translate: "enchantment.enchantplus.curse_of_breaking",
                fallback: "Curse of Breaking"
            },
            exclusiveSet: "#enchantplus:exclusive_set/durability",
            supportedItems: "#minecraft:enchantable/durability",
            tags: [
                "#enchantplus:exclusive_set/durability",
                "#minecraft:curse",
                "#minecraft:on_random_loot",
                "#yggdrasil:structure/alfheim_tree/random_loot",
                "#yggdrasil:structure/asflors/common"
            ],
            slots: ["any"],
            assignedTags: ["#enchantplus:exclusive_set/durability"]
        }
    },
    {
        identifier: new Identifier("enchantplus", "enchantment", "durability/curse_of_enchant"),
        data: {
            ...prefiledProperties,
            description: {
                translate: "enchantment.enchantplus.curse_of_enchant",
                fallback: "Curse of Enchant"
            },
            exclusiveSet: "#enchantplus:exclusive_set/durability",
            supportedItems: "#minecraft:enchantable/durability",
            tags: ["#minecraft:curse", "#minecraft:on_random_loot"],
            slots: ["any"],
            assignedTags: ["#enchantplus:exclusive_set/durability"]
        }
    },
    {
        identifier: new Identifier("enchantplus", "enchantment", "leggings/dwarfed"),
        data: {
            ...prefiledProperties,
            description: {
                translate: "enchantment.enchantplus.dwarfed",
                fallback: "Dwarfed"
            },
            exclusiveSet: "#enchantplus:exclusive_set/size",
            supportedItems: "#minecraft:enchantable/leg_armor",
            tags: [
                "#enchantplus:exclusive_set/size",
                "#minecraft:curse",
                "#minecraft:non_treasure",
                "#yggdrasil:equipment/item/leggings",
                "#yggdrasil:structure/runic_labyrinth/ominous_vault",
                "#yggdrasil:structure/runic_labyrinth/vault"
            ],
            slots: ["legs"],
            assignedTags: ["#enchantplus:exclusive_set/size"]
        }
    },
    {
        identifier: new Identifier("enchantplus", "enchantment", "bow/echo_shot"),
        data: {
            ...prefiledProperties,
            description: {
                translate: "enchantment.enchantplus.echo_shot",
                fallback: "Echo Shot"
            },
            exclusiveSet: "#enchantplus:exclusive_set/bow",
            supportedItems: "#voxel:enchantable/range",
            tags: [
                "#enchantplus:exclusive_set/bow",
                "#minecraft:double_trade_price",
                "#minecraft:on_mob_spawn_equipment",
                "#minecraft:on_random_loot",
                "#minecraft:on_traded_equipment",
                "#minecraft:tradeable",
                "#yggdrasil:equipment/item/bow",
                "#yggdrasil:structure/generic/ominous_trial_spawner",
                "#yggdrasil:structure/runic_labyrinth/library",
                "#yggdrasil:structure/runic_labyrinth/ominous_vault",
                "#yggdrasil:structure/runic_labyrinth/twilight_of_yggdrasil_bow",
                "#yggdrasil:structure/runic_labyrinth/vault"
            ],
            slots: ["mainhand", "offhand"],
            assignedTags: ["#enchantplus:exclusive_set/bow"]
        }
    },
    {
        identifier: new Identifier("enchantplus", "enchantment", "bow/eternal_frost"),
        data: {
            ...prefiledProperties,
            description: {
                translate: "enchantment.enchantplus.eternal_frost",
                fallback: "Eternal Frost"
            },
            exclusiveSet: "#enchantplus:exclusive_set/bow",
            supportedItems: "#voxel:enchantable/range",
            tags: [
                "#enchantplus:exclusive_set/bow",
                "#minecraft:double_trade_price",
                "#minecraft:in_enchanting_table",
                "#minecraft:on_mob_spawn_equipment",
                "#minecraft:on_traded_equipment",
                "#minecraft:tradeable",
                "#yggdrasil:equipment/item/bow",
                "#yggdrasil:structure/alfheim_tree/trial_spawner",
                "#yggdrasil:structure/alfheim_tree/vault",
                "#yggdrasil:structure/asflors/rare",
                "#yggdrasil:structure/runic_fracture/trial_spawner",
                "#yggdrasil:structure/runic_labyrinth/library",
                "#yggdrasil:structure/runic_labyrinth/ominous_vault",
                "#yggdrasil:structure/runic_labyrinth/shulker",
                "#yggdrasil:structure/runic_labyrinth/twilight_of_yggdrasil_bow",
                "#yggdrasil:structure/runic_labyrinth/vault"
            ],
            slots: ["mainhand", "offhand"],
            assignedTags: ["#enchantplus:exclusive_set/bow"]
        }
    },
    {
        identifier: new Identifier("enchantplus", "enchantment", "bow/explosive_arrow"),
        data: {
            ...prefiledProperties,
            description: {
                translate: "enchantment.enchantplus.explosive_arrow",
                fallback: "Explosive Arrow"
            },
            exclusiveSet: "#enchantplus:exclusive_set/bow",
            supportedItems: "#voxel:enchantable/range",
            tags: [
                "#enchantplus:exclusive_set/bow",
                "#minecraft:on_random_loot",
                "#yggdrasil:structure/alfheim_tree/random_loot",
                "#yggdrasil:structure/runic_labyrinth/ominous_vault"
            ],
            slots: ["mainhand", "offhand"],
            assignedTags: ["#enchantplus:exclusive_set/bow"]
        }
    },
    {
        identifier: new Identifier("enchantplus", "enchantment", "leggings/fast_swim"),
        data: {
            ...prefiledProperties,
            description: {
                translate: "enchantment.enchantplus.fast_swim",
                fallback: "Fast Swim"
            },
            supportedItems: "#minecraft:enchantable/leg_armor",
            tags: ["#minecraft:treasure", "#yggdrasil:structure/alfheim_tree/random_loot"],
            slots: ["legs"],
            assignedTags: []
        }
    },
    {
        identifier: new Identifier("enchantplus", "enchantment", "sword/fear"),
        data: {
            ...prefiledProperties,
            description: {
                translate: "enchantment.enchantplus.fear",
                fallback: "Fear"
            },
            exclusiveSet: "#enchantplus:exclusive_set/sword_effect",
            supportedItems: "#minecraft:enchantable/sword",
            tags: ["#enchantplus:exclusive_set/sword_effect", "#minecraft:non_treasure"],
            slots: ["hand"],
            assignedTags: ["#enchantplus:exclusive_set/sword_effect"]
        }
    },
    {
        identifier: new Identifier("enchantplus", "enchantment", "armor/fury"),
        data: {
            ...prefiledProperties,
            description: {
                translate: "enchantment.enchantplus.fury",
                fallback: "Fury"
            },
            exclusiveSet: "#enchantplus:exclusive_set/armor",
            supportedItems: "#minecraft:enchantable/armor",
            tags: [
                "#enchantplus:exclusive_set/armor",
                "#minecraft:non_treasure",
                "#yggdrasil:equipment/item/chestplate",
                "#yggdrasil:structure/alfheim_tree/random_loot",
                "#yggdrasil:structure/runic_labyrinth/library"
            ],
            slots: ["armor"],
            assignedTags: ["#enchantplus:exclusive_set/armor"]
        }
    },
    {
        identifier: new Identifier("enchantplus", "enchantment", "trident/gungnir_breath"),
        data: {
            ...prefiledProperties,
            description: {
                translate: "enchantment.enchantplus.gungnir_breath",
                fallback: "Gungnir Breath"
            },
            exclusiveSet: "#enchantplus:exclusive_set/trident",
            supportedItems: "#minecraft:enchantable/trident",
            tags: [
                "#enchantplus:exclusive_set/trident",
                "#minecraft:in_enchanting_table",
                "#yggdrasil:equipment/item/sword",
                "#yggdrasil:structure/alfheim_tree/random_loot"
            ],
            slots: ["mainhand", "offhand"],
            assignedTags: ["#enchantplus:exclusive_set/trident"]
        }
    },
    {
        identifier: new Identifier("enchantplus", "enchantment", "sword/last_hope"),
        data: {
            ...prefiledProperties,
            description: {
                translate: "enchantment.enchantplus.last_hope",
                fallback: "Last Hope"
            },
            exclusiveSet: "#enchantplus:exclusive_set/sword_effect",
            supportedItems: "#minecraft:enchantable/sword",
            tags: [
                "#enchantplus:exclusive_set/sword_effect",
                "#yggdrasil:structure/asflors/stand",
                "#yggdrasil:structure/runic_fracture/boss_trial_spawner"
            ],
            slots: ["mainhand"],
            assignedTags: ["#enchantplus:exclusive_set/sword_effect"]
        }
    },
    {
        identifier: new Identifier("enchantplus", "enchantment", "boots/lava_walker"),
        data: {
            ...prefiledProperties,
            description: {
                translate: "enchantment.enchantplus.lava_walker",
                fallback: "Lava Walker"
            },
            exclusiveSet: "#minecraft:exclusive_set/boots",
            supportedItems: "#minecraft:enchantable/foot_armor",
            tags: [
                "#minecraft:exclusive_set/boots",
                "#yggdrasil:structure/alfheim_tree/ominous_vault",
                "#yggdrasil:structure/alfheim_tree/random_loot"
            ],
            slots: ["feet"],
            assignedTags: ["#minecraft:exclusive_set/boots"]
        }
    },
    {
        identifier: new Identifier("enchantplus", "enchantment", "leggings/leaping"),
        data: {
            ...prefiledProperties,
            description: {
                translate: "enchantment.enchantplus.leaping",
                fallback: "Leaping"
            },
            supportedItems: "#minecraft:enchantable/leg_armor",
            tags: ["#minecraft:non_treasure", "#yggdrasil:structure/alfheim_tree/random_loot"],
            slots: ["legs"],
            assignedTags: []
        }
    },
    {
        identifier: new Identifier("enchantplus", "enchantment", "sword/life_steal"),
        data: {
            ...prefiledProperties,
            description: {
                translate: "enchantment.enchantplus.life_steal",
                fallback: "Life Steal"
            },
            exclusiveSet: "#enchantplus:exclusive_set/sword_effect",
            supportedItems: "#minecraft:enchantable/weapon",
            primaryItems: "#minecraft:enchantable/sword",
            tags: [
                "#enchantplus:exclusive_set/sword_effect",
                "#minecraft:non_treasure",
                "#yggdrasil:structure/alfheim_tree/random_loot",
                "#yggdrasil:structure/runic_labyrinth/vault"
            ],
            slots: ["mainhand"],
            assignedTags: ["#enchantplus:exclusive_set/sword_effect"]
        }
    },
    {
        identifier: new Identifier("enchantplus", "enchantment", "armor/lifeplus"),
        data: {
            ...prefiledProperties,
            description: {
                translate: "enchantment.enchantplus.lifeplus",
                fallback: "Life+"
            },
            exclusiveSet: "#enchantplus:exclusive_set/armor",
            supportedItems: "#minecraft:enchantable/armor",
            tags: [
                "#enchantplus:exclusive_set/armor",
                "#minecraft:non_treasure",
                "#yggdrasil:equipment/item/chestplate",
                "#yggdrasil:structure/alfheim_tree/random_loot"
            ],
            slots: ["armor"],
            assignedTags: ["#enchantplus:exclusive_set/armor"]
        }
    },
    {
        identifier: new Identifier("enchantplus", "enchantment", "tools/miningplus"),
        data: {
            ...prefiledProperties,
            description: {
                translate: "enchantment.enchantplus.miningplus",
                fallback: "Mining+"
            },
            exclusiveSet: "#enchantplus:exclusive_set/mining",
            supportedItems: "#minecraft:enchantable/mining_loot",
            tags: [
                "#enchantplus:exclusive_set/mining",
                "#minecraft:on_traded_equipment",
                "#minecraft:tradeable",
                "#yggdrasil:structure/alfheim_tree/trial_spawner",
                "#yggdrasil:structure/alfheim_tree/vault"
            ],
            slots: ["mainhand"],
            assignedTags: ["#enchantplus:exclusive_set/mining"]
        }
    },
    {
        identifier: new Identifier("enchantplus", "enchantment", "leggings/oversize"),
        data: {
            ...prefiledProperties,
            description: {
                translate: "enchantment.enchantplus.oversize",
                fallback: "Oversize"
            },
            exclusiveSet: "#enchantplus:exclusive_set/size",
            supportedItems: "#minecraft:enchantable/leg_armor",
            tags: [
                "#enchantplus:exclusive_set/size",
                "#minecraft:curse",
                "#minecraft:on_random_loot",
                "#yggdrasil:equipment/item/leggings",
                "#yggdrasil:structure/alfheim_tree/trial_spawner",
                "#yggdrasil:structure/alfheim_tree/vault",
                "#yggdrasil:structure/asflors/common",
                "#yggdrasil:structure/runic_labyrinth/ominous_vault",
                "#yggdrasil:structure/runic_labyrinth/vault"
            ],
            slots: ["legs"],
            assignedTags: ["#enchantplus:exclusive_set/size"]
        }
    },
    {
        identifier: new Identifier("enchantplus", "enchantment", "sword/poison_aspect"),
        data: {
            ...prefiledProperties,
            description: {
                translate: "enchantment.enchantplus.poison_aspect",
                fallback: "Poison Aspect"
            },
            exclusiveSet: "#enchantplus:exclusive_set/aspect",
            supportedItems: "#minecraft:enchantable/weapon",
            primaryItems: "#minecraft:enchantable/sword",
            tags: [
                "#enchantplus:exclusive_set/aspect",
                "#minecraft:non_treasure",
                "#yggdrasil:equipment/item/sword",
                "#yggdrasil:structure/alfheim_tree/random_loot"
            ],
            slots: ["mainhand"],
            assignedTags: ["#enchantplus:exclusive_set/aspect"]
        }
    },
    {
        identifier: new Identifier("enchantplus", "enchantment", "sword/pull"),
        data: {
            ...prefiledProperties,
            description: {
                translate: "enchantment.enchantplus.pull",
                fallback: "Pull"
            },
            exclusiveSet: "#enchantplus:exclusive_set/sword_effect",
            supportedItems: "#minecraft:enchantable/weapon",
            primaryItems: "#minecraft:enchantable/sword",
            tags: [
                "#enchantplus:exclusive_set/sword_effect",
                "#yggdrasil:structure/alfheim_tree/ominous_trial_spawner",
                "#yggdrasil:structure/generic/ominous_trial_spawner",
                "#yggdrasil:structure/runic_fracture/monster_trial_spawner",
                "#yggdrasil:structure/runic_labyrinth/library",
                "#yggdrasil:structure/runic_labyrinth/ominous_vault",
                "#yggdrasil:structure/runic_labyrinth/shulker",
                "#yggdrasil:structure/runic_labyrinth/vault"
            ],
            slots: ["mainhand"],
            assignedTags: ["#enchantplus:exclusive_set/sword_effect"]
        }
    },
    {
        identifier: new Identifier("enchantplus", "enchantment", "sword/reach"),
        data: {
            ...prefiledProperties,
            description: {
                translate: "enchantment.enchantplus.reach",
                fallback: "Reach"
            },
            exclusiveSet: "#enchantplus:exclusive_set/sword_attribute",
            supportedItems: "#minecraft:enchantable/sword",
            tags: [
                "#enchantplus:exclusive_set/sword_attribute",
                "#minecraft:on_mob_spawn_equipment",
                "#minecraft:on_traded_equipment",
                "#minecraft:tradeable",
                "#yggdrasil:equipment/item/sword",
                "#yggdrasil:structure/alfheim_tree/trial_spawner",
                "#yggdrasil:structure/alfheim_tree/vault"
            ],
            slots: ["mainhand"],
            assignedTags: ["#enchantplus:exclusive_set/sword_attribute"]
        }
    },
    {
        identifier: new Identifier("enchantplus", "enchantment", "bow/rebound"),
        data: {
            ...prefiledProperties,
            description: {
                translate: "enchantment.enchantplus.rebound",
                fallback: "Rebound"
            },
            supportedItems: "#voxel:enchantable/range",
            tags: [
                "#enchantplus:exclusive_set/archery",
                "#minecraft:on_mob_spawn_equipment",
                "#yggdrasil:equipment/item/bow",
                "#yggdrasil:structure/generic/ominous_trial_spawner",
                "#yggdrasil:structure/runic_labyrinth/dark_elven_bow",
                "#yggdrasil:structure/runic_labyrinth/library",
                "#yggdrasil:structure/runic_labyrinth/ominous_vault",
                "#yggdrasil:structure/runic_labyrinth/shulker",
                "#yggdrasil:structure/runic_labyrinth/twilight_of_yggdrasil_bow",
                "#yggdrasil:structure/runic_labyrinth/vault"
            ],
            slots: ["mainhand", "offhand"],
            assignedTags: []
        }
    },
    {
        identifier: new Identifier("enchantplus", "enchantment", "hoe/scyther"),
        data: {
            ...prefiledProperties,
            description: {
                translate: "enchantment.enchantplus.scyther",
                fallback: "Scyther"
            },
            supportedItems: "#voxel:enchantable/hoes",
            tags: ["#minecraft:non_treasure", "#yggdrasil:structure/alfheim_tree/trial_spawner", "#yggdrasil:structure/alfheim_tree/vault"],
            slots: ["mainhand"],
            assignedTags: []
        }
    },
    {
        identifier: new Identifier("enchantplus", "enchantment", "boots/sky_walk"),
        data: {
            ...prefiledProperties,
            description: {
                translate: "enchantment.enchantplus.disable_for_1.21.2",
                fallback: "Sky Walk (Disable for 1.21.2)"
            },
            exclusiveSet: "#minecraft:exclusive_set/boots",
            supportedItems: "#minecraft:enchantable/foot_armor",
            tags: [
                "#minecraft:exclusive_set/boots",
                "#minecraft:non_treasure",
                "#yggdrasil:equipment/item/boots",
                "#yggdrasil:structure/alfheim_tree/trial_spawner",
                "#yggdrasil:structure/alfheim_tree/vault",
                "#yggdrasil:structure/runic_labyrinth/library"
            ],
            slots: ["feet"],
            assignedTags: ["#minecraft:exclusive_set/boots"]
        }
    },
    {
        identifier: new Identifier("enchantplus", "enchantment", "pickaxe/spawner_touch"),
        data: {
            ...prefiledProperties,
            description: {
                translate: "enchantment.enchantplus.spawner_touch",
                fallback: "Spawner Touch"
            },
            exclusiveSet: "#enchantplus:exclusive_set/mining",
            supportedItems: "#voxel:enchantable/pickaxes",
            tags: [
                "#enchantplus:exclusive_set/mining",
                "#yggdrasil:structure/alfheim_tree/ominous_trial_spawner",
                "#yggdrasil:structure/generic/ominous_trial_spawner",
                "#yggdrasil:structure/runic_fracture/monster_trial_spawner",
                "#yggdrasil:structure/runic_labyrinth/library",
                "#yggdrasil:structure/runic_labyrinth/ominous_vault",
                "#yggdrasil:structure/runic_labyrinth/shulker",
                "#yggdrasil:structure/runic_labyrinth/vault"
            ],
            slots: ["mainhand"],
            assignedTags: ["#enchantplus:exclusive_set/mining"]
        }
    },
    {
        identifier: new Identifier("enchantplus", "enchantment", "boots/step_assist"),
        data: {
            ...prefiledProperties,
            description: {
                translate: "enchantment.enchantplus.step_assist",
                fallback: "Step Assist"
            },
            exclusiveSet: "#minecraft:exclusive_set/boots",
            supportedItems: "#minecraft:enchantable/foot_armor",
            tags: [
                "#minecraft:exclusive_set/boots",
                "#yggdrasil:equipment/item/boots",
                "#yggdrasil:structure/alfheim_tree/ominous_vault",
                "#yggdrasil:structure/alfheim_tree/random_loot",
                "#yggdrasil:structure/generic/trial_spawner",
                "#yggdrasil:structure/runic_labyrinth/library",
                "#yggdrasil:structure/runic_labyrinth/shulker",
                "#yggdrasil:structure/runic_labyrinth/vault"
            ],
            slots: ["feet"],
            assignedTags: ["#minecraft:exclusive_set/boots"]
        }
    },
    {
        identifier: new Identifier("enchantplus", "enchantment", "bow/storm_arrow"),
        data: {
            ...prefiledProperties,
            description: {
                translate: "enchantment.enchantplus.storm_arrow",
                fallback: "Storm Arrows"
            },
            exclusiveSet: "#enchantplus:exclusive_set/bow",
            supportedItems: "#voxel:enchantable/range",
            tags: ["#enchantplus:exclusive_set/bow", "#yggdrasil:equipment/item/bow", "#yggdrasil:structure/runic_labyrinth/ominous_vault"],
            slots: ["mainhand", "offhand"],
            assignedTags: ["#enchantplus:exclusive_set/bow"]
        }
    },
    {
        identifier: new Identifier("enchantplus", "enchantment", "mace/striker"),
        data: {
            ...prefiledProperties,
            description: {
                translate: "enchantment.minecraft.striker",
                fallback: "Striker"
            },
            supportedItems: "#minecraft:enchantable/mace",
            tags: [
                "#minecraft:on_traded_equipment",
                "#yggdrasil:structure/alfheim_tree/trial_spawner",
                "#yggdrasil:structure/alfheim_tree/vault",
                "#yggdrasil:structure/asflors/rare",
                "#yggdrasil:structure/generic/trial_spawner",
                "#yggdrasil:structure/runic_fracture/trial_spawner",
                "#yggdrasil:structure/runic_labyrinth/library",
                "#yggdrasil:structure/runic_labyrinth/ominous_vault",
                "#yggdrasil:structure/runic_labyrinth/shulker",
                "#yggdrasil:structure/runic_labyrinth/vault"
            ],
            slots: ["mainhand"],
            assignedTags: []
        }
    },
    {
        identifier: new Identifier("enchantplus", "enchantment", "sword/tears_of_asflors"),
        data: {
            ...prefiledProperties,
            description: {
                translate: "enchantment.enchantplus.tears_of_asflors",
                fallback: "Tears of Asflors",
                color: "#ffcbfc"
            },
            exclusiveSet: "#enchantplus:exclusive_set/sword_effect",
            supportedItems: "#minecraft:enchantable/sword",
            tags: [
                "#enchantplus:exclusive_set/sword_effect",
                "#yggdrasil:structure/asflors/asflors_sword",
                "#yggdrasil:structure/asflors/ominous_vault",
                "#yggdrasil:structure/asflors/vault"
            ],
            slots: ["mainhand"],
            assignedTags: ["#enchantplus:exclusive_set/sword_effect"]
        }
    },
    {
        identifier: new Identifier("enchantplus", "enchantment", "mace/teluric_wave"),
        data: {
            ...prefiledProperties,
            description: {
                translate: "enchantment.enchantplus.teluric_wave",
                fallback: "Teluric Wave"
            },
            exclusiveSet: "#enchantplus:exclusive_set/mace",
            supportedItems: "#minecraft:enchantable/mace",
            tags: [
                "#enchantplus:exclusive_set/mace",
                "#yggdrasil:structure/generic/ominous_trial_spawner",
                "#yggdrasil:structure/generic/trial_spawner",
                "#yggdrasil:structure/runic_labyrinth/library"
            ],
            slots: ["mainhand"],
            assignedTags: ["#enchantplus:exclusive_set/mace"]
        }
    },
    {
        identifier: new Identifier("enchantplus", "enchantment", "axe/timber"),
        data: {
            ...prefiledProperties,
            description: {
                translate: "enchantment.enchantplus.timber",
                fallback: "Timber"
            },
            supportedItems: "#voxel:enchantable/axes",
            tags: [
                "#minecraft:non_treasure",
                "#yggdrasil:structure/alfheim_tree/trial_spawner",
                "#yggdrasil:structure/alfheim_tree/vault",
                "#yggdrasil:structure/runic_labyrinth/library",
                "#yggdrasil:structure/runic_labyrinth/ominous_vault",
                "#yggdrasil:structure/runic_labyrinth/shulker",
                "#yggdrasil:structure/runic_labyrinth/vault"
            ],
            slots: ["mainhand"],
            assignedTags: []
        }
    },
    {
        identifier: new Identifier("enchantplus", "enchantment", "pickaxe/vein_miner"),
        data: {
            ...prefiledProperties,
            description: {
                translate: "enchantment.enchantplus.vein_miner",
                fallback: "Vein Miner"
            },
            exclusiveSet: "#enchantplus:exclusive_set/mining",
            supportedItems: "#voxel:enchantable/pickaxes",
            tags: [
                "#enchantplus:exclusive_set/mining",
                "#minecraft:double_trade_price",
                "#minecraft:on_traded_equipment",
                "#minecraft:tradeable",
                "#yggdrasil:structure/alfheim_tree/trial_spawner",
                "#yggdrasil:structure/alfheim_tree/vault",
                "#yggdrasil:structure/generic/ominous_trial_spawner",
                "#yggdrasil:structure/runic_labyrinth/library",
                "#yggdrasil:structure/runic_labyrinth/ominous_vault",
                "#yggdrasil:structure/runic_labyrinth/shulker",
                "#yggdrasil:structure/runic_labyrinth/vault"
            ],
            slots: ["mainhand"],
            assignedTags: ["#enchantplus:exclusive_set/mining"]
        }
    },
    {
        identifier: new Identifier("enchantplus", "enchantment", "armor/venom_protection"),
        data: {
            ...prefiledProperties,
            description: {
                translate: "enchantment.enchantplus.venom_protection",
                fallback: "Venom Protection"
            },
            exclusiveSet: "#minecraft:exclusive_set/armor",
            supportedItems: "#minecraft:enchantable/armor",
            tags: [
                "#minecraft:exclusive_set/armor",
                "#minecraft:treasure",
                "#yggdrasil:structure/alfheim_tree/random_loot",
                "#yggdrasil:structure/runic_labyrinth/library"
            ],
            slots: ["armor"],
            assignedTags: ["#minecraft:exclusive_set/armor"]
        }
    },
    {
        identifier: new Identifier("enchantplus", "enchantment", "helmet/voidless"),
        data: {
            ...prefiledProperties,
            description: {
                translate: "enchantment.enchantplus.voidless",
                fallback: "Voidless"
            },
            supportedItems: "#minecraft:enchantable/head_armor",
            tags: ["#yggdrasil:structure/alfheim_tree/ominous_vault", "#yggdrasil:structure/runic_labyrinth/ominous_vault"],
            slots: ["head"],
            assignedTags: []
        }
    },
    {
        identifier: new Identifier("enchantplus", "enchantment", "mace/wind_propulsion"),
        data: {
            ...prefiledProperties,
            description: {
                translate: "enchantment.minecraft.wind_propulsion",
                fallback: "Wind Propulsion"
            },
            supportedItems: "#minecraft:enchantable/mace",
            tags: ["#minecraft:non_treasure", "#yggdrasil:structure/alfheim_tree/trial_spawner", "#yggdrasil:structure/alfheim_tree/vault"],
            slots: ["mainhand"],
            assignedTags: []
        }
    },
    {
        identifier: new Identifier("enchantplus", "enchantment", "sword/xp_boost"),
        data: {
            ...prefiledProperties,
            description: {
                translate: "enchantment.enchantplus.xp_boost",
                fallback: "Xp Boost"
            },
            exclusiveSet: "#enchantplus:exclusive_set/sword_exp",
            supportedItems: "#minecraft:enchantable/sword",
            tags: [
                "#enchantplus:exclusive_set/sword_exp",
                "#minecraft:non_treasure",
                "#yggdrasil:structure/alfheim_tree/trial_spawner",
                "#yggdrasil:structure/alfheim_tree/vault",
                "#yggdrasil:structure/generic/trial_spawner",
                "#yggdrasil:structure/runic_labyrinth/library"
            ],
            slots: ["mainhand"],
            assignedTags: ["#enchantplus:exclusive_set/sword_exp"]
        }
    }
];

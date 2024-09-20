import type { ToolRevealElementType } from "@/lib/minecraft/components/elements/reveal/ToolRevealElementType.tsx";
import type { ToolConfiguration } from "@/lib/minecraft/core/engine";

const dungeon: ToolRevealElementType = {
    id: "dnt",
    logo: "/images/addons/logo/dnt.webp",
    image: "/images/addons/hero/dnt.png",
    soon: true,
    href: "https://modrinth.com/datapack/dungeons-and-taverns",
    title: "tools.enchantments.section.addons.dnt.title",
    description: "tools.enchantments.section.addons.dnt.description",
    children: [
        {
            type: "Category",
            title: "tools.enchantments.section.addons.dnt.overworld.title",
            children: [
                {
                    type: "Grid",
                    size: "400px",
                    children: [
                        {
                            type: "InlineSlot",
                            title: "tools.enchantments.section.addons.dnt.stay_fort.title",
                            image: "/images/addons/card/dnt/stay_fort.webp"
                        },
                        {
                            type: "InlineSlot",
                            title: "tools.enchantments.section.addons.dnt.swamp_villages.title",
                            image: "/images/addons/card/dnt/swamp_villages.webp"
                        },
                        {
                            type: "InlineSlot",
                            title: "tools.enchantments.section.addons.dnt.remnant.title",
                            image: "/images/addons/card/dnt/remnant.webp"
                        },
                        {
                            type: "InlineSlot",
                            title: "tools.enchantments.section.addons.dnt.taverns.title",
                            image: "/images/addons/card/dnt/taverns.webp"
                        },
                        {
                            type: "InlineSlot",
                            title: "tools.enchantments.section.addons.dnt.toxic_lair.title",
                            image: "/images/addons/card/dnt/toxic_lair.webp"
                        },
                        {
                            type: "InlineSlot",
                            title: "tools.enchantments.section.addons.dnt.wells.title",
                            image: "/images/addons/card/dnt/wells.webp"
                        },
                        {
                            type: "InlineSlot",
                            title: "tools.enchantments.section.addons.dnt.wild_ruins.title",
                            image: "/images/addons/card/dnt/wild_ruins.webp"
                        },
                        {
                            type: "InlineSlot",
                            title: "tools.enchantments.section.addons.dnt.badlands_miner.title",
                            image: "/images/addons/card/dnt/badlands_miner.webp"
                        },
                        {
                            type: "InlineSlot",
                            title: "tools.enchantments.section.addons.dnt.desert_ruins.title",
                            image: "/images/addons/card/dnt/desert_ruins.webp"
                        },
                        {
                            type: "InlineSlot",
                            title: "tools.enchantments.section.addons.dnt.firewatch_towers.title",
                            image: "/images/addons/card/dnt/firewatch_towers.webp"
                        },
                        {
                            type: "InlineSlot",
                            title: "tools.enchantments.section.addons.dnt.illager_camp.title",
                            image: "/images/addons/card/dnt/illager_camp.webp"
                        },
                        {
                            type: "InlineSlot",
                            title: "tools.enchantments.section.addons.dnt.illager_hideout.title",
                            image: "/images/addons/card/dnt/illager_hideout.webp"
                        },
                        {
                            type: "InlineSlot",
                            title: "tools.enchantments.section.addons.dnt.illager_manor.title",
                            image: "/images/addons/card/dnt/illager_manor.webp"
                        },
                        {
                            type: "InlineSlot",
                            title: "tools.enchantments.section.addons.dnt.jungle_ruins.title",
                            image: "/images/addons/card/dnt/jungle_ruins.webp"
                        },
                        {
                            type: "InlineSlot",
                            title: "tools.enchantments.section.addons.dnt.jungle_village.title",
                            image: "/images/addons/card/dnt/jungle_village.webp"
                        },
                        {
                            type: "InlineSlot",
                            title: "tools.enchantments.section.addons.dnt.witch_villa.title",
                            image: "/images/addons/card/dnt/witch_villa.webp"
                        },
                        {
                            type: "InlineSlot",
                            title: "tools.enchantments.section.addons.dnt.lone_citadel.title",
                            image: "/images/addons/card/dnt/lone_citadel.webp"
                        },
                        {
                            type: "InlineSlot",
                            title: "tools.enchantments.section.addons.dnt.mangrove_swamp_hut.title",
                            image: "/images/addons/card/dnt/mangrove_swamp_hut.webp"
                        },
                        {
                            type: "InlineSlot",
                            title: "tools.enchantments.section.addons.dnt.ruined_towns.title",
                            image: "/images/addons/card/dnt/ruined_towns.webp"
                        }
                    ]
                }
            ]
        },
        {
            type: "Category",
            title: "tools.enchantments.section.addons.dnt.nether.title",
            children: [
                {
                    type: "Grid",
                    size: "400px",
                    children: [
                        {
                            type: "InlineSlot",
                            title: "tools.enchantments.section.addons.dnt.hamlet.title",
                            image: "/images/addons/card/dnt/hamlet.webp"
                        },
                        {
                            type: "InlineSlot",
                            title: "tools.enchantments.section.addons.dnt.nether_keeps.title",
                            image: "/images/addons/card/dnt/nether_keeps.webp"
                        },
                        {
                            type: "InlineSlot",
                            title: "tools.enchantments.section.addons.dnt.nether_port.title",
                            image: "/images/addons/card/dnt/nether_port.webp"
                        },
                        {
                            type: "InlineSlot",
                            title: "tools.enchantments.section.addons.dnt.nether_skeleton.title",
                            image: "/images/addons/card/dnt/nether_skeleton.webp"
                        },
                        {
                            type: "InlineSlot",
                            title: "tools.enchantments.section.addons.dnt.nether_skeleton_tower.title",
                            image: "/images/addons/card/dnt/nether_skeleton_tower.webp"
                        },
                        {
                            type: "InlineSlot",
                            title: "tools.enchantments.section.addons.dnt.piglin_camps.title",
                            image: "/images/addons/card/dnt/piglin_camps.webp"
                        },
                        {
                            type: "InlineSlot",
                            title: "tools.enchantments.section.addons.dnt.piglin_donjon.title",
                            image: "/images/addons/card/dnt/piglin_donjon.webp"
                        },
                        {
                            type: "InlineSlot",
                            title: "tools.enchantments.section.addons.dnt.piglin_outstation.title",
                            image: "/images/addons/card/dnt/piglin_outstation.webp"
                        }
                    ]
                }
            ]
        },
        {
            type: "Category",
            title: "tools.enchantments.section.addons.dnt.end.title",
            children: [
                {
                    type: "Grid",
                    size: "400px",
                    children: [
                        {
                            type: "InlineSlot",
                            title: "tools.enchantments.section.addons.dnt.end_castle.title",
                            image: "/images/addons/card/dnt/end_castle.webp"
                        },
                        {
                            type: "InlineSlot",
                            title: "tools.enchantments.section.addons.dnt.end_lighthouse.title",
                            image: "/images/addons/card/dnt/end_lighthouse.webp"
                        },
                        {
                            type: "InlineSlot",
                            title: "tools.enchantments.section.addons.dnt.end_ships.title",
                            image: "/images/addons/card/dnt/end_ships.webp"
                        }
                    ]
                }
            ]
        },
        {
            type: "Category",
            title: "tools.enchantments.section.addons.dnt.underground.title",
            children: [
                {
                    type: "Grid",
                    size: "400px",
                    children: [
                        {
                            type: "InlineSlot",
                            title: "tools.enchantments.section.addons.dnt.shrines.title",
                            image: "/images/addons/card/dnt/shrines.webp"
                        },
                        {
                            type: "InlineSlot",
                            title: "tools.enchantments.section.addons.dnt.undead_crypt.title",
                            image: "/images/addons/card/dnt/undead_crypt.webp"
                        },
                        {
                            type: "InlineSlot",
                            title: "tools.enchantments.section.addons.dnt.underground_house.title",
                            image: "/images/addons/card/dnt/underground_house.webp"
                        },
                        {
                            type: "InlineSlot",
                            title: "tools.enchantments.section.addons.dnt.bunker.title",
                            image: "/images/addons/card/dnt/bunker.webp"
                        },
                        {
                            type: "InlineSlot",
                            title: "tools.enchantments.section.addons.dnt.creeping_crypt.title",
                            image: "/images/addons/card/dnt/creeping_crypt.webp"
                        }
                    ]
                }
            ]
        },
        {
            type: "Category",
            title: "tools.enchantments.section.addons.dnt.underwater.title",
            children: [
                {
                    type: "Grid",
                    size: "400px",
                    children: [
                        {
                            type: "InlineSlot",
                            title: "tools.enchantments.section.addons.dnt.conduit_ruin.title",
                            image: "/images/addons/card/dnt/conduit_ruin.webp"
                        },
                        {
                            type: "InlineSlot",
                            title: "tools.enchantments.section.addons.dnt.trident-trail",
                            image: "/images/addons/card/dnt/trident_trail.webp"
                        }
                    ]
                }
            ]
        }
    ]
};

export const ENCHANT_TOOL_CONFIG: ToolConfiguration = {
    interface: [
        {
            id: "global",
            section: "tools.enchantments.section.global",
            components: [
                {
                    type: "Section",
                    title: "tools.enchantments.section.global.description",
                    id: "main",
                    children: [
                        {
                            type: "Grid",
                            children: [
                                {
                                    type: "Counter",
                                    title: "tools.enchantments.section.global.components.maxLevel.title",
                                    description: "tools.enchantments.section.global.components.maxLevel.description",
                                    image: "/icons/tools/level.svg",
                                    min: 1,
                                    max: 10,
                                    step: 1,
                                    action: { type: "Dynamic", field: "maxLevel" },
                                    value: {
                                        params: {
                                            type: "Field",
                                            field: "maxLevel"
                                        }
                                    }
                                },
                                {
                                    type: "Counter",
                                    title: "tools.enchantments.section.global.components.weight.title",
                                    description: "tools.enchantments.section.global.components.weight.description",
                                    image: "/icons/tools/weight.svg",
                                    min: 1,
                                    max: 20,
                                    step: 1,
                                    action: { type: "Dynamic", field: "weight" },
                                    value: {
                                        params: {
                                            type: "Field",
                                            field: "weight"
                                        }
                                    }
                                },
                                {
                                    type: "Counter",
                                    title: "tools.enchantments.section.global.components.anvilCost.title",
                                    description: "tools.enchantments.section.global.components.anvilCost.description",
                                    image: "/icons/tools/anvil.svg",
                                    min: 1,
                                    max: 20,
                                    step: 1,
                                    action: { type: "Dynamic", field: "anvilCost" },
                                    value: {
                                        params: {
                                            type: "Field",
                                            field: "anvilCost"
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            type: "Donation",
                            title: "tools.enchantments.section.global.components.donate.title",
                            description: "tools.enchantments.section.global.components.donate.description",
                            image: "/icons/tools/donate.svg",
                            link: "https://www.patreon.com/voxel"
                        }
                    ]
                }
            ]
        },
        {
            id: "find",
            section: "tools.enchantments.section.find",
            components: [
                {
                    type: "Section",
                    title: "tools.enchantments.section.find",
                    id: "behaviour",
                    children: [
                        {
                            type: "Grid",
                            children: [
                                {
                                    type: "Slot",
                                    image: "/images/features/block/enchanting_table.webp",
                                    title: "tools.enchantments.section.find.components.enchantingTable.title",
                                    description: "tools.enchantments.section.find.components.enchantingTable.description",
                                    action: {
                                        type: "List",
                                        field: "tags",
                                        value: "#minecraft:in_enchanting_table"
                                    },
                                    lock: {
                                        params: {
                                            type: "Value",
                                            value: "#minecraft:non_treasure"
                                        },
                                        condition: {
                                            condition: "Contains",
                                            type: "Tags",
                                            field: "tags",
                                            values: ["#minecraft:non_treasure"]
                                        }
                                    },
                                    condition: {
                                        type: "Tags",
                                        condition: "Contains",
                                        field: "tags",
                                        values: ["#minecraft:in_enchanting_table"]
                                    }
                                },
                                {
                                    type: "Slot",
                                    image: "/images/features/entity/zombie.webp",
                                    title: "tools.enchantments.section.find.components.mobEquipment.title",
                                    description: "tools.enchantments.section.find.components.mobEquipment.description",
                                    action: {
                                        type: "List",
                                        field: "tags",
                                        value: "#minecraft:on_mob_spawn_equipment"
                                    },
                                    lock: {
                                        params: {
                                            type: "Value",
                                            value: "#minecraft:non_treasure"
                                        },
                                        condition: {
                                            condition: "Contains",
                                            type: "Tags",
                                            field: "tags",
                                            values: ["#minecraft:non_treasure"]
                                        }
                                    },
                                    condition: {
                                        type: "Tags",
                                        condition: "Contains",
                                        field: "tags",
                                        values: ["#minecraft:on_mob_spawn_equipment"]
                                    }
                                },
                                {
                                    type: "Slot",
                                    image: "/images/features/block/chest.webp",
                                    title: "tools.enchantments.section.find.components.lootInChests.title",
                                    description: "tools.enchantments.section.find.components.lootInChests.description",
                                    action: {
                                        type: "List",
                                        field: "tags",
                                        value: "#minecraft:on_random_loot"
                                    },
                                    lock: {
                                        params: {
                                            type: "Value",
                                            value: "#minecraft:non_treasure"
                                        },
                                        condition: {
                                            condition: "Contains",
                                            type: "Tags",
                                            field: "tags",
                                            values: ["#minecraft:non_treasure"]
                                        }
                                    },
                                    condition: {
                                        type: "Tags",
                                        condition: "Contains",
                                        field: "tags",
                                        values: ["#minecraft:on_random_loot"]
                                    }
                                }
                            ]
                        },
                        {
                            type: "Grid",
                            children: [
                                {
                                    type: "Slot",
                                    title: "tools.enchantments.section.find.components.tradeable.title",
                                    image: "/images/features/item/enchanted_book.webp",
                                    description: "tools.enchantments.section.find.components.tradeable.description",
                                    action: {
                                        type: "List",
                                        field: "tags",
                                        value: "#minecraft:on_traded_equipment"
                                    },
                                    lock: {
                                        params: {
                                            type: "Value",
                                            value: "#minecraft:non_treasure"
                                        },
                                        condition: {
                                            condition: "Contains",
                                            type: "Tags",
                                            field: "tags",
                                            values: ["#minecraft:non_treasure"]
                                        }
                                    },
                                    condition: {
                                        type: "Tags",
                                        condition: "Contains",
                                        field: "tags",
                                        values: ["#minecraft:on_traded_equipment"]
                                    }
                                },
                                {
                                    type: "Slot",
                                    title: "tools.enchantments.section.find.components.tradeableEquipment.title",
                                    image: "/images/features/item/enchanted_item.webp",
                                    description: "tools.enchantments.section.find.components.tradeableEquipment.description",
                                    action: {
                                        type: "List",
                                        field: "tags",
                                        value: "#minecraft:tradeable"
                                    },
                                    lock: {
                                        params: {
                                            type: "Value",
                                            value: "#minecraft:non_treasure"
                                        },
                                        condition: {
                                            condition: "Contains",
                                            type: "Tags",
                                            field: "tags",
                                            values: ["#minecraft:non_treasure"]
                                        }
                                    },
                                    condition: {
                                        type: "Tags",
                                        condition: "Contains",
                                        field: "tags",
                                        values: ["#minecraft:tradeable"]
                                    }
                                },
                                {
                                    type: "Slot",
                                    title: "tools.enchantments.section.find.components.priceDoubled.title",
                                    image: "/images/features/title/doubled.webp",
                                    description: "tools.enchantments.section.find.components.priceDoubled.description",
                                    action: {
                                        type: "List",
                                        field: "tags",
                                        value: "#minecraft:double_trade_price"
                                    },
                                    lock: {
                                        params: {
                                            type: "Value",
                                            value: "#minecraft:treasure"
                                        },
                                        condition: {
                                            condition: "Contains",
                                            type: "Tags",
                                            field: "tags",
                                            values: ["#minecraft:treasure"]
                                        }
                                    },
                                    condition: {
                                        type: "Tags",
                                        condition: "Contains",
                                        field: "tags",
                                        values: ["#minecraft:double_trade_price"]
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    type: "Section",
                    title: "tools.enchantments.section.addons.description",
                    id: "addons",
                    children: [
                        {
                            type: "Reveal",
                            elements: [
                                {
                                    id: "yggdrasil",
                                    logo: "/images/addons/logo/yggdrasil.webp",
                                    image: "/images/addons/hero/yggdrasil.png",
                                    href: "https://modrinth.com/datapack/yggdrasil-structure",
                                    title: "tools.enchantments.section.addons.yggdrasil.title",
                                    description: "tools.enchantments.section.addons.yggdrasil.description",
                                    children: [
                                        {
                                            type: "Grid",
                                            children: [
                                                {
                                                    type: "Slot",
                                                    image: "/images/features/title/yg.webp",
                                                    title: "tools.enchantments.section.yggdrasil.components.yggdrasilMobEquipment.title",
                                                    description:
                                                        "tools.enchantments.section.yggdrasil.components.yggdrasilMobEquipment.description",
                                                    action: {
                                                        type: "Multiple",
                                                        field: "tags",
                                                        values: [
                                                            "#yggdrasil:equipment/item/bow",
                                                            "#yggdrasil:equipment/item/sword",
                                                            "#yggdrasil:equipment/item/helmet",
                                                            "#yggdrasil:equipment/item/chestplate",
                                                            "#yggdrasil:equipment/item/leggings",
                                                            "#yggdrasil:equipment/item/boots"
                                                        ]
                                                    },
                                                    condition: {
                                                        condition: "Contains",
                                                        type: "Tags",
                                                        field: "tags",
                                                        values: [
                                                            "#yggdrasil:equipment/item/bow",
                                                            "#yggdrasil:equipment/item/sword",
                                                            "#yggdrasil:equipment/item/helmet",
                                                            "#yggdrasil:equipment/item/chestplate",
                                                            "#yggdrasil:equipment/item/leggings",
                                                            "#yggdrasil:equipment/item/boots"
                                                        ]
                                                    }
                                                },
                                                {
                                                    type: "Slot",
                                                    image: "/images/tools/rarity/common.webp",
                                                    title: "tools.enchantments.section.yggdrasil.components.yggdrasilDropCommon.title",
                                                    description:
                                                        "tools.enchantments.section.yggdrasil.components.yggdrasilDropCommon.description",
                                                    action: {
                                                        type: "List",
                                                        field: "tags",
                                                        value: "#yggdrasil:structure/common"
                                                    },
                                                    condition: {
                                                        condition: "Contains",
                                                        type: "Tags",
                                                        field: "tags",
                                                        values: ["#yggdrasil:structure/common"]
                                                    }
                                                },
                                                {
                                                    type: "Slot",
                                                    image: "/images/tools/rarity/rare.webp",
                                                    title: "tools.enchantments.section.yggdrasil.components.yggdrasilDropRare.title",
                                                    description:
                                                        "tools.enchantments.section.yggdrasil.components.yggdrasilDropRare.description",
                                                    action: {
                                                        type: "List",
                                                        field: "tags",
                                                        value: "#yggdrasil:structure/rare"
                                                    },
                                                    condition: {
                                                        condition: "Contains",
                                                        type: "Tags",
                                                        field: "tags",
                                                        values: ["#yggdrasil:structure/rare"]
                                                    }
                                                },
                                                {
                                                    type: "Slot",
                                                    image: "/images/tools/rarity/unique.webp",
                                                    title: "tools.enchantments.section.yggdrasil.components.yggdrasilDropUnique.title",
                                                    description:
                                                        "tools.enchantments.section.yggdrasil.components.yggdrasilDropUnique.description",
                                                    action: {
                                                        type: "List",
                                                        field: "tags",
                                                        value: "#yggdrasil:structure/unique"
                                                    },
                                                    condition: {
                                                        condition: "Contains",
                                                        type: "Tags",
                                                        field: "tags",
                                                        values: ["#yggdrasil:structure/unique"]
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                },
                                dungeon
                            ]
                        }
                    ]
                }
            ]
        },
        {
            id: "slots",
            section: "tools.enchantments.section.slot",
            components: [
                {
                    type: "Section",
                    title: "tools.enchantments.section.slot.description",
                    id: "slots",
                    children: [
                        {
                            type: "Grid",
                            children: [
                                {
                                    type: "Slot",
                                    title: "tools.enchantments.section.exclusive.components.mainhand.title",
                                    image: "/images/features/slots/mainhand.webp",
                                    action: {
                                        type: "Slot",
                                        field: "slots",
                                        value: "mainhand"
                                    },
                                    condition: {
                                        condition: "Contains",
                                        type: "String",
                                        field: "slots",
                                        values: ["mainhand", "any", "hand"]
                                    }
                                },
                                {
                                    type: "Slot",
                                    title: "tools.enchantments.section.exclusive.components.offhand.title",
                                    image: "/images/features/slots/offhand.webp",
                                    action: {
                                        type: "Slot",
                                        field: "slots",
                                        value: "offhand"
                                    },
                                    condition: {
                                        condition: "Contains",
                                        type: "String",
                                        field: "slots",
                                        values: ["offhand", "any", "hand"]
                                    }
                                }
                            ]
                        },
                        {
                            type: "Grid",
                            children: [
                                {
                                    type: "Slot",
                                    title: "tools.enchantments.section.exclusive.components.head.title",
                                    image: "/images/features/slots/head.webp",
                                    action: {
                                        type: "Slot",
                                        field: "slots",
                                        value: "head"
                                    },
                                    condition: {
                                        condition: "Contains",
                                        type: "String",
                                        field: "slots",
                                        values: ["head", "any", "armor"]
                                    }
                                },
                                {
                                    type: "Slot",
                                    title: "tools.enchantments.section.exclusive.components.chest.title",
                                    image: "/images/features/slots/chest.webp",
                                    action: {
                                        type: "Slot",
                                        field: "slots",
                                        value: "chest"
                                    },
                                    condition: {
                                        condition: "Contains",
                                        type: "String",
                                        field: "slots",
                                        values: ["chest", "any", "armor"]
                                    }
                                },
                                {
                                    type: "Slot",
                                    title: "tools.enchantments.section.exclusive.components.legs.title",
                                    image: "/images/features/slots/legs.webp",
                                    action: {
                                        type: "Slot",
                                        field: "slots",
                                        value: "legs"
                                    },
                                    condition: {
                                        condition: "Contains",
                                        type: "String",
                                        field: "slots",
                                        values: ["legs", "any", "armor"]
                                    }
                                },
                                {
                                    type: "Slot",
                                    title: "tools.enchantments.section.exclusive.components.feet.title",
                                    image: "/images/features/slots/feet.webp",
                                    action: {
                                        type: "Slot",
                                        field: "slots",
                                        value: "feet"
                                    },
                                    condition: {
                                        condition: "Contains",
                                        type: "String",
                                        field: "slots",
                                        values: ["feet", "any", "armor"]
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            id: "supported",
            section: "tools.enchantments.section.supported",
            components: [
                {
                    type: "Section",
                    title: "tools.enchantments.section.supported.description",
                    id: "items",
                    toggle: [
                        {
                            name: "supportedItems",
                            title: "tools.enchantments.section.toggle.supported.title",
                            description: "tools.enchantments.section.toggle.supported.description"
                        },
                        {
                            name: "primaryItems",
                            title: "tools.enchantments.section.toggle.primary.title",
                            description: "tools.enchantments.section.toggle.primary.description"
                        }
                    ],
                    children: [
                        {
                            type: "Grid",
                            children: [
                                {
                                    type: "Slot",
                                    title: "tools.enchantments.section.supported.components.sword.title",
                                    image: "/images/features/item/sword.webp",
                                    action: {
                                        type: "String",
                                        value: "#minecraft:enchantable/sword",
                                        field: { type: "Toggle", group: "items" }
                                    },
                                    condition: {
                                        condition: "Equals",
                                        type: "String",
                                        field: { type: "Toggle", group: "items" },
                                        value: "#minecraft:enchantable/sword"
                                    }
                                },
                                {
                                    type: "Slot",
                                    title: "tools.enchantments.section.supported.components.trident.title",
                                    image: "/images/features/item/trident.webp",
                                    action: {
                                        type: "String",
                                        field: { type: "Toggle", group: "items" },
                                        value: "#minecraft:enchantable/trident"
                                    },
                                    condition: {
                                        condition: "Equals",
                                        type: "String",
                                        field: { type: "Toggle", group: "items" },
                                        value: "#minecraft:enchantable/trident"
                                    }
                                },
                                {
                                    type: "Slot",
                                    title: "tools.enchantments.section.supported.components.mace.title",
                                    image: "/images/features/item/mace.webp",
                                    action: {
                                        type: "String",
                                        field: { type: "Toggle", group: "items" },
                                        value: "#minecraft:enchantable/mace"
                                    },
                                    condition: {
                                        condition: "Equals",
                                        type: "String",
                                        field: { type: "Toggle", group: "items" },
                                        value: "#minecraft:enchantable/mace"
                                    }
                                },
                                {
                                    type: "Slot",
                                    title: "tools.enchantments.section.supported.components.bow.title",
                                    image: "/images/features/item/bow.webp",
                                    action: {
                                        type: "String",
                                        field: { type: "Toggle", group: "items" },
                                        value: "#minecraft:enchantable/bow"
                                    },
                                    condition: {
                                        condition: "Equals",
                                        type: "String",
                                        field: { type: "Toggle", group: "items" },
                                        value: "#minecraft:enchantable/bow"
                                    }
                                },
                                {
                                    type: "Slot",
                                    title: "tools.enchantments.section.supported.components.crossbow.title",
                                    image: "/images/features/item/crossbow.webp",
                                    action: {
                                        type: "String",
                                        field: { type: "Toggle", group: "items" },
                                        value: "#minecraft:enchantable/crossbow"
                                    },
                                    condition: {
                                        condition: "Equals",
                                        type: "String",
                                        field: { type: "Toggle", group: "items" },
                                        value: "#minecraft:enchantable/crossbow"
                                    }
                                },
                                {
                                    type: "Slot",
                                    title: "tools.enchantments.section.supported.components.range.title",
                                    image: "/images/features/item/range.webp",
                                    action: {
                                        type: "String",
                                        field: { type: "Toggle", group: "items" },
                                        value: "#voxel:enchantable/range"
                                    },
                                    condition: {
                                        condition: "Equals",
                                        type: "String",
                                        field: { type: "Toggle", group: "items" },
                                        value: "#voxel:enchantable/range"
                                    }
                                },
                                {
                                    type: "Slot",
                                    title: "tools.enchantments.section.supported.components.fishing.title",
                                    image: "/images/features/item/fishing_rod.webp",
                                    action: {
                                        type: "String",
                                        field: { type: "Toggle", group: "items" },
                                        value: "#minecraft:enchantable/fishing"
                                    },
                                    condition: {
                                        condition: "Equals",
                                        type: "String",
                                        field: { type: "Toggle", group: "items" },
                                        value: "#minecraft:enchantable/fishing"
                                    }
                                },
                                {
                                    type: "Slot",
                                    title: "tools.enchantments.section.supported.components.shield.title",
                                    image: "/images/features/item/shield.webp",
                                    action: {
                                        type: "String",
                                        field: { type: "Toggle", group: "items" },
                                        value: "#voxel:enchantable/shield"
                                    },
                                    condition: {
                                        condition: "Equals",
                                        type: "String",
                                        field: { type: "Toggle", group: "items" },
                                        value: "#voxel:enchantable/shield"
                                    }
                                },
                                {
                                    type: "Slot",
                                    title: "tools.enchantments.section.supported.components.weapon.title",
                                    image: "/images/features/item/weapon.webp",
                                    action: {
                                        type: "String",
                                        field: { type: "Toggle", group: "items" },
                                        value: "#minecraft:enchantable/weapon"
                                    },
                                    condition: {
                                        condition: "Equals",
                                        type: "String",
                                        field: { type: "Toggle", group: "items" },
                                        value: "#minecraft:enchantable/weapon"
                                    }
                                },
                                {
                                    type: "Slot",
                                    title: "tools.enchantments.section.supported.components.melee.title",
                                    image: "/images/features/item/melee.webp",
                                    action: {
                                        type: "String",
                                        field: { type: "Toggle", group: "items" },
                                        value: "#voxel:enchantable/melee"
                                    },
                                    condition: {
                                        condition: "Equals",
                                        type: "String",
                                        field: { type: "Toggle", group: "items" },
                                        value: "#voxel:enchantable/melee"
                                    }
                                },
                                {
                                    type: "Slot",
                                    title: "tools.enchantments.section.supported.components.head_armor.title",
                                    image: "/images/features/item/helmet.webp",
                                    action: {
                                        type: "String",
                                        field: { type: "Toggle", group: "items" },
                                        value: "#minecraft:enchantable/head_armor"
                                    },
                                    condition: {
                                        condition: "Equals",
                                        type: "String",
                                        field: { type: "Toggle", group: "items" },
                                        value: "#minecraft:enchantable/head_armor"
                                    }
                                },
                                {
                                    type: "Slot",
                                    title: "tools.enchantments.section.supported.components.chest_armor.title",
                                    image: "/images/features/item/chestplate.webp",
                                    action: {
                                        type: "String",
                                        field: { type: "Toggle", group: "items" },
                                        value: "#minecraft:enchantable/chest_armor"
                                    },
                                    condition: {
                                        condition: "Equals",
                                        type: "String",
                                        field: { type: "Toggle", group: "items" },
                                        value: "#minecraft:enchantable/chest_armor"
                                    }
                                },
                                {
                                    type: "Slot",
                                    title: "tools.enchantments.section.supported.components.leg_armor.title",
                                    image: "/images/features/item/leggings.webp",
                                    action: {
                                        type: "String",
                                        field: { type: "Toggle", group: "items" },
                                        value: "#minecraft:enchantable/leg_armor"
                                    },
                                    condition: {
                                        condition: "Equals",
                                        type: "String",
                                        field: { type: "Toggle", group: "items" },
                                        value: "#minecraft:enchantable/leg_armor"
                                    }
                                },
                                {
                                    type: "Slot",
                                    title: "tools.enchantments.section.supported.components.foot_armor.title",
                                    image: "/images/features/item/boots.webp",
                                    action: {
                                        type: "String",
                                        field: { type: "Toggle", group: "items" },
                                        value: "#minecraft:enchantable/foot_armor"
                                    },
                                    condition: {
                                        condition: "Equals",
                                        type: "String",
                                        field: { type: "Toggle", group: "items" },
                                        value: "#minecraft:enchantable/foot_armor"
                                    }
                                },
                                {
                                    type: "Slot",
                                    title: "tools.enchantments.section.supported.components.elytra.title",
                                    image: "/images/features/item/elytra.webp",
                                    action: {
                                        type: "String",
                                        field: { type: "Toggle", group: "items" },
                                        value: "#voxel:enchantable/elytra"
                                    },
                                    condition: {
                                        condition: "Equals",
                                        type: "String",
                                        field: { type: "Toggle", group: "items" },
                                        value: "#voxel:enchantable/elytra"
                                    }
                                },
                                {
                                    type: "Slot",
                                    title: "tools.enchantments.section.supported.components.armor.title",
                                    image: "/images/features/item/armor.webp",
                                    action: {
                                        type: "String",
                                        field: { type: "Toggle", group: "items" },
                                        value: "#minecraft:enchantable/armor"
                                    },
                                    condition: {
                                        condition: "Equals",
                                        type: "String",
                                        field: { type: "Toggle", group: "items" },
                                        value: "#minecraft:enchantable/armor"
                                    }
                                },
                                {
                                    type: "Slot",
                                    title: "tools.enchantments.section.supported.components.equippable.title",
                                    image: "/images/features/item/equipable.webp",
                                    action: {
                                        type: "String",
                                        field: { type: "Toggle", group: "items" },
                                        value: "#minecraft:enchantable/equippable"
                                    },
                                    condition: {
                                        condition: "Equals",
                                        type: "String",
                                        field: { type: "Toggle", group: "items" },
                                        value: "#minecraft:enchantable/equippable"
                                    }
                                },
                                {
                                    type: "Slot",
                                    title: "tools.enchantments.section.supported.components.axes.title",
                                    image: "/images/features/item/axe.webp",
                                    action: {
                                        type: "String",
                                        field: { type: "Toggle", group: "items" },
                                        value: "#voxel:enchantable/axes"
                                    },
                                    condition: {
                                        condition: "Equals",
                                        type: "String",
                                        field: { type: "Toggle", group: "items" },
                                        value: "#voxel:enchantable/axes"
                                    }
                                },
                                {
                                    type: "Slot",
                                    title: "tools.enchantments.section.supported.components.shovels.title",
                                    image: "/images/features/item/shovel.webp",
                                    action: {
                                        type: "String",
                                        field: { type: "Toggle", group: "items" },
                                        value: "#voxel:enchantable/shovels"
                                    },
                                    condition: {
                                        condition: "Equals",
                                        type: "String",
                                        field: { type: "Toggle", group: "items" },
                                        value: "#voxel:enchantable/shovels"
                                    }
                                },
                                {
                                    type: "Slot",
                                    title: "tools.enchantments.section.supported.components.hoes.title",
                                    image: "/images/features/item/hoe.webp",
                                    action: {
                                        type: "String",
                                        field: { type: "Toggle", group: "items" },
                                        value: "#voxel:enchantable/hoes"
                                    },
                                    condition: {
                                        condition: "Equals",
                                        type: "String",
                                        field: { type: "Toggle", group: "items" },
                                        value: "#voxel:enchantable/hoes"
                                    }
                                },
                                {
                                    type: "Slot",
                                    title: "tools.enchantments.section.supported.components.pickaxes.title",
                                    image: "/images/features/item/pickaxe.webp",
                                    action: {
                                        type: "String",
                                        field: { type: "Toggle", group: "items" },
                                        value: "#voxel:enchantable/pickaxes"
                                    },
                                    condition: {
                                        condition: "Equals",
                                        type: "String",
                                        field: { type: "Toggle", group: "items" },
                                        value: "#voxel:enchantable/pickaxes"
                                    }
                                },
                                {
                                    type: "Slot",
                                    title: "tools.enchantments.section.supported.components.durability.title",
                                    image: "/images/features/item/durability.webp",
                                    action: {
                                        type: "String",
                                        field: { type: "Toggle", group: "items" },
                                        value: "#minecraft:enchantable/durability"
                                    },
                                    condition: {
                                        condition: "Equals",
                                        type: "String",
                                        field: { type: "Toggle", group: "items" },
                                        value: "#minecraft:enchantable/durability"
                                    }
                                },
                                {
                                    type: "Slot",
                                    title: "tools.enchantments.section.supported.components.mining_loot.title",
                                    image: "/images/features/item/mining.webp",
                                    action: {
                                        type: "String",
                                        field: { type: "Toggle", group: "items" },
                                        value: "#minecraft:enchantable/mining_loot"
                                    },
                                    condition: {
                                        condition: "Equals",
                                        type: "String",
                                        field: { type: "Toggle", group: "items" },
                                        value: "#minecraft:enchantable/mining_loot"
                                    }
                                },
                                {
                                    type: "Slot",
                                    title: "tools.enchantments.section.supported.components.none.title",
                                    image: "/images/tools/cross.webp",
                                    action: {
                                        type: "Undefined",
                                        field: { type: "Toggle", group: "items" }
                                    },
                                    hide: {
                                        condition: "Equals",
                                        type: "Toggle",
                                        group: "items",
                                        value: "supportedItems"
                                    },
                                    condition: {
                                        condition: "Equals",
                                        type: "Undefined",
                                        field: { type: "Toggle", group: "items" }
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            id: "technical",
            section: "tools.enchantments.section.technical",
            components: [
                {
                    type: "Section",
                    title: "tools.enchantments.section.technical.description",
                    id: "technical_behaviour",
                    children: [
                        {
                            type: "Switch",
                            title: "tools.enchantments.section.technical.components.curse.title",
                            description: "tools.enchantments.section.technical.components.curse.description",
                            action: {
                                type: "List",
                                field: "tags",
                                value: "#minecraft:curse"
                            },
                            condition: {
                                condition: "Contains",
                                type: "Tags",
                                field: "tags",
                                values: ["#minecraft:curse"]
                            }
                        },
                        {
                            type: "Switch",
                            title: "tools.enchantments.section.technical.components.nonTreasure.title",
                            description: "tools.enchantments.section.technical.components.nonTreasure.description",
                            action: {
                                type: "List",
                                field: "tags",
                                value: "#minecraft:non_treasure"
                            },
                            condition: {
                                condition: "Contains",
                                type: "Tags",
                                field: "tags",
                                values: ["#minecraft:non_treasure"]
                            }
                        },
                        {
                            type: "Switch",
                            title: "tools.enchantments.section.technical.components.treasure.title",
                            description: "tools.enchantments.section.technical.components.treasure.description",
                            action: {
                                type: "List",
                                field: "tags",
                                value: "#minecraft:treasure"
                            },
                            condition: {
                                condition: "Contains",
                                type: "Tags",
                                field: "tags",
                                values: ["#minecraft:treasure"]
                            }
                        },
                        {
                            type: "Switch",
                            title: "tools.enchantments.section.technical.components.smeltsLoot.title",
                            description: "tools.enchantments.section.technical.components.smeltsLoot.description",
                            action: {
                                type: "List",
                                field: "tags",
                                value: "#minecraft:smelts_loot"
                            },
                            condition: {
                                condition: "Contains",
                                type: "Tags",
                                field: "tags",
                                values: ["#minecraft:smelts_loot"]
                            }
                        },
                        {
                            type: "Grid",
                            children: [
                                {
                                    type: "Switch",
                                    title: "tools.enchantments.section.technical.components.preventsIceMelting.title",
                                    description: "tools.enchantments.section.technical.components.preventsIceMelting.description",
                                    action: {
                                        type: "List",
                                        field: "tags",
                                        value: "#minecraft:prevent_ice_melting"
                                    },
                                    condition: {
                                        condition: "Contains",
                                        type: "Tags",
                                        field: "tags",
                                        values: ["#minecraft:prevent_ice_melting"]
                                    }
                                },
                                {
                                    type: "Switch",
                                    title: "tools.enchantments.section.technical.components.preventInfestedBlockSpawning.title",
                                    description: "tools.enchantments.section.technical.components.preventInfestedBlockSpawning.description",
                                    action: {
                                        type: "List",
                                        field: "tags",
                                        value: "#minecraft:prevent_infested_block_spawning"
                                    },
                                    condition: {
                                        condition: "Contains",
                                        type: "Tags",
                                        field: "tags",
                                        values: ["#minecraft:prevent_infested_block_spawning"]
                                    }
                                }
                            ]
                        },
                        {
                            type: "Grid",
                            children: [
                                {
                                    type: "Switch",
                                    title: "tools.enchantments.section.technical.components.preventBeeSpawning.title",
                                    description: "tools.enchantments.section.technical.components.preventBeeSpawning.description",
                                    action: {
                                        type: "List",
                                        field: "tags",
                                        value: "#minecraft:prevent_bee_spawning"
                                    },
                                    condition: {
                                        condition: "Contains",
                                        type: "Tags",
                                        field: "tags",
                                        values: ["#minecraft:prevent_bee_spawning"]
                                    }
                                },
                                {
                                    type: "Switch",
                                    title: "tools.enchantments.section.technical.components.preventPotShattering.title",
                                    description: "tools.enchantments.section.technical.components.preventPotShattering.description",
                                    action: {
                                        type: "List",
                                        field: "tags",
                                        value: "#minecraft:prevent_pot_shattering"
                                    },
                                    condition: {
                                        condition: "Contains",
                                        type: "Tags",
                                        field: "tags",
                                        values: ["#minecraft:prevent_pot_shattering"]
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    type: "Section",
                    title: "tools.enchantments.section.costs",
                    id: "costs",
                    children: [
                        {
                            type: "Grid",
                            children: [
                                {
                                    type: "Range",
                                    label: "tools.enchantments.section.global.components.minCostBase.label",
                                    min: 0,
                                    max: 100,
                                    step: 1,
                                    action: { type: "Dynamic", field: "minCostBase" },
                                    value: {
                                        params: {
                                            type: "Field",
                                            field: "minCostBase"
                                        }
                                    }
                                },
                                {
                                    type: "Range",
                                    label: "tools.enchantments.section.global.components.minCostPerLevelAboveFirst.label",
                                    min: 0,
                                    max: 100,
                                    step: 1,
                                    action: {
                                        type: "Dynamic",
                                        field: "minCostPerLevelAboveFirst"
                                    },
                                    value: {
                                        params: {
                                            type: "Field",
                                            field: "minCostPerLevelAboveFirst"
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            type: "Grid",
                            children: [
                                {
                                    type: "Range",
                                    label: "tools.enchantments.section.global.components.maxCostBase.label",
                                    min: 0,
                                    max: 100,
                                    step: 1,
                                    action: { type: "Dynamic", field: "maxCostBase" },
                                    value: {
                                        params: {
                                            type: "Field",
                                            field: "maxCostBase"
                                        }
                                    }
                                },
                                {
                                    type: "Range",
                                    label: "tools.enchantments.section.global.components.maxCostPerLevelAboveFirst.label",
                                    min: 0,
                                    max: 100,
                                    step: 1,
                                    action: {
                                        type: "Dynamic",
                                        field: "maxCostPerLevelAboveFirst"
                                    },
                                    value: {
                                        params: {
                                            type: "Field",
                                            field: "maxCostPerLevelAboveFirst"
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    type: "Section",
                    title: "tools.enchantments.section.effects.components.title",
                    id: "effects",
                    children: [
                        {
                            type: "Effect",
                            action: {
                                type: "DynamicList",
                                field: "disabledEffects"
                            },
                            condition: {
                                condition: "Contains",
                                type: "String",
                                field: "disabledEffects"
                            },
                            value: {
                                params: {
                                    type: "Field",
                                    field: "effects"
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            id: "exclusive",
            section: "tools.enchantments.section.exclusive",
            soon: true,
            components: [
                {
                    type: "Section",
                    title: "tools.enchantments.section.exclusive.description",
                    id: "set_exclusive",
                    children: [
                        {
                            type: "Grid",
                            children: [
                                {
                                    type: "Collection",
                                    field: "exclusiveSet",
                                    includes: [
                                        "#minecraft:exclusive_set/armor",
                                        "#minecraft:exclusive_set/bow",
                                        "#minecraft:exclusive_set/crossbow",
                                        "#minecraft:exclusive_set/damage",
                                        "#minecraft:exclusive_set/mining",
                                        "#minecraft:exclusive_set/riptide",
                                        "#minecraft:exclusive_set/boots"
                                    ],
                                    value: {
                                        params: { type: "Field", field: "exclusiveSet" }
                                    },
                                    action: { type: "Dynamic", field: "exclusiveSet" }
                                }
                            ]
                        }
                    ],
                    toggle: [
                        {
                            title: "tools.enchantments.section.toggle.exclusive.group.title",
                            description: "tools.enchantments.section.toggle.exclusive.group.description",
                            name: "group"
                        },
                        {
                            title: "tools.enchantments.section.toggle.exclusive.individual.title",
                            description: "tools.enchantments.section.toggle.exclusive.individual.description",
                            name: "individual"
                        }
                    ]
                }
            ]
        }
    ],
    sidebar: {
        toggle: {
            type: "Dynamic",
            field: "softDelete"
        },
        value: {
            field: "softDelete"
        },
        description: {
            field: "description"
        }
    },
    parser: {
        id: "enchantment",
        registries: {
            main: "enchantment",
            tags: "tags/enchantment"
        }
    }
};

import type { InterfaceConfiguration } from "@/lib/minecraft/core/engine";
import { dungeon } from "@/lib/minecraft/core/schema/enchant/config/addons/dungeon.ts";
import { yggdrasil } from "@/lib/minecraft/core/schema/enchant/config/addons/yggdrasil.ts";

export const find: InterfaceConfiguration = {
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
                    elements: [dungeon, yggdrasil]
                }
            ]
        }
    ]
};

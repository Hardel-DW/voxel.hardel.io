import type { InterfaceConfiguration } from "@/lib/minecraft/core/engine";

export const supported: InterfaceConfiguration = {
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
};

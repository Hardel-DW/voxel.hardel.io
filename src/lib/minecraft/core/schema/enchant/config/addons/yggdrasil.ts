import type { ToolRevealElementType } from "@/lib/minecraft/components/elements/reveal/ToolRevealElementType.tsx";

export const yggdrasil: ToolRevealElementType = {
    id: "yggdrasil",
    logo: "/images/addons/logo/yggdrasil.webp",
    image: "/images/addons/hero/yggdrasil.png",
    href: "https://modrinth.com/datapack/yggdrasil-structure",
    title: "tools.enchantments.section.addons.yggdrasil.title",
    description: "tools.enchantments.section.addons.yggdrasil.description",
    children: [
        {
            type: "Category",
            title: "tools.enchantments.section.addons.yggdrasil.alfheim.title",
            children: [
                {
                    type: "Grid",
                    size: "400px",
                    children: [
                        {
                            type: "Slot",
                            image: "/images/features/title/yg.webp",
                            title: "tools.enchantments.section.yggdrasil.components.yggdrasilMobEquipment.title",
                            description: "tools.enchantments.section.yggdrasil.components.yggdrasilMobEquipment.description",
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
                            title: "tools.enchantments.section.addons.yggdrasil.random_chest.title",
                            description: "tools.enchantments.section.addons.yggdrasil.random_chest.description",
                            image: "/images/features/block/chest.webp",
                            action: {
                                type: "List",
                                field: "tags",
                                value: "#yggdrasil:alfheim/random_chest"
                            },
                            condition: {
                                condition: "Contains",
                                type: "Tags",
                                field: "tags",
                                values: ["#yggdrasil:alfheim/random_chest"]
                            }
                        },
                        {
                            type: "Slot",
                            title: "tools.enchantments.section.addons.yggdrasil.vault.title",
                            description: "tools.enchantments.section.addons.yggdrasil.vault.description",
                            image: "/images/features/block/vault.webp",
                            action: {
                                type: "List",
                                field: "tags",
                                value: "#yggdrasil:alfheim/vault"
                            },
                            condition: {
                                condition: "Contains",
                                type: "Tags",
                                field: "tags",
                                values: ["#yggdrasil:alfheim/vault"]
                            }
                        },
                        {
                            type: "Slot",
                            title: "tools.enchantments.section.addons.yggdrasil.ominous_vault.title",
                            description: "tools.enchantments.section.addons.yggdrasil.ominous_vault.description",
                            image: "/images/features/block/ominous_vault.webp",
                            action: {
                                type: "List",
                                field: "tags",
                                value: "#yggdrasil:alfheim/ominous_vault"
                            },
                            condition: {
                                condition: "Contains",
                                type: "Tags",
                                field: "tags",
                                values: ["#yggdrasil:alfheim/ominous_vault"]
                            }
                        },
                        {
                            type: "Slot",
                            title: "tools.enchantments.section.addons.yggdrasil.trial_spawner.title",
                            description: "tools.enchantments.section.addons.yggdrasil.trial_spawner.description",
                            image: "/images/features/block/trial_spawner.webp",
                            action: {
                                type: "List",
                                field: "tags",
                                value: "#yggdrasil:alfheim/trial_spawner"
                            },
                            condition: {
                                condition: "Contains",
                                type: "Tags",
                                field: "tags",
                                values: ["#yggdrasil:alfheim/trial_spawner"]
                            }
                        },
                        {
                            type: "Slot",
                            title: "tools.enchantments.section.addons.yggdrasil.ominous_trial_spawner.title",
                            description: "tools.enchantments.section.addons.yggdrasil.ominous_trial_spawner.description",
                            image: "/images/features/block/ominous_trial_spawner.webp",
                            action: {
                                type: "List",
                                field: "tags",
                                value: "#yggdrasil:alfheim/ominous_trial_spawner"
                            },
                            condition: {
                                condition: "Contains",
                                type: "Tags",
                                field: "tags",
                                values: ["#yggdrasil:alfheim/ominous_trial_spawner"]
                            }
                        }
                    ]
                }
            ]
        },
        {
            type: "Category",
            title: "tools.enchantments.section.addons.yggdrasil.asflors.title",
            children: [
                {
                    type: "Grid",
                    size: "400px",
                    children: [
                        {
                            type: "Slot",
                            title: "tools.enchantments.section.addons.yggdrasil.common_chest.title",
                            description: "tools.enchantments.section.addons.yggdrasil.common_chest.description",
                            image: "/images/features/block/chest.webp",
                            action: {
                                type: "List",
                                field: "tags",
                                value: "#yggdrasil:asflors/common_chest"
                            },
                            condition: {
                                condition: "Contains",
                                type: "Tags",
                                field: "tags",
                                values: ["#yggdrasil:asflors/common_chest"]
                            }
                        },
                        {
                            type: "Slot",
                            title: "tools.enchantments.section.addons.yggdrasil.structure_vault.title",
                            description: "tools.enchantments.section.addons.yggdrasil.structure_vault.description",
                            image: "/images/features/block/vault.webp",
                            action: {
                                type: "List",
                                field: "tags",
                                value: "#yggdrasil:asflors/structure_vault"
                            },
                            condition: {
                                condition: "Contains",
                                type: "Tags",
                                field: "tags",
                                values: ["#yggdrasil:asflors/structure_vault"]
                            }
                        },
                        {
                            type: "Slot",
                            title: "tools.enchantments.section.addons.yggdrasil.structure_ominous_vault.title",
                            description: "tools.enchantments.section.addons.yggdrasil.structure_ominous_vault.description",
                            image: "/images/features/block/ominous_vault.webp",
                            action: {
                                type: "List",
                                field: "tags",
                                value: "#yggdrasil:asflors/structure_ominous_vault"
                            },
                            condition: {
                                condition: "Contains",
                                type: "Tags",
                                field: "tags",
                                values: ["#yggdrasil:asflors/structure_ominous_vault"]
                            }
                        },
                        {
                            type: "Slot",
                            title: "tools.enchantments.section.addons.yggdrasil.asflors_sword.title",
                            description: "tools.enchantments.section.addons.yggdrasil.asflors_sword.description",
                            image: "/images/features/item/sword.webp",
                            action: {
                                type: "List",
                                field: "tags",
                                value: "#yggdrasil:asflors/asflors_sword"
                            },
                            condition: {
                                condition: "Contains",
                                type: "Tags",
                                field: "tags",
                                values: ["#yggdrasil:asflors/asflors_sword"]
                            }
                        }
                    ]
                }
            ]
        },
        {
            type: "Category",
            title: "tools.enchantments.section.addons.yggdrasil.runic_fracture.title",
            children: [
                {
                    type: "Grid",
                    size: "400px",
                    children: [
                        {
                            type: "Slot",
                            title: "tools.enchantments.section.addons.yggdrasil.reward_after_fight.title",
                            description: "tools.enchantments.section.addons.yggdrasil.reward_after_fight.description",
                            image: "/images/features/block/ominous_trial_spawner.webp",
                            action: {
                                type: "List",
                                field: "tags",
                                value: "#yggdrasil:runic_fracture/reward_after_fight"
                            },
                            condition: {
                                condition: "Contains",
                                type: "Tags",
                                field: "tags",
                                values: ["#yggdrasil:runic_fracture/reward_after_fight"]
                            }
                        }
                    ]
                }
            ]
        }
    ]
};

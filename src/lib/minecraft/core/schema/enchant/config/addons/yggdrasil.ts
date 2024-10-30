import type { ToolRevealElementType } from "@/lib/minecraft/components/elements/reveal/ToolRevealElementType.tsx";

export const yggdrasil: ToolRevealElementType = {
    id: "yggdrasil",
    logo: "/images/addons/logo/yggdrasil.webp",
    image: "/images/addons/hero/yggdrasil.png",
    href: "https://modrinth.com/datapack/yggdrasil-structure",
    title: {
        type: "translate",
        value: "tools.enchantments.section.addons.yggdrasil.title"
    },
    description: {
        type: "translate",
        value: "tools.enchantments.section.addons.yggdrasil.description"
    },
    children: [
        {
            type: "Category",
            title: {
                type: "translate",
                value: "tools.enchantments.section.addons.yggdrasil.alfheim.title"
            },
            children: [
                {
                    type: "Grid",
                    size: "400px",
                    children: [
                        {
                            type: "Slot",
                            image: "/images/features/title/yg.webp",
                            title: {
                                type: "translate",
                                value: "tools.enchantments.section.yggdrasil.components.yggdrasilMobEquipment.title"
                            },
                            description: {
                                type: "translate",
                                value: "tools.enchantments.section.yggdrasil.components.yggdrasilMobEquipment.description"
                            },
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
                            type: "Iteration",
                            values: [
                                {
                                    type: "object",
                                    values: [
                                        {
                                            title: "tools.enchantments.section.addons.yggdrasil.random_chest.title",
                                            description: "tools.enchantments.section.addons.yggdrasil.random_chest.description",
                                            image: "/images/features/block/chest.webp",
                                            tag: "#yggdrasil:alfheim/random_chest"
                                        },
                                        {
                                            title: "tools.enchantments.section.addons.yggdrasil.vault.title",
                                            description: "tools.enchantments.section.addons.yggdrasil.vault.description",
                                            image: "/images/features/block/vault.webp",
                                            tag: "#yggdrasil:alfheim/vault"
                                        },
                                        {
                                            title: "tools.enchantments.section.addons.yggdrasil.ominous_vault.title",
                                            description: "tools.enchantments.section.addons.yggdrasil.ominous_vault.description",
                                            image: "/images/features/block/ominous_vault.webp",
                                            tag: "#yggdrasil:alfheim/ominous_vault"
                                        },
                                        {
                                            title: "tools.enchantments.section.addons.yggdrasil.trial_spawner.title",
                                            description: "tools.enchantments.section.addons.yggdrasil.trial_spawner.description",
                                            image: "/images/features/block/trial_spawner.webp",
                                            tag: "#yggdrasil:alfheim/trial_spawner"
                                        },
                                        {
                                            title: "tools.enchantments.section.addons.yggdrasil.ominous_trial_spawner.title",
                                            description: "tools.enchantments.section.addons.yggdrasil.ominous_trial_spawner.description",
                                            image: "/images/features/block/ominous_trial_spawner.webp",
                                            tag: "#yggdrasil:alfheim/ominous_trial_spawner"
                                        }
                                    ]
                                }
                            ],
                            template: {
                                type: "Slot",
                                title: {
                                    type: "translate",
                                    value: {
                                        type: "get_value_from_context",
                                        key: "title"
                                    }
                                },
                                description: {
                                    type: "translate",
                                    value: {
                                        type: "get_value_from_context",
                                        key: "description"
                                    }
                                },
                                image: {
                                    type: "get_value_from_context",
                                    key: "image"
                                },
                                action: {
                                    type: "List",
                                    field: "tags",
                                    value: {
                                        type: "get_value_from_context",
                                        key: "tag"
                                    }
                                },
                                condition: {
                                    condition: "Contains",
                                    type: "Tags",
                                    field: "tags",
                                    values: [
                                        {
                                            type: "get_value_from_context",
                                            key: "tag"
                                        }
                                    ]
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            type: "Category",
            title: {
                type: "translate",
                value: "tools.enchantments.section.addons.yggdrasil.asflors.title"
            },
            children: [
                {
                    type: "Grid",
                    size: "300px",
                    children: [
                        {
                            type: "Iteration",
                            values: [
                                {
                                    type: "object",
                                    values: [
                                        {
                                            title: "tools.enchantments.section.addons.yggdrasil.common_chest.title",
                                            description: "tools.enchantments.section.addons.yggdrasil.common_chest.description",
                                            image: "/images/features/block/chest.webp",
                                            tag: "#yggdrasil:asflors/common_chest"
                                        },
                                        {
                                            title: "tools.enchantments.section.addons.yggdrasil.structure_vault.title",
                                            description: "tools.enchantments.section.addons.yggdrasil.structure_vault.description",
                                            image: "/images/features/block/vault.webp",
                                            tag: "#yggdrasil:asflors/structure_vault"
                                        },
                                        {
                                            title: "tools.enchantments.section.addons.yggdrasil.structure_ominous_vault.title",
                                            description: "tools.enchantments.section.addons.yggdrasil.structure_ominous_vault.description",
                                            image: "/images/features/block/ominous_vault.webp",
                                            tag: "#yggdrasil:asflors/structure_ominous_vault"
                                        },
                                        {
                                            title: "tools.enchantments.section.addons.yggdrasil.asflors_sword.title",
                                            description: "tools.enchantments.section.addons.yggdrasil.asflors_sword.description",
                                            image: "/images/features/item/sword.webp",
                                            tag: "#yggdrasil:asflors/asflors_sword"
                                        }
                                    ]
                                }
                            ],
                            template: {
                                type: "Slot",
                                title: {
                                    type: "translate",
                                    value: {
                                        type: "get_value_from_context",
                                        key: "title"
                                    }
                                },
                                description: {
                                    type: "translate",
                                    value: {
                                        type: "get_value_from_context",
                                        key: "description"
                                    }
                                },
                                image: {
                                    type: "get_value_from_context",
                                    key: "image"
                                },
                                action: {
                                    type: "List",
                                    field: "tags",
                                    value: {
                                        type: "get_value_from_context",
                                        key: "tag"
                                    }
                                },
                                condition: {
                                    condition: "Contains",
                                    type: "Tags",
                                    field: "tags",
                                    values: [
                                        {
                                            type: "get_value_from_context",
                                            key: "tag"
                                        }
                                    ]
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            type: "Category",
            title: {
                type: "translate",
                value: "tools.enchantments.section.addons.yggdrasil.runic_fracture.title"
            },
            children: [
                {
                    type: "Grid",
                    size: "400px",
                    children: [
                        {
                            type: "Slot",
                            title: {
                                type: "translate",
                                value: "tools.enchantments.section.addons.yggdrasil.reward_after_fight.title"
                            },
                            description: {
                                type: "translate",
                                value: "tools.enchantments.section.addons.yggdrasil.reward_after_fight.description"
                            },
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

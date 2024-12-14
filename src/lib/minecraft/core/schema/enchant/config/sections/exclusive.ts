import type { Unresolved } from "@/lib/minecraft/core/engine/resolver/field/type.ts";
import type { InterfaceConfiguration } from "@/lib/minecraft/core/schema/primitive";

export const exclusive: Unresolved<InterfaceConfiguration> = {
    id: "enchant.exclusive",
    section: { type: "translate", value: "tools.enchantments.section.exclusive" },
    components: [
        {
            type: "Section",
            title: {
                type: "translate",
                value: "tools.enchantments.section.exclusive.description"
            },
            id: "main.exclusive",
            toggle: [
                {
                    title: {
                        type: "translate",
                        value: "tools.enchantments.section.toggle.exclusive.group.title"
                    },
                    description: {
                        type: "translate",
                        value: "tools.enchantments.section.toggle.exclusive.group.description"
                    },
                    name: "main.exclusive.group",
                    field: "exclusiveSet"
                },
                {
                    title: {
                        type: "translate",
                        value: "tools.enchantments.section.toggle.exclusive.individual.title"
                    },
                    description: {
                        type: "translate",
                        value: "tools.enchantments.section.toggle.exclusive.individual.description"
                    },
                    name: "main.exclusive.individual",
                    field: "exclusiveSet"
                }
            ],
            children: [
                {
                    type: "Flexible",
                    direction: "horizontal",
                    hide: {
                        condition: "Equals",
                        type: "String",
                        field: {
                            type: "get_toggle_field",
                            group: "main.exclusive"
                        },
                        value: "main.exclusive.individual"
                    },
                    children: [
                        {
                            type: "Scrollable",
                            height: 620,
                            children: [
                                {
                                    type: "Flexible",
                                    direction: "vertical",
                                    children: [
                                        {
                                            type: "Iteration",
                                            values: [
                                                {
                                                    type: "object",
                                                    values: [
                                                        {
                                                            id: "armor",
                                                            title: "tools.enchantments.section.exclusive.set.armor.title",
                                                            description: "tools.enchantments.section.exclusive.set.armor.description",
                                                            value: "#minecraft:exclusive_set/armor",
                                                            image: "/images/features/item/armor.webp"
                                                        },
                                                        {
                                                            id: "bow",
                                                            title: "tools.enchantments.section.exclusive.set.bow.title",
                                                            description: "tools.enchantments.section.exclusive.set.bow.description",
                                                            value: "#minecraft:exclusive_set/bow",
                                                            image: "/images/features/item/bow.webp"
                                                        },
                                                        {
                                                            id: "crossbow",
                                                            title: "tools.enchantments.section.exclusive.set.crossbow.title",
                                                            description: "tools.enchantments.section.exclusive.set.crossbow.description",
                                                            value: "#minecraft:exclusive_set/crossbow",
                                                            image: "/images/features/item/crossbow.webp"
                                                        },
                                                        {
                                                            id: "damage",
                                                            title: "tools.enchantments.section.exclusive.set.damage.title",
                                                            description: "tools.enchantments.section.exclusive.set.damage.description",
                                                            value: "#minecraft:exclusive_set/damage",
                                                            image: "/images/features/item/sword.webp"
                                                        },
                                                        {
                                                            id: "riptide",
                                                            title: "tools.enchantments.section.exclusive.set.riptide.title",
                                                            description: "tools.enchantments.section.exclusive.set.riptide.description",
                                                            value: "#minecraft:exclusive_set/riptide",
                                                            image: "/images/features/item/trident.webp"
                                                        },
                                                        {
                                                            id: "mining",
                                                            title: "tools.enchantments.section.exclusive.set.mining.title",
                                                            description: "tools.enchantments.section.exclusive.set.mining.description",
                                                            value: "#minecraft:mining",
                                                            image: "/images/features/item/mining.webp"
                                                        },
                                                        {
                                                            id: "boots",
                                                            title: "tools.enchantments.section.exclusive.set.boots.title",
                                                            description: "tools.enchantments.section.exclusive.set.boots.description",
                                                            value: "#minecraft:exclusive_set/boots",
                                                            image: "/images/features/item/boots.webp"
                                                        }
                                                    ]
                                                }
                                            ],
                                            template: {
                                                type: "SwitchSlot",
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
                                                    type: "sequential",
                                                    actions: [
                                                        {
                                                            type: "set_value",
                                                            value: {
                                                                type: "get_value_from_context",
                                                                key: "value"
                                                            },
                                                            field: "exclusiveSet"
                                                        },
                                                        {
                                                            type: "List",
                                                            field: "tags",
                                                            value: {
                                                                type: "get_value_from_context",
                                                                key: "value"
                                                            }
                                                        }
                                                    ]
                                                },
                                                condition: {
                                                    condition: "Equals",
                                                    type: "String",
                                                    field: "exclusiveSet",
                                                    value: {
                                                        type: "get_value_from_context",
                                                        key: "value"
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            type: "Category",
                                            title: {
                                                type: "translate",
                                                value: "tools.enchantments.section.exclusive.custom.title"
                                            },
                                            children: [
                                                {
                                                    type: "Iteration",
                                                    values: [
                                                        {
                                                            type: "collect_from_path",
                                                            registry: "tags/enchantment",
                                                            path: "exclusive_set",
                                                            exclude_namespace: ["minecraft"]
                                                        }
                                                    ],
                                                    template: {
                                                        type: "SwitchSlot",
                                                        title: {
                                                            type: "get_value_from_context",
                                                            key: "resource"
                                                        },
                                                        description: {
                                                            type: "get_value_from_context",
                                                            key: "namespace"
                                                        },
                                                        image: "/favicon.svg",
                                                        action: {
                                                            type: "Sequential",
                                                            actions: [
                                                                {
                                                                    type: "String",
                                                                    value: {
                                                                        type: "get_value_from_context",
                                                                        key: "identifier"
                                                                    },
                                                                    field: "exclusiveSet",
                                                                    mode: "toggle"
                                                                },
                                                                {
                                                                    type: "List",
                                                                    field: "tags",
                                                                    value: {
                                                                        type: "get_value_from_context",
                                                                        key: "identifier"
                                                                    }
                                                                }
                                                            ]
                                                        },
                                                        condition: {
                                                            condition: "Equals",
                                                            type: "String",
                                                            field: "exclusiveSet",
                                                            value: {
                                                                type: "get_value_from_context",
                                                                key: "identifier"
                                                            }
                                                        }
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            type: "TagViewer",
                            registry: "tags/enchantment",
                            field: "exclusiveSet",
                            additional: {
                                "#minecraft:exclusive_set/armor": [
                                    "minecraft:protection",
                                    "minecraft:blast_protection",
                                    "minecraft:fire_protection",
                                    "minecraft:projectile_protection"
                                ],
                                "#minecraft:exclusive_set/boots": ["minecraft:frost_walker", "minecraft:depth_strider"],
                                "#minecraft:exclusive_set/bow": ["minecraft:infinity", "minecraft:mending"],
                                "#minecraft:exclusive_set/crossbow": ["minecraft:multishot", "minecraft:piercing"],
                                "#minecraft:exclusive_set/damage": [
                                    "minecraft:sharpness",
                                    "minecraft:smite",
                                    "minecraft:bane_of_arthropods",
                                    "minecraft:impaling",
                                    "minecraft:density",
                                    "minecraft:breach"
                                ],
                                "#minecraft:mining": ["minecraft:fortune", "minecraft:silk_touch"],
                                "#minecraft:exclusive_set/riptide": ["minecraft:loyalty", "minecraft:channeling"]
                            }
                        }
                    ]
                },
                {
                    type: "Grid",
                    hide: {
                        condition: "Equals",
                        type: "String",
                        field: {
                            type: "get_toggle_field",
                            group: "main.exclusive"
                        },
                        value: "main.exclusive.group"
                    },
                    children: [
                        {
                            type: "Iteration",
                            values: [
                                {
                                    type: "get_registry_elements",
                                    registry: "enchantment"
                                }
                            ],
                            template: {
                                type: "SwitchSlot",
                                title: {
                                    type: "get_value_from_context",
                                    key: "filename"
                                },
                                description: {
                                    type: "get_value_from_context",
                                    key: "namespace"
                                },
                                action: {
                                    type: "List",
                                    field: "exclusiveSet",
                                    mode: "remove_if_empty",
                                    value: {
                                        type: "get_value_from_context",
                                        key: "identifier"
                                    }
                                },
                                condition: {
                                    condition: "Contains",
                                    type: "String",
                                    field: "exclusiveSet",
                                    values: [
                                        {
                                            type: "get_value_from_context",
                                            key: "identifier"
                                        }
                                    ]
                                }
                            }
                        }
                    ]
                }
            ]
        }
    ]
};

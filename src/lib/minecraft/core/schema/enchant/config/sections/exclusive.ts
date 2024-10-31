import type { InterfaceConfiguration } from "@/lib/minecraft/core/engine";

export const exclusive: InterfaceConfiguration = {
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
                    children: [
                        {
                            type: "Scrollable",
                            height: 620,
                            hide: {
                                condition: "Equals",
                                type: "compare_to_toggle_name",
                                group: "main.exclusive",
                                value: "main.exclusive.individual"
                            },
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
                                                            value: "#minecraft:exclusive_set/armor"
                                                        },
                                                        {
                                                            id: "bow",
                                                            title: "tools.enchantments.section.exclusive.set.bow.title",
                                                            description: "tools.enchantments.section.exclusive.set.bow.description",
                                                            value: "#minecraft:exclusive_set/bow"
                                                        },
                                                        {
                                                            id: "crossbow",
                                                            title: "tools.enchantments.section.exclusive.set.crossbow.title",
                                                            description: "tools.enchantments.section.exclusive.set.crossbow.description",
                                                            value: "#minecraft:exclusive_set/crossbow"
                                                        },
                                                        {
                                                            id: "damage",
                                                            title: "tools.enchantments.section.exclusive.set.damage.title",
                                                            description: "tools.enchantments.section.exclusive.set.damage.description",
                                                            value: "#minecraft:exclusive_set/damage"
                                                        },
                                                        {
                                                            id: "riptide",
                                                            title: "tools.enchantments.section.exclusive.set.riptide.title",
                                                            description: "tools.enchantments.section.exclusive.set.riptide.description",
                                                            value: "#minecraft:exclusive_set/riptide"
                                                        },
                                                        {
                                                            id: "mining",
                                                            title: "tools.enchantments.section.exclusive.set.mining.title",
                                                            description: "tools.enchantments.section.exclusive.set.mining.description",
                                                            value: "#minecraft:mining"
                                                        },
                                                        {
                                                            id: "boots",
                                                            title: "tools.enchantments.section.exclusive.set.boots.title",
                                                            description: "tools.enchantments.section.exclusive.set.boots.description",
                                                            value: "#minecraft:exclusive_set/boots"
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
                                                action: {
                                                    type: "String",
                                                    value: {
                                                        type: "get_value_from_context",
                                                        key: "value"
                                                    },
                                                    field: "exclusiveSet"
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
                                                    key: "file_name"
                                                },
                                                description: {
                                                    type: "get_value_from_context",
                                                    key: "namespace"
                                                },
                                                action: {
                                                    type: "String",
                                                    value: {
                                                        type: "get_value_from_context",
                                                        key: "identifier"
                                                    },
                                                    field: "exclusiveSet"
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
                        },
                        {
                            type: "TagViewer",
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
                }
            ]
        }
    ]
};

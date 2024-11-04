import type { InterfaceConfiguration } from "@/lib/minecraft/core/engine";

export const technical: InterfaceConfiguration = {
    id: "enchant.technical",
    section: { type: "translate", value: "tools.enchantments.section.technical" },
    components: [
        {
            type: "Section",
            title: { type: "translate", value: "tools.enchantments.section.technical.description" },
            id: "technical_behaviour",
            children: [
                {
                    type: "Switch",
                    title: { type: "translate", value: "tools.enchantments.section.technical.components.curse.title" },
                    description: { type: "translate", value: "tools.enchantments.section.technical.components.curse.description" },
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
                    title: { type: "translate", value: "tools.enchantments.section.technical.components.nonTreasure.title" },
                    description: { type: "translate", value: "tools.enchantments.section.technical.components.nonTreasure.description" },
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
                    title: { type: "translate", value: "tools.enchantments.section.technical.components.treasure.title" },
                    description: { type: "translate", value: "tools.enchantments.section.technical.components.treasure.description" },
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
                    title: { type: "translate", value: "tools.enchantments.section.technical.components.smeltsLoot.title" },
                    description: { type: "translate", value: "tools.enchantments.section.technical.components.smeltsLoot.description" },
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
                            title: { type: "translate", value: "tools.enchantments.section.technical.components.preventsIceMelting.title" },
                            description: {
                                type: "translate",
                                value: "tools.enchantments.section.technical.components.preventsIceMelting.description"
                            },
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
                            title: {
                                type: "translate",
                                value: "tools.enchantments.section.technical.components.preventInfestedBlockSpawning.title"
                            },
                            description: {
                                type: "translate",
                                value: "tools.enchantments.section.technical.components.preventInfestedBlockSpawning.description"
                            },
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
                            title: { type: "translate", value: "tools.enchantments.section.technical.components.preventBeeSpawning.title" },
                            description: {
                                type: "translate",
                                value: "tools.enchantments.section.technical.components.preventBeeSpawning.description"
                            },
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
                            title: {
                                type: "translate",
                                value: "tools.enchantments.section.technical.components.preventPotShattering.title"
                            },
                            description: {
                                type: "translate",
                                value: "tools.enchantments.section.technical.components.preventPotShattering.description"
                            },
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
            title: { type: "translate", value: "tools.enchantments.section.costs" },
            button: {
                text: { type: "translate", value: "generic.documentation" },
                url: "https://minecraft.wiki/w/Enchanting_mechanics"
            },
            id: "costs",
            children: [
                {
                    type: "Grid",
                    children: [
                        {
                            type: "Range",
                            label: { type: "translate", value: "tools.enchantments.section.global.components.minCostBase.label" },
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
                            label: {
                                type: "translate",
                                value: "tools.enchantments.section.global.components.minCostPerLevelAboveFirst.label"
                            },
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
                            label: { type: "translate", value: "tools.enchantments.section.global.components.maxCostBase.label" },
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
                            label: {
                                type: "translate",
                                value: "tools.enchantments.section.global.components.maxCostPerLevelAboveFirst.label"
                            },
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
            title: { type: "translate", value: "tools.enchantments.section.effects.components.title" },
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
};

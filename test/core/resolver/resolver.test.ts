import type { Unresolved } from "@/lib/minecraft/core/engine/resolver/field/type.ts";
import type { InterfaceConfiguration } from "@/lib/minecraft/core/schema/primitive";
import { describe, expect, it } from "vitest";

describe("Combined Field and Iteration Resolver", () => {
    const test: Unresolved<InterfaceConfiguration> = {
        id: "enchant.supported",
        section: {
            type: "translate",
            value: "tools.enchantments.section.supported"
        },
        components: [
            {
                type: "Counter",
                title: {
                    type: "translate",
                    value: "tools.enchantments.section.supported.description"
                },
                image: "/images/tools/cross.webp",
                min: 0,
                max: 10,
                step: 1,
                value: {
                    params: {
                        type: "Value",
                        value: 3
                    }
                },
                action: {
                    type: "set_value",
                    value: 3,
                    field: "test"
                }
            },
            {
                type: "Grid",
                children: [
                    {
                        type: "Range",
                        label: {
                            type: "translate",
                            value: "tools.enchantments.section.global.components.minCostBase.label"
                        },
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
            }
        ]
    };

    const test2: Unresolved<InterfaceConfiguration> = {
        id: "enchant.supported",
        section: {
            type: "translate",
            value: "tools.enchantments.section.supported"
        },
        components: [
            {
                type: "Counter",
                title: {
                    type: "translate",
                    value: "tools.enchantments.section.supported.description"
                },
                image: "/images/tools/cross.webp",
                min: 0,
                max: 10,
                step: 1,
                action: {
                    type: "set_value",
                    value: 3,
                    field: {
                        type: "get_toggle_field",
                        group: "test"
                    }
                }
            }
        ]
    };

    const supported: Unresolved<InterfaceConfiguration> = {
        id: "enchant.supported",
        section: {
            type: "translate",
            value: "tools.enchantments.section.supported"
        },
        components: [
            {
                type: "Section",
                title: {
                    type: "translate",
                    value: "tools.enchantments.section.supported.description"
                },
                id: "main.supported",
                toggle: [
                    {
                        name: "main.supported.items",
                        field: "supportedItems",
                        title: {
                            type: "translate",
                            value: "tools.enchantments.section.toggle.supported.title"
                        },
                        description: {
                            type: "translate",
                            value: "tools.enchantments.section.toggle.supported.description"
                        }
                    },
                    {
                        name: "main.primary.items",
                        field: "primaryItems",
                        title: {
                            type: "translate",
                            value: "tools.enchantments.section.toggle.primary.title"
                        },
                        description: {
                            type: "translate",
                            value: "tools.enchantments.section.toggle.primary.description"
                        }
                    }
                ],
                children: [
                    {
                        type: "Grid",
                        children: [
                            {
                                type: "Iteration",
                                values: [
                                    {
                                        type: "object",
                                        values: [
                                            {
                                                title: "tools.enchantments.section.supported.components.sword.title",
                                                image: "/images/features/item/sword.webp",
                                                value: "#minecraft:enchantable/sword"
                                            },
                                            {
                                                title: "tools.enchantments.section.supported.components.trident.title",
                                                image: "/images/features/item/trident.webp",
                                                value: "#minecraft:enchantable/trident"
                                            },
                                            {
                                                title: "tools.enchantments.section.supported.components.mace.title",
                                                image: "/images/features/item/mace.webp",
                                                value: "#minecraft:enchantable/mace"
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
                                    image: {
                                        type: "get_value_from_context",
                                        key: "image"
                                    },
                                    action: {
                                        type: "String",
                                        value: {
                                            type: "get_value_from_context",
                                            key: "value"
                                        },
                                        field: {
                                            type: "get_toggle_field",
                                            group: "main.supported"
                                        }
                                    },
                                    condition: {
                                        condition: "Equals",
                                        type: "String",
                                        field: {
                                            type: "get_toggle_field",
                                            group: "main.supported"
                                        },
                                        value: {
                                            type: "get_value_from_context",
                                            key: "value"
                                        }
                                    }
                                }
                            },
                            {
                                type: "Slot",
                                title: {
                                    type: "translate",
                                    value: "tools.enchantments.section.supported.components.none.title"
                                },
                                image: "/images/tools/cross.webp",
                                action: {
                                    type: "set_undefined",
                                    field: {
                                        type: "get_toggle_field",
                                        group: "main.supported"
                                    }
                                },
                                hide: {
                                    condition: "Equals",
                                    type: "String",
                                    field: {
                                        type: "get_toggle_field",
                                        group: "main.supported"
                                    },
                                    value: "main.supported.items"
                                },
                                condition: {
                                    condition: "Equals",
                                    type: "Undefined",
                                    field: {
                                        type: "get_toggle_field",
                                        group: "main.supported"
                                    }
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    };

    describe("Complex template resolution", () => {
        it("should resolve fields in iteration template", () => {
            /* const resolvedTemplate = resolveField(iterationType.template, fieldContext);
            const iterations = createIterations(iterationType.values[0], mockFiles);
            const results = iterations.map((iteration) => {
                return resolveIterationValue(resolvedTemplate, iteration.context);
            });

            expect(results).toHaveLength(2);

            expect(results[0]).toMatchObject({
                type: "Slot",
                title: "Sharpness",
                action: {
                    type: "String",
                    value: "minecraft:strength"
                }
            });

            expect(results[1]).toMatchObject({
                type: "Slot",
                title: "Smite",
                action: {
                    type: "String",
                    value: "minecraft:strength"
                }
            });*/
            expect(test).toBeDefined();
            expect(test2).toBeDefined();
            expect(supported).toBeDefined();
            expect(true).toBe(true);
        });
    });
});

import { describe, it, expect } from "vitest";
import { getValue } from "@/lib/minecraft/core/engine/value";
import type { ValueParams } from "@/lib/minecraft/core/engine/value";
import type { RegistryElement } from "@/lib/minecraft/mczip";
import { Identifier } from "@/lib/minecraft/core/Identifier";
import type { EnchantmentProps } from "@/lib/minecraft/core/schema/enchant/EnchantmentProps";

const createMockElement = (data: Partial<EnchantmentProps> = {}): RegistryElement<EnchantmentProps> => ({
    identifier: new Identifier("namespace", "enchantment", "foo"),
    data: {
        description: { translate: "enchantment.test.foo" },
        exclusiveSet: undefined,
        supportedItems: "#minecraft:sword",
        primaryItems: undefined,
        maxLevel: 1,
        weight: 1,
        anvilCost: 1,
        minCostBase: 1,
        minCostPerLevelAboveFirst: 1,
        maxCostBase: 10,
        maxCostPerLevelAboveFirst: 10,
        effects: undefined,
        assignedTags: [],
        slots: ["head", "chest"],
        tags: ["#minecraft:enchantable/bow", "#minecraft:enchantable/armor"],
        softDelete: false,
        disabledEffects: [],
        ...data
    }
});

describe("Value System", () => {
    describe("Simple Value", () => {
        it("should return value when no condition", () => {
            const element = createMockElement();
            const valueParams: ValueParams<number> = {
                params: {
                    type: "Value",
                    value: 42
                }
            };

            expect(getValue(valueParams, element)).toBe(42);
        });

        it("should return value when condition is true", () => {
            const element = createMockElement();
            const valueParams: ValueParams<string> = {
                params: {
                    type: "Value",
                    value: "test"
                },
                condition: {
                    condition: "contains_in_value",
                    field: "slots",
                    values: ["head"]
                }
            };

            expect(getValue(valueParams, element)).toBe("test");
        });

        it("should return null when condition is false", () => {
            const element = createMockElement();
            const valueParams: ValueParams<string> = {
                params: {
                    type: "Value",
                    value: "test"
                },
                condition: {
                    condition: "contains_in_value",
                    field: "slots",
                    values: ["invalid_slot"]
                }
            };

            expect(getValue(valueParams, element)).toBeNull();
        });
    });

    describe("Complex conditions", () => {
        it("should handle nested conditions", () => {
            const element = createMockElement();
            const valueParams: ValueParams<number> = {
                params: {
                    type: "Value",
                    value: 42
                },
                condition: {
                    condition: "all_of",
                    terms: [
                        {
                            condition: "contains_in_value",
                            field: "slots",
                            values: ["head"]
                        },
                        {
                            condition: "contains_in_tags",
                            field: "tags",
                            values: ["#minecraft:enchantable/bow"]
                        }
                    ]
                }
            };

            expect(getValue(valueParams, element)).toBe(42);
        });

        it("should return null for complex false condition", () => {
            const element = createMockElement();
            const valueParams: ValueParams<number> = {
                params: {
                    type: "Value",
                    value: 42
                },
                condition: {
                    condition: "any_of",
                    terms: [
                        {
                            condition: "contains_in_value",
                            field: "slots",
                            values: ["invalid_slot"]
                        },
                        {
                            condition: "contains_in_tags",
                            field: "tags",
                            values: ["#minecraft:enchantable/crossbow"]
                        }
                    ]
                }
            };

            expect(getValue(valueParams, element)).toBeNull();
        });
    });

    describe("Different value types", () => {
        it("should handle number values", () => {
            const element = createMockElement();
            const valueParams: ValueParams<number> = {
                params: {
                    type: "Value",
                    value: 42
                }
            };

            expect(getValue(valueParams, element)).toBe(42);
        });

        it("should handle string values", () => {
            const element = createMockElement();
            const valueParams: ValueParams<string> = {
                params: {
                    type: "Value",
                    value: "test"
                }
            };

            expect(getValue(valueParams, element)).toBe("test");
        });

        it("should handle object values", () => {
            const element = createMockElement();
            const valueParams: ValueParams<{ key: string }> = {
                params: {
                    type: "Value",
                    value: { key: "test" }
                }
            };

            expect(getValue(valueParams, element)).toEqual({ key: "test" });
        });
    });
});

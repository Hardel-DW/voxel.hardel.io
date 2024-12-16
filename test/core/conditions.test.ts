import { describe, it, expect } from "vitest";
import { checkCondition } from "@/lib/minecraft/core/engine/condition";
import type { Condition } from "@/lib/minecraft/core/engine/condition";
import type { RegistryElement } from "@/lib/minecraft/mczip";
import { Identifier } from "@/lib/minecraft/core/Identifier";
import type { EnchantmentProps } from "@/lib/minecraft/core/schema/enchant/EnchantmentProps";

// Mock d'un élément de registre pour les tests
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

describe("Condition System", () => {
    describe("EqualCondition", () => {
        it("should check string equality", () => {
            const element = createMockElement();
            const condition: Condition = {
                condition: "compare_value_to_field_value",
                field: "supportedItems",
                value: "#minecraft:sword"
            };

            expect(checkCondition(condition, element)).toBe(true);
        });

        it("should check undefined equality", () => {
            const element = createMockElement();
            const condition: Condition = {
                condition: "if_field_is_undefined",
                field: "exclusiveSet"
            };

            expect(checkCondition(condition, element)).toBe(true);
        });
    });

    describe("ContainCondition", () => {
        it("should check string array contains", () => {
            const element = createMockElement();
            const condition: Condition = {
                condition: "contains_in_value",
                field: "slots",
                values: ["head"]
            };

            expect(checkCondition(condition, element)).toBe(true);
        });

        it("should check tags contains", () => {
            const element = createMockElement();
            const condition: Condition = {
                condition: "contains_in_tags",
                field: "tags",
                values: ["#minecraft:enchantable/bow"]
            };

            expect(checkCondition(condition, element)).toBe(true);
        });
    });

    describe("InvertedCondition", () => {
        it("should invert condition result", () => {
            const element = createMockElement();
            const condition: Condition = {
                condition: "inverted",
                terms: {
                    condition: "compare_value_to_field_value",
                    field: "supportedItems",
                    value: "#minecraft:axe"
                }
            };

            expect(checkCondition(condition, element)).toBe(true);
        });
    });

    describe("AllOfCondition", () => {
        it("should check all conditions are true", () => {
            const element = createMockElement();
            const condition: Condition = {
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
            };

            expect(checkCondition(condition, element)).toBe(true);
        });

        it("should return false if any condition is false", () => {
            const element = createMockElement();
            const condition: Condition = {
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
                        values: ["#minecraft:enchantable/crossbow"]
                    }
                ]
            };

            expect(checkCondition(condition, element)).toBe(false);
        });
    });

    describe("AnyOfCondition", () => {
        it("should check if any condition is true", () => {
            const element = createMockElement();
            const condition: Condition = {
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
                        values: ["#minecraft:enchantable/bow"]
                    }
                ]
            };

            expect(checkCondition(condition, element)).toBe(true);
        });

        it("should return false if all conditions are false", () => {
            const element = createMockElement();
            const condition: Condition = {
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
            };

            expect(checkCondition(condition, element)).toBe(false);
        });
    });

    describe("Complex conditions", () => {
        it("should handle nested conditions", () => {
            const element = createMockElement();
            const condition: Condition = {
                condition: "all_of",
                terms: [
                    {
                        condition: "any_of",
                        terms: [
                            {
                                condition: "contains_in_value",
                                field: "slots",
                                values: ["head"]
                            },
                            {
                                condition: "contains_in_value",
                                field: "slots",
                                values: ["chest"]
                            }
                        ]
                    },
                    {
                        condition: "inverted",
                        terms: {
                            condition: "contains_in_tags",
                            field: "tags",
                            values: ["#minecraft:enchantable/crossbow"]
                        }
                    }
                ]
            };

            expect(checkCondition(condition, element)).toBe(true);
        });
    });
});

import { Identifier } from "@/lib/minecraft/core/Identifier";
import { updateData } from "@/lib/minecraft/core/engine/actions";
import type { ListAction } from "@/lib/minecraft/core/engine/actions/AppendListModifier";
import type { MultipleAction } from "@/lib/minecraft/core/engine/actions/MultipleModifier";
import type { RemoveKeyAction } from "@/lib/minecraft/core/engine/actions/RemoveKeyModifier";
import type { SequentialAction } from "@/lib/minecraft/core/engine/actions/SequentialModifier";
import type { SimpleAction } from "@/lib/minecraft/core/engine/actions/SimpleModifier";
import type { SlotAction } from "@/lib/minecraft/core/engine/actions/SlotModifier";
import type { ToggleListValueAction } from "@/lib/minecraft/core/engine/actions/ToggleListValueModifier";
import type { EnchantmentProps } from "@/lib/minecraft/core/schema/enchant/EnchantmentProps";
import type { RegistryElement } from "@/lib/minecraft/mczip";
import type { EffectComponentsRecord } from "@voxel/definitions";
import { describe, expect, it } from "vitest";

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
        slots: [],
        tags: [],
        softDelete: false,
        disabledEffects: [],
        ...data
    }
});

describe("Action System", () => {
    describe("SimpleModifier", () => {
        it("should set a value", () => {
            const element = createMockElement();
            const action: SimpleAction = {
                type: "set_value",
                field: "minCostBase",
                value: 5
            };

            const result = updateData(action, element, 48);
            expect(result).toBeDefined();
            expect(result?.data.minCostBase).toBe(5);
        });

        it("should toggle a value", () => {
            const element = createMockElement({ minCostBase: 5 });
            const action: SimpleAction = {
                type: "toggle_value",
                field: "minCostBase",
                value: 5
            };

            const result = updateData(action, element, 48);

            expect(result).toBeDefined();
            expect(result?.data.minCostBase).toBeUndefined();
        });
    });

    describe("ListModifier", () => {
        it("should append to a list", () => {
            const element = createMockElement({ slots: ["head"] });
            const action: ListAction = {
                type: "list_operation",
                mode: "append",
                field: "slots",
                value: "chest"
            };

            const result = updateData(action, element, 48);

            expect(result).toBeDefined();
            expect(result?.data.slots).toEqual(["head", "chest"]);
        });

        it("should prepend to a list", () => {
            const element = createMockElement({ slots: ["head"] });
            const action: ListAction = {
                type: "list_operation",
                mode: "prepend",
                field: "slots",
                value: "chest"
            };

            const result = updateData(action, element, 48);

            expect(result).toBeDefined();
            expect(result?.data.slots).toEqual(["chest", "head"]);
        });
    });

    describe("MultipleModifier", () => {
        it("should toggle multiple values in a list", () => {
            const element = createMockElement({ slots: ["head", "chest"] });
            const action: MultipleAction = {
                type: "toggle_multiple_values",
                field: "slots",
                value: ["head", "legs"]
            };

            const result = updateData(action, element, 48);
            expect(result).toBeDefined();
            expect(result?.data.slots).toEqual(["chest"]);
        });
    });

    describe("SequentialModifier", () => {
        it("should execute multiple actions in sequence", () => {
            const element = createMockElement({ min_cost: 1 });
            const action: SequentialAction = {
                type: "sequential",
                actions: [
                    {
                        type: "set_value",
                        field: "min_cost",
                        value: 5
                    },
                    {
                        type: "set_value",
                        field: "max_cost",
                        value: 10
                    }
                ]
            };

            const result = updateData(action, element, 48);

            expect(result).toBeDefined();
            expect(result?.data.min_cost).toBe(5);
            expect(result?.data.max_cost).toBe(10);
        });
    });

    describe("RemoveKeyModifier", () => {
        it("should remove a key from an object", () => {
            const element = createMockElement({
                effects: {
                    "minecraft:damage_protection": [
                        {
                            effect: {
                                type: "minecraft:add",
                                value: 10
                            }
                        }
                    ],
                    "minecraft:damage_immunity": [
                        {
                            effect: {
                                type: "minecraft:add",
                                value: 10
                            }
                        }
                    ]
                } as EffectComponentsRecord
            });

            const action: RemoveKeyAction = {
                type: "remove_key",
                field: "effects",
                value: "minecraft:damage_protection"
            };

            const result = updateData(action, element, 48);

            expect(result).toBeDefined();
            expect(result?.data.effects).toEqual({
                "minecraft:damage_immunity": [
                    {
                        effect: {
                            type: "minecraft:add",
                            value: 10
                        }
                    }
                ]
            });
        });
    });

    describe("ToggleListValueModifier", () => {
        it("should toggle a value in a list", () => {
            const element = createMockElement({ slots: ["head", "chest"] });
            const action: ToggleListValueAction = {
                type: "toggle_value_in_list",
                field: "slots",
                value: "head"
            };

            const result = updateData(action, element, 48);

            expect(result).toBeDefined();
            expect(result?.data.slots).toEqual(["chest"]);
        });

        it("should remove field if list becomes empty with remove_if_empty mode", () => {
            const element = createMockElement({ slots: ["head"] });
            const action: ToggleListValueAction = {
                type: "toggle_value_in_list",
                field: "slots",
                value: "head",
                mode: "remove_if_empty"
            };

            const result = updateData(action, element, 48);

            expect(result).toBeDefined();
            expect(result?.data.slots).toBeUndefined();
        });
    });

    describe("SlotModifier", () => {
        it("should add a slot when not present", () => {
            const element = createMockElement({
                slots: ["head", "chest"]
            });
            const action: SlotAction = {
                type: "set_computed_slot",
                field: "slots",
                value: "legs"
            };

            const result = updateData(action, element, 48);

            expect(result).toBeDefined();
            expect(result?.data.slots).toEqual(["head", "chest", "legs"]);
        });

        it("should remove a slot when already present", () => {
            const element = createMockElement({
                slots: ["head", "chest", "legs"]
            });
            const action: SlotAction = {
                type: "set_computed_slot",
                field: "slots",
                value: "chest"
            };

            const result = updateData(action, element, 48);

            expect(result).toBeDefined();
            expect(result?.data.slots).toEqual(["head", "legs"]);
        });

        it("should handle empty slots array", () => {
            const element = createMockElement({
                slots: []
            });
            const action: SlotAction = {
                type: "set_computed_slot",
                field: "slots",
                value: "head"
            };

            const result = updateData(action, element, 48);

            expect(result).toBeDefined();
            expect(result?.data.slots).toEqual(["head"]);
        });

        it("should throw error for invalid slot value", () => {
            const element = createMockElement({
                slots: ["head"]
            });
            const action: SlotAction = {
                type: "set_computed_slot",
                field: "slots",
                value: "invalid_slot"
            };

            expect(() => updateData(action, element, 48)).toThrow();
        });
    });
});

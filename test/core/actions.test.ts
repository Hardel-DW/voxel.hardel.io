import { Identifier } from "@/lib/minecraft/core/Identifier";
import { updateData } from "@/lib/minecraft/core/engine/actions";
import type { ListAction } from "@/lib/minecraft/core/engine/actions/AppendListModifier";
import type { MultipleAction } from "@/lib/minecraft/core/engine/actions/MultipleModifier";
import type { RemoveKeyAction } from "@/lib/minecraft/core/engine/actions/RemoveKeyModifier";
import type { RemoveValueFromListAction } from "@/lib/minecraft/core/engine/actions/RemoveValueFromListModifier";
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
        description: { translate: "enchantment.test.foo", fallback: "Enchantment Test" },
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
        slots: [],
        tags: [],
        softDelete: false,
        disabledEffects: [],
        ...data
    }
});

const createComplexMockElement = (data: Partial<EnchantmentProps> = {}): RegistryElement<EnchantmentProps> => ({
    identifier: new Identifier("enchantplus", "enchantment", "bow/accuracy_shot"),
    data: {
        anvilCost: 4,
        description: { translate: "enchantment.test.foo", fallback: "Enchantment Test" },
        disabledEffects: [],
        effects: {
            "minecraft:projectile_spawned": [
                {
                    effect: {
                        type: "minecraft:run_function",
                        function: "enchantplus:actions/accuracy_shot/on_shoot"
                    }
                }
            ]
        } as EffectComponentsRecord,
        exclusiveSet: "#minecraft:exclusive_set/armor",
        maxLevel: 1,
        minCostBase: 1,
        minCostPerLevelAboveFirst: 1,
        maxCostBase: 10,
        assignedTags: ["exclusiveSet"],
        maxCostPerLevelAboveFirst: 10,
        primaryItems: undefined,
        supportedItems: "#voxel:enchantable/range",
        slots: ["mainhand", "offhand"],
        softDelete: false,
        tags: [
            "#minecraft:non_treasure",
            "#yggdrasil:structure/alfheim_tree/ominous_vault",
            "#yggdrasil:structure/alfheim_tree/ominous_vault/floor",
            "#yggdrasil:structure/asflors/common"
        ],
        weight: 2,
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
                mode: ["remove_if_empty"]
            };

            const result = updateData(action, element, 48);

            expect(result).toBeDefined();
            expect(result?.data.slots).toBeUndefined();
        });

        it("should convert primitive value to array with override mode", () => {
            const element = createMockElement({
                exclusiveSet: "#minecraft:exclusive_set/armor"
            });

            const action: ToggleListValueAction = {
                type: "toggle_value_in_list",
                field: "exclusiveSet",
                value: "#minecraft:exclusive_set/weapon",
                mode: ["override"]
            };

            const result = updateData(action, element, 48);

            expect(result).toBeDefined();
            expect(Array.isArray(result?.data.exclusiveSet)).toBe(true);
            expect(result?.data.exclusiveSet).toEqual(["#minecraft:exclusive_set/weapon"]);
        });

        it("should support multiple modes", () => {
            const element = createMockElement({
                exclusiveSet: "#minecraft:exclusive_set/armor"
            });
            const action: ToggleListValueAction = {
                type: "toggle_value_in_list",
                field: "exclusiveSet",
                value: "#minecraft:exclusive_set/armor",
                mode: ["override", "remove_if_empty"]
            };

            const result = updateData(action, element, 48);

            expect(result).toBeDefined();
            expect(result?.data.exclusiveSet).toEqual(["#minecraft:exclusive_set/armor"]);
        });

        it("should handle undefined field with override mode", () => {
            const element = createMockElement({
                exclusiveSet: undefined
            });
            const action: ToggleListValueAction = {
                type: "toggle_value_in_list",
                field: "exclusiveSet",
                value: "#minecraft:exclusive_set/weapon",
                mode: ["override"]
            };

            const result = updateData(action, element, 48);

            expect(result).toBeDefined();
            expect(Array.isArray(result?.data.exclusiveSet)).toBe(true);
            expect(result?.data.exclusiveSet).toEqual(["#minecraft:exclusive_set/weapon"]);
        });
    });

    describe("RemoveValueFromListModifier", () => {
        it("should remove a value from a list", () => {
            const element = createMockElement({ slots: ["head", "chest", "legs"] });
            const action: RemoveValueFromListAction = {
                type: "remove_value_from_list",
                field: "slots",
                value: "chest"
            };

            const result = updateData(action, element, 48);

            expect(result).toBeDefined();
            expect(result?.data.slots).toEqual(["head", "legs"]);
        });

        it("should remove field if list becomes empty with remove_if_empty mode", () => {
            const element = createMockElement({ slots: ["head"] });
            const action: RemoveValueFromListAction = {
                type: "remove_value_from_list",
                field: "slots",
                value: "head",
                mode: ["remove_if_empty"]
            };

            const result = updateData(action, element, 48);

            expect(result).toBeDefined();
            expect(result?.data.slots).toBeUndefined();
        });

        it("should handle value from props parameter", () => {
            const element = createMockElement({ slots: ["head", "chest"] });
            const action: RemoveValueFromListAction = {
                type: "remove_value_from_list",
                field: "slots"
            };

            const result = updateData(action, element, 48, "head");

            expect(result).toBeDefined();
            expect(result?.data.slots).toEqual(["chest"]);
        });

        it("should throw error when both value and props are undefined", () => {
            const element = createMockElement({ slots: ["head", "chest"] });
            const action: RemoveValueFromListAction = {
                type: "remove_value_from_list",
                field: "slots"
            };

            expect(() => updateData(action, element, 48)).toThrow("Both props and action.value cannot be undefined");
        });

        it("should handle non-existent value gracefully", () => {
            const element = createMockElement({ slots: ["head", "chest"] });
            const action: RemoveValueFromListAction = {
                type: "remove_value_from_list",
                field: "slots",
                value: "legs"
            };

            const result = updateData(action, element, 48);

            expect(result).toBeDefined();
            expect(result?.data.slots).toEqual(["head", "chest"]);
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

    describe("Complex object resolution", () => {
        it("Toggle Element in List", () => {
            const element = createComplexMockElement();
            const action: ToggleListValueAction = {
                type: "toggle_value_in_list",
                field: "disabledEffects"
            };

            // Premier appel - ajoute l'élément
            const result = updateData(action, element, 48, "minecraft:projectile_spawned");
            expect(result).toBeDefined();
            expect(result?.data.disabledEffects).toEqual(["minecraft:projectile_spawned"]);

            // Deuxième appel - utilise le résultat du premier appel comme entrée
            if (result === undefined) {
                throw new Error("First update failed");
            }

            const result2 = updateData(action, result, 48, "minecraft:projectile_spawned");
            expect(result2).toBeDefined();
            expect(result2?.data.disabledEffects).toEqual([]);
        });
    });
});

describe("Action System - Identifier Validation", () => {
    it("should maintain Identifier instance through SimpleModifier", () => {
        const element = createMockElement();
        const action: SimpleAction = {
            type: "set_value",
            field: "minCostBase",
            value: 5
        };

        const result = updateData(action, element, 48);
        expect(result?.identifier).toBeInstanceOf(Identifier);
        expect(result?.identifier.equals(element.identifier)).toBe(true);
    });

    it("should maintain Identifier instance through ToggleListValueModifier", () => {
        const element = createMockElement({ slots: ["head"] });
        const action: ToggleListValueAction = {
            type: "toggle_value_in_list",
            field: "slots",
            value: "chest"
        };

        const result = updateData(action, element, 48);
        expect(result?.identifier).toBeInstanceOf(Identifier);
        expect(result?.identifier.equals(element.identifier)).toBe(true);
    });

    it("should maintain Identifier instance through SequentialModifier", () => {
        const element = createMockElement();
        const action: SequentialAction = {
            type: "sequential",
            actions: [
                {
                    type: "set_value",
                    field: "minCostBase",
                    value: 5
                },
                {
                    type: "toggle_value_in_list",
                    field: "slots",
                    value: "head"
                }
            ]
        };

        const result = updateData(action, element, 48);
        expect(result?.identifier).toBeInstanceOf(Identifier);
        expect(result?.identifier.equals(element.identifier)).toBe(true);
    });

    it("should maintain Identifier instance through RemoveKeyModifier", () => {
        const element = createComplexMockElement();
        const action: RemoveKeyAction = {
            type: "remove_key",
            field: "effects",
            value: "minecraft:projectile_spawned"
        };

        const result = updateData(action, element, 48);
        expect(result?.identifier).toBeInstanceOf(Identifier);
        expect(result?.identifier.equals(element.identifier)).toBe(true);
    });

    it("should maintain Identifier instance through MultipleModifier", () => {
        const element = createMockElement({ slots: ["head", "chest"] });
        const action: MultipleAction = {
            type: "toggle_multiple_values",
            field: "slots",
            value: ["head", "legs"]
        };

        const result = updateData(action, element, 48);
        expect(result?.identifier).toBeInstanceOf(Identifier);
        expect(result?.identifier.equals(element.identifier)).toBe(true);
    });

    it("should maintain Identifier instance through RemoveValueFromListModifier", () => {
        const element = createMockElement({ slots: ["head", "chest"] });
        const action: RemoveValueFromListAction = {
            type: "remove_value_from_list",
            field: "slots",
            value: "head"
        };

        const result = updateData(action, element, 48);
        expect(result?.identifier).toBeInstanceOf(Identifier);
        expect(result?.identifier.equals(element.identifier)).toBe(true);
    });

    it("should maintain Identifier instance through AppendListModifier", () => {
        const element = createMockElement({ slots: ["head"] });
        const action: ListAction = {
            type: "list_operation",
            mode: "append",
            field: "slots",
            value: "chest"
        };

        const result = updateData(action, element, 48);
        expect(result?.identifier).toBeInstanceOf(Identifier);
        expect(result?.identifier.equals(element.identifier)).toBe(true);
    });

    it("should maintain Identifier instance through complex chained operations", () => {
        const element = createComplexMockElement();
        const action: SequentialAction = {
            type: "sequential",
            actions: [
                {
                    type: "toggle_value_in_list",
                    field: "slots",
                    value: "head"
                },
                {
                    type: "remove_key",
                    field: "effects",
                    value: "minecraft:projectile_spawned"
                },
                {
                    type: "set_value",
                    field: "weight",
                    value: 5
                }
            ]
        };

        const result = updateData(action, element, 48);
        expect(result?.identifier).toBeInstanceOf(Identifier);
        expect(result?.identifier.equals(element.identifier)).toBe(true);
        expect(result?.identifier.toString()).toBe("enchantplus:bow/accuracy_shot");
    });
});

import { type SlotRegistryType, removeSlot } from "@/lib/minecraft/registry/SlotRegistry.ts";
import { describe, expect, test } from "vitest";

const singleItemTests = ["head", "chest", "legs", "feet", "mainhand", "offhand"] as SlotRegistryType[];
const armorTests = ["head", "chest", "legs", "feet"] as SlotRegistryType[];
const handTests = ["mainhand", "offhand"] as SlotRegistryType[];

describe("Remove Slot with key", () => {
    test("should return an empty list if a list is already empty", () => {
        for (const item of singleItemTests) {
            expect(removeSlot([], item)).toEqual([]);
        }
    });

    test("should remove the item from the list", () => {
        for (const item of singleItemTests) {
            expect(removeSlot([item], item)).toEqual([]);
        }
    });

    test("should remove the value from the list", () => {
        for (const armor of armorTests) {
            for (const hand of handTests) {
                expect(removeSlot([armor, hand], hand)).toContain(armor);
                expect(removeSlot([armor, hand], armor)).toContain(hand);
            }
        }
    });

    test("should destructuring the armor, when removing a armor piece", () => {
        for (const armor of armorTests) {
            expect(removeSlot(["armor"], armor)).toEqual(expect.arrayContaining(armorTests.filter((item) => item !== armor)));
        }
    });

    test("should destructuring the hand, when removing a hand piece", () => {
        for (const hand of handTests) {
            expect(removeSlot(["hand"], hand)).toEqual(expect.arrayContaining(handTests.filter((item) => item !== hand)));
        }
    });

    test("should destructuring the list when removing item from any into sub group e.g armor or hand", () => {
        expect(removeSlot(["any"], "mainhand")).toEqual(expect.arrayContaining(["offhand", "armor"]));
    });

    test("should destructuring the list when removing item from any into sub group e.g armor or hand", () => {
        expect(removeSlot(["any"], "offhand")).toEqual(expect.arrayContaining(["mainhand", "armor"]));
    });

    test("should destructuring the list when removing item from any into sub group e.g armor or hand", () => {
        expect(removeSlot(["any"], "head")).toEqual(expect.arrayContaining(["hand", "chest", "legs", "feet"]));
    });

    test("should destructuring the list when removing item from any into sub group e.g armor or hand", () => {
        expect(removeSlot(["any"], "chest")).toEqual(expect.arrayContaining(["hand", "feet", "head", "legs"]));
    });

    test("should destructuring the list when removing item from any into sub group e.g armor or hand", () => {
        expect(removeSlot(["any"], "legs")).toEqual(expect.arrayContaining(["hand", "head", "chest", "feet"]));
    });

    test("should destructuring the list when removing item from any into sub group e.g armor or hand", () => {
        expect(removeSlot(["any"], "feet")).toEqual(expect.arrayContaining(["hand", "head", "chest", "legs"]));
    });

    test('should return "head" and "feet" when removing chest from head, chest, and feet', () => {
        expect(removeSlot(["head", "chest", "feet"], "chest")).toEqual(expect.arrayContaining(["head", "feet"]));
    });

    test("should destructuring the list when removing item from any into sub group e.g armor or hand", () => {
        expect(removeSlot(["hand", "chest", "legs", "feet"], "chest")).toEqual(expect.arrayContaining(["hand", "legs", "feet"]));
    });

    test("should destructuring the list when removing item from any into sub group e.g armor or hand", () => {
        expect(removeSlot(["hand", "legs", "feet"], "legs")).toEqual(expect.arrayContaining(["hand", "feet"]));
    });

    test("should destructuring the list when removing item from any into sub group e.g armor or hand", () => {
        expect(removeSlot(["hand", "feet"], "feet")).toEqual(expect.arrayContaining(["hand"]));
    });

    test("should destructuring the list when removing item from any into sub group e.g armor or hand", () => {
        expect(removeSlot(["hand", "head", "chest"], "chest")).toEqual(expect.arrayContaining(["hand", "head"]));
    });
});

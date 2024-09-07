import { toggleSlot } from "@/lib/minecraft/registry/SlotRegistry.ts";
import { describe, expect, test } from "vitest";

describe("Add Slot with key", () => {
    test("Should remove the key, if it found", () => {
        expect(toggleSlot(["mainhand"], "mainhand")).toEqual([]);
    });

    test("Should remove the key, if it found in group and in consequence destructing the group", () => {
        expect(toggleSlot(["hand"], "mainhand")).toEqual(["offhand"]);
    });

    test("Should add the key, if it not found", () => {
        expect(toggleSlot([], "mainhand")).toEqual(["mainhand"]);
    });

    test("Should add the key, and group if all keys are present", () => {
        expect(toggleSlot(["mainhand"], "offhand")).toEqual(["hand"]);
    });

    test("Should add the key, and group if all keys are present", () => {
        expect(toggleSlot(["head", "chest", "legs"], "feet")).toEqual(["armor"]);
    });

    test("Should add the key, and group if all keys are present", () => {
        expect(toggleSlot(["hand", "head", "chest", "legs"], "feet")).toContain("any");
    });

    test("Should add the key, and group if all keys are present", () => {
        expect(toggleSlot(["offhand", "head", "chest", "legs", "feet"], "mainhand")).toContain("any");
    });

    test("Should remove the key, if it found in group and in consequence destructing the group", () => {
        expect(toggleSlot(["any"], "mainhand")).toEqual(expect.arrayContaining(["offhand", "armor"]));
    });

    test("Should remove the key, if it found in group and in consequence destructing the group", () => {
        expect(toggleSlot(["any"], "feet")).toEqual(expect.arrayContaining(["hand", "head", "chest", "legs"]));
    });

    test("Should remove the key, if it found", () => {
        expect(toggleSlot(["mainhand", "feet", "head"], "feet")).toEqual(expect.arrayContaining(["mainhand", "head"]));
    });
});

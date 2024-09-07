import { addSlot } from "@/lib/minecraft/registry/SlotRegistry.ts";
import { describe, expect, test } from "vitest";

describe("Add Slot with key", () => {
    test('should return "hand" when adding offhand to mainhand', () => {
        expect(addSlot(["mainhand"], "offhand")).toContain("hand");
    });

    test('should return "offhand" when adding offhand to an empty list', () => {
        expect(addSlot([], "offhand")).toContain("offhand");
    });

    test('should return "mainhand" when adding mainhand to an empty list', () => {
        expect(addSlot([], "mainhand")).toContain("mainhand");
    });

    test('should return "armor" when adding legs to head, chest, and feet', () => {
        expect(addSlot(["head", "chest", "feet"], "legs")).toContain("armor");
    });

    test('should return "any" when adding feet to hand, head, chest, and legs', () => {
        expect(addSlot(["hand", "head", "chest", "legs"], "feet")).toContain("any");
    });

    test('should return "armor" when adding armor to an empty list', () => {
        expect(addSlot([], "armor")).toContain("armor");
    });

    test('should return "any" when adding any to any list', () => {
        expect(addSlot(["mainhand", "armor"], "any")).toContain("any");
    });

    test('should return "mainhand" and "armor" when adding legs to mainhand, head, chest, and feet', () => {
        expect(addSlot(["mainhand", "head", "chest", "feet"], "legs")).toEqual(expect.arrayContaining(["mainhand", "armor"]));
    });

    test('should return "head", "chest" and "feet" when adding feet to head and chest', () => {
        expect(addSlot(["head", "chest"], "feet")).toEqual(expect.arrayContaining(["head", "chest", "feet"]));
    });

    test('should return "offhand" and "armor" when adding offhand to armor', () => {
        expect(addSlot(["armor"], "offhand")).toEqual(expect.arrayContaining(["armor", "offhand"]));
    });
});

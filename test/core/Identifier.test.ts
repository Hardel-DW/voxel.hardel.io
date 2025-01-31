import { describe, it, expect } from "vitest";
import {
    createIdentifierFromString,
    identifierToString,
    identifierToFilePath,
    identifierToResourceName,
    identifierToResourcePath,
    identifierToNamespace,
    identifierEquals,
    sortIdentifiers,
    sortRegistry,
    sortVoxelElements,
    identifierToFileName,
    isIdentifier,
    type IdentifierObject
} from "@/lib/minecraft/core/Identifier";
import { VOXEL_TEMPLATE_ENCHANTMENT } from "test/template/voxel";

describe("Identifier", () => {
    describe("createIdentifierFromString", () => {
        it("should create a basic identifier", () => {
            const result = createIdentifierFromString("minecraft:stone", "block");
            expect(result).toEqual({
                namespace: "minecraft",
                registry: "block",
                resource: "stone"
            });
        });

        it("should create identifier from tag", () => {
            const result = createIdentifierFromString("#minecraft:wool", "tags/block");
            expect(result).toEqual({
                namespace: "minecraft",
                registry: "tags/block",
                resource: "wool"
            });
        });

        it("should handle complex resource paths", () => {
            const result = createIdentifierFromString("enchantplus:sword/life_steal", "enchantment");
            expect(result).toEqual({
                namespace: "enchantplus",
                registry: "enchantment",
                resource: "sword/life_steal"
            });
        });
    });

    describe("identifierToString", () => {
        it("should convert basic identifier to string", () => {
            const identifier = { namespace: "minecraft", registry: "block", resource: "stone" };
            expect(identifierToString(identifier)).toBe("minecraft:stone");
        });

        it("should convert tag identifier to string", () => {
            const identifier = { namespace: "minecraft", registry: "tags/block", resource: "wool" };
            expect(identifierToString(identifier)).toBe("#minecraft:wool");
        });
    });

    describe("identifierEquals", () => {
        const identifier = { namespace: "minecraft", registry: "block", resource: "stone" };

        it("should return true for identical identifiers", () => {
            const other = { namespace: "minecraft", registry: "block", resource: "stone" };
            expect(identifierEquals(identifier, other)).toBe(true);
        });

        it("should return false for different identifiers", () => {
            const other = { namespace: "minecraft", registry: "block", resource: "dirt" };
            expect(identifierEquals(identifier, other)).toBe(false);
        });

        it("should return false for undefined identifier", () => {
            expect(identifierEquals(identifier, undefined)).toBe(false);
        });
    });

    describe("identifierToFilePath", () => {
        it("should generate default file path", () => {
            const identifier = { namespace: "minecraft", registry: "block", resource: "stone" };
            expect(identifierToFilePath(identifier)).toBe("data/minecraft/block/stone");
        });

        it("should generate custom base path", () => {
            const identifier = { namespace: "minecraft", registry: "block", resource: "stone" };
            expect(identifierToFilePath(identifier, "assets")).toBe("assets/minecraft/block/stone");
        });

        it("should handle nested resource paths", () => {
            const identifier = { namespace: "enchantplus", registry: "enchantment", resource: "sword/life_steal" };
            expect(identifierToFilePath(identifier)).toBe("data/enchantplus/enchantment/sword/life_steal");
        });
    });

    describe("identifierToFileName", () => {
        it("should return filename without extension", () => {
            expect(identifierToFileName("stone")).toBe("stone");
            expect(identifierToFileName("sword/life_steal")).toBe("life_steal");
        });

        it("should return filename with extension", () => {
            expect(identifierToFileName("stone", true)).toBe("stone.json");
            expect(identifierToFileName("sword/life_steal", true)).toBe("life_steal.json");
        });
    });

    describe("identifierToNamespace", () => {
        it("should format namespace", () => {
            expect(identifierToNamespace("minecraft")).toBe("Minecraft");
            expect(identifierToNamespace("enchant_plus")).toBe("Enchant Plus");
        });
    });

    describe("identifierToResourceName", () => {
        it("should format simple resource name", () => {
            expect(identifierToResourceName("stone")).toBe("Stone");
        });

        it("should format complex resource name", () => {
            expect(identifierToResourceName("items/diamond_sword")).toBe("Diamond Sword");
            expect(identifierToResourceName("sword/life_steal")).toBe("Life Steal");
        });
    });

    describe("identifierToResourcePath", () => {
        it("should format simple path", () => {
            expect(identifierToResourcePath("stone")).toBe("Stone");
        });

        it("should format complex path", () => {
            expect(identifierToResourcePath("items/weapons/diamond_sword")).toBe("Items - Weapons - Diamond Sword");
        });
    });

    describe("sortIdentifiers", () => {
        it("should sort by namespace then resource", () => {
            const identifiers: IdentifierObject[] = [
                { namespace: "minecraft", registry: "block", resource: "stone" },
                { namespace: "enchantplus", registry: "enchantment", resource: "power" },
                { namespace: "minecraft", registry: "block", resource: "dirt" }
            ];

            const sorted = sortIdentifiers(identifiers);
            expect(sorted[0].namespace).toBe("enchantplus");
            expect(sorted[1].resource).toBe("dirt");
            expect(sorted[2].resource).toBe("stone");
        });
    });

    describe("sortRegistry", () => {
        it("should sort registry elements by resource name", () => {
            const sorted = sortRegistry(VOXEL_TEMPLATE_ENCHANTMENT);
            expect(sorted[0].data.identifier.resource).toContain("accuracy_shot");
        });
    });

    describe("sortVoxelElements", () => {
        it("should sort voxel elements by identifier", () => {
            const elements = new Map();
            elements.set("a", { identifier: { resource: "stone" } });
            elements.set("z", { identifier: { resource: "dirt" } });

            const sorted = sortVoxelElements(elements);
            expect(sorted[0]).toBe("z");
            expect(sorted[1]).toBe("a");
        });
    });

    describe("isIdentifier", () => {
        it("should validate correct identifier", () => {
            const identifier = { namespace: "minecraft", registry: "block", resource: "stone" };
            expect(isIdentifier(identifier)).toBe(true);
        });

        it("should reject invalid identifiers", () => {
            expect(isIdentifier({ namespace: "minecraft" })).toBe(false);
            expect(isIdentifier(null)).toBe(false);
            expect(isIdentifier(undefined)).toBe(false);
            expect(isIdentifier(42)).toBe(false);
            expect(isIdentifier("not an identifier")).toBe(false);
            expect(isIdentifier([])).toBe(false);
            expect(isIdentifier({ namespace: "minecraft", registry: 123, resource: "stone" })).toBe(false);
            expect(isIdentifier({ namespace: 123, registry: "block", resource: "stone" })).toBe(false);
            expect(isIdentifier({ namespace: "minecraft", registry: "block", resource: 123 })).toBe(false);
        });
    });
});

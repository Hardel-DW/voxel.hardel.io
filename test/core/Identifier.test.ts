import { describe, it, expect } from "vitest";
import { Identifier } from "@/lib/minecraft/core/Identifier";
import type { OptionalTag } from "@voxel/definitions";

describe("Identifier", () => {
    describe("Constructor", () => {
        it("should create a basic identifier", () => {
            const identifier = new Identifier("minecraft", "enchantment", "sharpness");
            expect(identifier.toString()).toBe("minecraft:sharpness");
            expect(identifier.getNamespace()).toBe("minecraft");
            expect(identifier.getRegistry()).toBe("enchantment");
            expect(identifier.getResource()).toBe("sharpness");
        });

        it("should create a tag identifier", () => {
            const identifier = new Identifier("minecraft", "tags/enchantment", "weapon", true);
            expect(identifier.toString()).toBe("#minecraft:weapon");
            expect(identifier.isTagged()).toBe(true);
        });
    });

    describe("fromString", () => {
        it("should parse simple identifier", () => {
            const identifier = Identifier.fromString("minecraft:sharpness");
            expect(identifier.toString()).toBe("minecraft:sharpness");
        });

        it("should parse tag identifier", () => {
            const identifier = Identifier.fromString("#minecraft:weapon");
            expect(identifier.toString()).toBe("#minecraft:weapon");
            expect(identifier.isTagged()).toBe(true);
        });

        it("should parse optional tag", () => {
            const optionalTag: OptionalTag = {
                id: "#minecraft:weapon",
                required: false
            };
            const identifier = Identifier.fromString(optionalTag);
            expect(identifier.toString()).toBe("#minecraft:weapon");
            expect(identifier.isRequired()).toBe(false);
        });

        it("should detect registry from path", () => {
            const identifier = Identifier.fromString("minecraft:enchantment/sharpness");
            expect(identifier.getRegistry()).toBe("enchantment");
            expect(identifier.getResource()).toBe("sharpness");
        });
    });

    describe("File paths and rendering", () => {
        it("should generate correct file path", () => {
            const identifier = new Identifier("minecraft", "enchantment", "combat/sharpness");
            expect(identifier.filePath()).toBe("data/minecraft/enchantment/combat/sharpness");
        });

        it("should render resource name", () => {
            const identifier = new Identifier("minecraft", "enchantment", "combat/sharpness");
            expect(identifier.renderResourceName()).toBe("Sharpness");
        });

        it("should render full resource path", () => {
            const identifier = new Identifier("minecraft", "enchantment", "combat/sharpness");
            expect(identifier.renderResource()).toBe("Combat - Sharpness");
        });

        it("should render namespace", () => {
            const identifier = new Identifier("minecraft", "enchantment", "sharpness");
            expect(identifier.renderNamespace()).toBe("Minecraft");
        });
    });

    describe("Comparison and equality", () => {
        it("should compare identifiers correctly", () => {
            const id1 = new Identifier("minecraft", "enchantment", "sharpness");
            const id2 = new Identifier("minecraft", "enchantment", "sharpness");
            const id3 = new Identifier("minecraft", "enchantment", "protection");

            expect(id1.equals(id2)).toBe(true);
            expect(id1.equals(id3)).toBe(false);
        });

        it("should sort identifiers correctly", () => {
            const identifiers = [
                new Identifier("minecraft", "enchantment", "z_last"),
                new Identifier("minecraft", "enchantment", "a_first"),
                new Identifier("custom", "enchantment", "middle")
            ];

            const sorted = Identifier.sortIdentifier(identifiers);
            expect(sorted[0].getNamespace()).toBe("custom");
            expect(sorted[1].getResource()).toBe("a_first");
            expect(sorted[2].getResource()).toBe("z_last");
        });
    });

    describe("Output formatting", () => {
        it("should output string for non-tag identifier", () => {
            const identifier = new Identifier("minecraft", "enchantment", "sharpness");
            expect(identifier.output()).toBe("minecraft:sharpness");
        });

        it("should output OptionalTag for tag identifier", () => {
            const identifier = new Identifier("minecraft", "tags/enchantment", "weapon", true, false);
            const output = identifier.output() as OptionalTag;
            expect(output.id).toBe("#minecraft:weapon");
            expect(output.required).toBe(false);
        });
    });
});

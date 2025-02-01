import { getAnalyserForVersion } from "@/lib/minecraft/core/engine/Analyser";
import { parseSpecificElement } from "@/lib/minecraft/core/engine/Parser";
import { describe, expect, it } from "vitest";

describe("Engine System", () => {
    const mockFiles = {
        "pack.mcmeta": new TextEncoder().encode(
            JSON.stringify({
                pack: {
                    pack_format: 61,
                    supported_formats: {
                        min_inclusive: 41,
                        max_inclusive: 61
                    },
                    description: "Add new enchants to minecraft - By Voxel Team"
                }
            })
        ),
        "data/enchantplus/enchantment/armor/fury.json": new TextEncoder().encode(
            JSON.stringify({
                description: {
                    translate: "enchantment.enchantplus.fury",
                    fallback: "Fury"
                },
                exclusive_set: "#enchantplus:exclusive_set/armor",
                supported_items: "#minecraft:enchantable/armor",
                weight: 8,
                max_level: 4,
                min_cost: {
                    base: 12,
                    per_level_above_first: 12
                },
                max_cost: {
                    base: 32,
                    per_level_above_first: 9
                },
                anvil_cost: 3,
                slots: ["armor"],
                effects: {
                    "minecraft:armor_effectiveness": [
                        {
                            effect: {
                                type: "minecraft:add",
                                value: {
                                    type: "minecraft:linear",
                                    base: -0.045,
                                    per_level_above_first: -0.035
                                }
                            }
                        }
                    ],
                    "minecraft:attributes": [
                        {
                            id: "minecraft:enchantment.fury",
                            attribute: "minecraft:attack_damage",
                            amount: {
                                type: "minecraft:linear",
                                base: 0.075,
                                per_level_above_first: 0.065
                            },
                            operation: "add_multiplied_total"
                        },
                        {
                            id: "minecraft:enchantment.fury_descrease",
                            attribute: "minecraft:armor",
                            amount: {
                                type: "minecraft:linear",
                                base: -0.1,
                                per_level_above_first: -0.075
                            },
                            operation: "add_multiplied_total"
                        }
                    ]
                }
            })
        ),
        "data/enchantplus/tags/enchantment/armor.json": new TextEncoder().encode(
            JSON.stringify({
                values: ["enchantplus:fury"]
            })
        ),
        "data/minecraft/enchantment/attack_speed.json": new TextEncoder().encode(
            JSON.stringify({
                anvil_cost: 2,
                description: {
                    translate: "enchantment.enchantplus.attack_speed",
                    fallback: "Attack Speed"
                },
                effects: {
                    "minecraft:attributes": [
                        {
                            id: "minecraft:enchantment.attack_speed",
                            attribute: "minecraft:attack_speed",
                            amount: {
                                type: "minecraft:linear",
                                base: 0.15,
                                per_level_above_first: 0.15
                            },
                            operation: "add_multiplied_base"
                        }
                    ]
                },
                max_cost: {
                    base: 21,
                    per_level_above_first: 9
                },
                max_level: 2,
                min_cost: {
                    base: 8,
                    per_level_above_first: 11
                },
                slots: ["mainhand"],
                exclusive_set: "#enchantplus:exclusive_set/sword_attribute",
                supported_items: "#minecraft:enchantable/sword",
                weight: 4
            })
        ),
        "data/minecraft/tags/enchantment/weapon.json": new TextEncoder().encode(
            JSON.stringify({
                values: ["minecraft:attack_speed"]
            })
        )
    };

    describe("Analyser", () => {
        it("should get correct analyser for version", () => {
            const analyser = getAnalyserForVersion("enchantment", 48);
            expect(analyser).toBeDefined();
            expect(analyser?.config.analyser.registries.main).toBe("enchantment");
        });

        it("should return undefined for invalid version", () => {
            const analyser = getAnalyserForVersion("enchantment", 12);
            expect(analyser).toBeUndefined();
        });
    });

    describe("Parser", () => {
        it("should parse specific element", async () => {
            const attackSpeedEnchantment = { namespace: "minecraft", registry: "enchantment", resource: "attack_speed" };

            const element = parseSpecificElement<"enchantment">(attackSpeedEnchantment, mockFiles, 48, "enchantment");

            expect(element).toBeDefined();
            expect(element?.data.maxLevel).toBe(2);
            expect(element?.data.effects).toBeDefined();
            const effects = element?.data.effects;
            if (effects) {
                expect(effects).toHaveProperty("minecraft:attributes");
                expect(Array.isArray(effects["minecraft:attributes"])).toBe(true);
            }
        });
    });
});

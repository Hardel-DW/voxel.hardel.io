import { describe, it, expect } from "vitest";
import { LootTable } from "../src/lib/minecraft/core/loot/LootTable";

const mock = {
    type: "minecraft:empty",

    pools: [
        {
            rolls: 0,
            entries: [
                {
                    type: "minecraft:item",
                    name: "minecraft:acacia_sapling",
                    weight: 1
                },
                {
                    type: "minecraft:item",
                    name: "minecraft:acacia_slab",
                    weight: 10
                },
                {
                    type: "minecraft:item",
                    name: "minecraft:andesite",
                    weight: 20
                },
                {
                    type: "minecraft:alternatives",
                    children: [
                        {
                            type: "minecraft:item",
                            name: "minecraft:acacia_stairs",
                            weight: 2
                        }
                    ]
                }
            ],
            conditions: []
        }
    ],
    functions: []
};

describe("LootTable", () => {
    it("should create a LootTable instance", () => {
        const table = new LootTable(mock);
        expect(table).toBeInstanceOf(LootTable);
    });

    it("should throw error if pools property is missing", () => {
        expect(() => new LootTable({})).toThrow("Loot table must have a pools property");
    });

    describe("getAllItems", () => {
        it("should return all items with correct chances", () => {
            const table = new LootTable(mock);
            const items = table.getAllItems();

            console.log(items);

            // Total weight is 33 (1 + 10 + 20 + 2)
            expect(items).toHaveLength(4);

            const itemMap = new Map(items.map((i) => [i.item.name, i]));

            // Vérification des chances pour chaque item
            expect(itemMap.get("minecraft:acacia_sapling")?.chance).toBeCloseTo((1 / 33) * 100); // ≈ 3.03%
            expect(itemMap.get("minecraft:acacia_slab")?.chance).toBeCloseTo((10 / 33) * 100); // ≈ 30.30%
            expect(itemMap.get("minecraft:andesite")?.chance).toBeCloseTo((20 / 33) * 100); // ≈ 60.61%
            expect(itemMap.get("minecraft:acacia_stairs")?.chance).toBeCloseTo((2 / 33) * 100); // ≈ 6.06%
        });

        it("should handle items with undefined weight", () => {
            const mockWithUndefinedWeight = {
                pools: [
                    {
                        entries: [
                            {
                                type: "minecraft:item",
                                name: "minecraft:diamond",
                                quality: 1
                            },
                            {
                                type: "minecraft:item",
                                name: "minecraft:gold",
                                weight: 2,
                                quality: 1
                            }
                        ]
                    }
                ]
            };

            const table = new LootTable(mockWithUndefinedWeight);
            const items = table.getAllItems();

            // Total weight is 3 (1 default + 2)
            expect(items).toHaveLength(2);

            const itemMap = new Map(items.map((i) => [i.item.name, i]));
            expect(itemMap.get("minecraft:diamond")?.chance).toBeCloseTo((1 / 3) * 100); // ≈ 33.33%
            expect(itemMap.get("minecraft:gold")?.chance).toBeCloseTo((2 / 3) * 100); // ≈ 66.67%
        });

        it("should handle empty pools", () => {
            const emptyTable = new LootTable({ pools: [] });
            expect(emptyTable.getAllItems()).toHaveLength(0);
        });
    });
});

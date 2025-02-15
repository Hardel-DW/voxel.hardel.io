import type { NumberProviderObject } from "../NumberProvider";
import type { LootPoolEntryObject, ItemWithChance } from "./LootPoolEntry";
import { LootPoolEntry } from "./LootPoolEntry";

export interface LootTableObject {
    pools: LootPool[];
}

export interface LootPool {
    rolls?: NumberProviderObject;
    bonus_rolls?: NumberProviderObject;
    entries: LootPoolEntryObject[];
}

export interface VoxelLootTable {
    items: ItemWithChance[];
    rolls: number[];
    bonusRolls: number[];
}

export class LootTable {
    private table: Record<string, any>;

    constructor(table: Record<string, any>) {
        if (!this.isLootTable(table)) {
            throw new Error("Loot table must have a pools property");
        }

        this.table = table;
    }

    public getTable() {
        return this.table;
    }

    public getPools() {
        return this.table.pools;
    }

    public getAllItems(): ItemWithChance[] {
        const pools = this.getPools();
        const items: ItemWithChance[] = [];
        for (const pool of pools) {
            if (pool.entries && Array.isArray(pool.entries)) {
                const allItems: ItemWithChance[] = pool.entries.flatMap((entry: LootPoolEntryObject) =>
                    new LootPoolEntry(entry).getAllItems()
                );

                const totalWeight = allItems.reduce((sum: number, { item }) => sum + (item.weight ?? 1), 0);
                items.push(
                    ...allItems.map(({ item }) => ({
                        item,
                        chance: ((item.weight ?? 1) / totalWeight) * 100
                    }))
                );
            }
        }
        return items;
    }

    public serialize(): VoxelLootTable {
        const items = this.getAllItems();
        const rolls = this.table.pools.map((pool: LootPool) => pool.rolls);
        const bonusRolls = this.table.pools.map((pool: LootPool) => pool.bonus_rolls);
        return { items, rolls, bonusRolls };
    }

    private isLootTable(table: Record<string, any>): table is LootTableObject {
        return "pools" in table;
    }
}

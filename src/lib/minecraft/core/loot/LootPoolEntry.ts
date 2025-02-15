import type { LootPool } from "./LootTable";

export interface LootPoolEntryObject {
    type: string;
}

export interface BaseLootPoolEntry {
    weight?: number;
    quality?: number;
}

interface LootPoolEntryAlternative extends LootPoolEntryObject {
    type: "minecraft:alternatives";
    children: LootPoolEntryObject[];
}

interface LootPoolEntrySequence extends LootPoolEntryObject {
    type: "minecraft:sequence";
    children: LootPoolEntryObject[];
}

interface LootPoolEntryGroup extends LootPoolEntryObject {
    type: "minecraft:group";
    children: LootPoolEntryObject[];
}

interface LootPoolEntryItem extends LootPoolEntryObject, BaseLootPoolEntry {
    type: "minecraft:item";
    name: string;
}

interface LootPoolEntryEmpty extends LootPoolEntryObject, BaseLootPoolEntry {
    type: "minecraft:empty";
}

interface LootPoolEntryTag extends LootPoolEntryObject, BaseLootPoolEntry {
    type: "minecraft:tag";
    name: string;
    expand: boolean;
}

interface LootPoolEntryLootTable extends LootPoolEntryObject, BaseLootPoolEntry {
    type: "minecraft:loot_table";
    name: string | LootPool;
}

export interface ItemWithChance {
    item: LootPoolEntryItem;
    chance: number;
}

export class LootPoolEntry {
    private pool: LootPoolEntryObject;

    constructor(pool: LootPoolEntryObject) {
        this.pool = pool;
    }

    public getItem() {
        if (this.pool.type === "item") {
            return this.pool;
        }
        return null;
    }

    public getAllItems(): ItemWithChance[] {
        return LootPoolEntry.extractItems(this.pool);
    }

    private static extractItems(entry: LootPoolEntryObject): ItemWithChance[] {
        switch (entry.type) {
            case "minecraft:item":
            case "item":
                if (LootPoolEntry.isItemEntry(entry)) {
                    const weight = entry.weight ?? 1;
                    return [{ item: { ...entry, weight }, chance: 0 }];
                }
                return [];
            case "minecraft:alternatives":
            case "alternatives":
            case "minecraft:sequence":
            case "sequence":
            case "minecraft:group":
            case "group":
                if (LootPoolEntry.hasChildren(entry)) {
                    return entry.children.flatMap((child) => LootPoolEntry.extractItems(child));
                }
                return [];
            default:
                return [];
        }
    }

    private static hasChildren(entry: LootPoolEntryObject): entry is { type: string; children: LootPoolEntryObject[] } {
        return "children" in entry && Array.isArray(entry.children);
    }

    private static isItemEntry(entry: LootPoolEntryObject): entry is LootPoolEntryItem {
        return (entry.type === "minecraft:item" || entry.type === "item") && "name" in entry;
    }
}

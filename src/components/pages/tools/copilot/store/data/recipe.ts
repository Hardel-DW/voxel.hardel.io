export type RecipeKey = keyof typeof RECIPES;
export type RecipeOfEnum = (typeof RECIPES)[number];
export const RECIPES = [
    {
        id: "minecraft:campfire",
        name: "Campfire"
    },
    {
        id: "minecraft:furnace",
        name: "Furnace"
    },
    {
        id: "minecraft:blast_furnace",
        name: "Blast Furnace"
    },
    {
        id: "minecraft:smoker",
        name: "Smoker"
    },
    {
        id: "minecraft:stonecutter",
        name: "Stonecutter"
    },
    {
        id: "minecraft:crafting_table",
        name: "Crafting Table"
    },
    {
        id: "minecraft:smithing_table",
        name: "Smithing Table"
    },
    {
        id: "minecraft:loom",
        name: "Loom"
    },
    {
        id: "minecraft:barrier",
        name: "Aucun Filtre"
    }
] as const;

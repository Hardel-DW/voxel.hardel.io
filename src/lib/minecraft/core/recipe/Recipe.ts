import type { DataDrivenElement } from "@voxelio/breeze";

export type Recipe =
    | CraftingShaped
    | CraftingShapeless
    | CraftingTransmute
    | Smelting
    | Blasting
    | Smoking
    | CampfireCooking
    | Stonecutting
    | Smithing
    | SmithingTransform
    | SmithingTrim;

export interface CraftingShaped extends DataDrivenElement {
    type: "crafting_shaped";
    group?: string;
    category?: string;
    pattern: string[];
    key: {
        [key: string]: Ingredient;
    };
    result: ItemStack;
    show_notification?: boolean;
}

export interface CraftingShapeless extends DataDrivenElement {
    type: "crafting_shapeless";
    group?: string;
    category?: string;
    ingredients: Ingredient[];
    result: ItemStack;
}

export interface CraftingTransmute extends DataDrivenElement {
    type: "crafting_transmute";
    group?: string;
    category?: string;
    input: Ingredient;
    material: Ingredient;
    result: ItemStack;
}

export interface Stonecutting extends DataDrivenElement {
    type: "stonecutting";
    group?: string;
    ingredient: Ingredient;
    result: ItemStack;
}

export interface Smithing extends DataDrivenElement {
    type: "smithing";
    base: Ingredient;
    addition: Ingredient;
    result: ItemStack; // Was ItemResult before 1.20.5
}

export interface SmithingTransform extends DataDrivenElement {
    type: "smithing_transform";
    template?: Ingredient;
    base: Ingredient;
    addition?: Ingredient;
    result: ItemStack;
}

export interface SmithingTrim extends DataDrivenElement {
    type: "smithing_trim";
    template: Ingredient;
    base: Ingredient;
    addition: Ingredient;
    pattern: string;
    result: ItemStack;
}

export interface BaseSmelting extends DataDrivenElement {
    type: string;
    group?: string;
    category?: string;
    ingredient: Ingredient;
    result: SingleItem;
    experience?: number;
    cookingtime?: number;
}

export interface Smelting extends BaseSmelting {
    type: "smelting";
}

export interface Blasting extends BaseSmelting {
    type: "blasting";
}

export interface Smoking extends BaseSmelting {
    type: "smoking";
}

export interface CampfireCooking extends BaseSmelting {
    type: "campfire_cooking";
}

export interface ItemResult {
    item: string;
    count?: number;
}

export type Ingredient = string | string[];

export interface ItemStack {
    item: string;
    count?: number;
    components?: Record<string, unknown>;
}

export interface SingleItem {
    item: string;
    components?: Record<string, unknown>;
}

export type RecipeType =
    | "crafting_shaped"
    | "crafting_shapeless"
    | "crafting_transmute"
    | "smelting"
    | "blasting"
    | "smoking"
    | "campfire_cooking"
    | "stonecutting"
    | "smithing"
    | "smithing_transform"
    | "smithing_trim";

export function isRecipe(data: unknown, type: RecipeType): data is Recipe {
    if (!data || typeof data !== "object") return false;
    return "type" in data && (data as { type: string }).type === type;
}

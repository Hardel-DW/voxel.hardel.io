/**
 * Class to compare recipes and regroup them by type and by item
 * "crafting_shaped" "crafting_shapeless" "crafting_transmute" => "crafting"
 * "smelting" => furnace
 * "blasting" => blast furnace
 * "smoking" => smoker
 * "campfire_cooking" => campfire
 * "stonecutting" => stonecutter
 * "smithing" "smithing_transform" "smithing_trim" => smithing
 */

import type { Recipe } from "@/lib/minecraft/core/recipe/Recipe";
import type { DataDrivenRegistryElement } from "@voxelio/breeze";

const RECIPE_TYPES = {
    crafting: "crafting",
    smelting: "smelting",
    blasting: "blasting",
    smoking: "smoking",
    campfire_cooking: "campfire_cooking",
    stonecutting: "stonecutting",
    smithing: "smithing"
} as const;

type RecipeType = (typeof RECIPE_TYPES)[keyof typeof RECIPE_TYPES];
export type RecipeOutput = {
    [key: string]: DataDrivenRegistryElement<Recipe>[];
};

export type RecipeGroup = {
    [K in RecipeType]: DataDrivenRegistryElement<Recipe>[];
};

export class RecipeComparator {
    private recipes: DataDrivenRegistryElement<Recipe>[];

    constructor(recipes: DataDrivenRegistryElement<Recipe>[]) {
        this.recipes = recipes;
    }

    private normalizeRecipeType(type: string): RecipeType {
        if (type.startsWith("crafting")) return "crafting";
        if (type.startsWith("smithing")) return "smithing";
        return type as RecipeType;
    }

    private getRecipeOutput(recipe: Recipe): string {
        return recipe.result.item;
    }

    private createEmptyRecipeGroup(): RecipeGroup {
        return Object.values(RECIPE_TYPES).reduce((acc, type) => {
            acc[type] = [];
            return acc;
        }, {} as RecipeGroup);
    }

    private groupByType(): RecipeGroup {
        return this.recipes.reduce((acc, recipe) => {
            const normalizedType = this.normalizeRecipeType(recipe.data.type);
            acc[normalizedType] = acc[normalizedType] || [];
            acc[normalizedType].push(recipe);
            return acc;
        }, this.createEmptyRecipeGroup());
    }

    private groupByOutput(recipes: DataDrivenRegistryElement<Recipe>[]): RecipeOutput {
        return recipes.reduce((acc, recipe) => {
            const output = this.getRecipeOutput(recipe.data);
            acc[output] = acc[output] || [];
            acc[output].push(recipe);
            return acc;
        }, {} as RecipeOutput);
    }

    public groupRecipes(): Record<RecipeType, RecipeOutput> {
        const byType = this.groupByType();

        return Object.entries(byType).reduce(
            (acc, [type, recipes]) => {
                acc[type as RecipeType] = this.groupByOutput(recipes);
                return acc;
            },
            {} as Record<RecipeType, RecipeOutput>
        );
    }
}

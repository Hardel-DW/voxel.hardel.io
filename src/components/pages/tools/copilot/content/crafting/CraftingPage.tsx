import { getElementByRegistry } from "@/components/pages/tools/copilot/store/DatapackStore";
import { useCopilotStore } from "@/components/pages/tools/copilot/store/DatapackStore";
import type { RecipeOfEnum } from "@/components/pages/tools/copilot/store/data/recipe";
import { RECIPES } from "@/components/pages/tools/copilot/store/data/recipe";
import type { Recipe } from "@/lib/minecraft/core/recipe/Recipe";
import { RecipeComparator } from "@/lib/minecraft/core/recipe/RecipeComparator";
import { useState } from "react";
import HeaderBar from "./HeaderBar";
import RecipeTypeSection from "./RecipeTypeSection";

export default function CraftingPage() {
    const [recipeType, setRecipeType] = useState<RecipeOfEnum>(RECIPES[0]);
    const elements = useCopilotStore((state) => getElementByRegistry<Recipe>(state, "recipe"));
    const recipeComparator = new RecipeComparator(elements).groupRecipes();
    console.log(recipeComparator);

    return (
        <div className="relative mt-4">
            <HeaderBar recipeType={recipeType} setRecipeType={setRecipeType} />
            <hr />
            <div className="flex flex-col gap-4">
                {Object.entries(recipeComparator).map(([key, recipes]) => (
                    <RecipeTypeSection key={key} recipeType={key} recipes={recipes} />
                ))}
            </div>
        </div>
    );
}

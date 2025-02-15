import type { RecipeOutput } from "@/lib/minecraft/core/recipe/RecipeComparator";
import RecipeItem from "./RecipeItem";
export default function RecipeTypeSection(props: {
    recipeType: string;
    recipes: RecipeOutput;
}) {
    if (Object.keys(props.recipes).length === 0) return null;

    return (
        <div>
            <h2 className="text-lg font-bold">{props.recipeType}</h2>
            <div className="flex flex-wrap gap-2">
                {Object.entries(props.recipes).map(([key, recipe]) => (
                    <RecipeItem key={key} recipe={recipe} />
                ))}
            </div>
        </div>
    );
}

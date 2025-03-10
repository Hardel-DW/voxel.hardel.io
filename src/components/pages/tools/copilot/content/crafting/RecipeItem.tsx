import TextureRenderer from "@/components/minecraft/TextureRenderer";
import type { Recipe } from "@/lib/minecraft/core/recipe/Recipe";
import type { DataDrivenRegistryElement } from "@voxelio/breeze";
import { Identifier } from "@voxelio/breeze";

export default function RecipeItem(props: { key: string; recipe: DataDrivenRegistryElement<Recipe>[] }) {
    return (
        <div className="flex flex-col gap-2">
            <h2 className="text-lg font-bold">{props.key}</h2>
            <div className="flex flex-wrap gap-2">
                {props.recipe.map((r) => (
                    <div key={new Identifier(r.identifier).toFilePath()} className="border-2 border-zinc-800 rounded-lg p-2">
                        <TextureRenderer id={new Identifier(r.identifier).toString()} />
                    </div>
                ))}
            </div>
        </div>
    );
}

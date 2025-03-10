import TextureRenderer from "@/components/minecraft/TextureRenderer";
import { RECIPES, type RecipeOfEnum } from "@/components/pages/tools/copilot/store/data/recipe";
import { BoxHoveredContent, BoxHoveredTrigger } from "@/components/ui/react/BoxHovered";
import { BoxHovered } from "@/components/ui/react/BoxHovered";
import { cn } from "@/lib/utils";

export default function HeaderBar(props: {
    recipeType: RecipeOfEnum;
    setRecipeType: (recipeType: RecipeOfEnum) => void;
}) {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-8">
                <div className="h-12 flex-1 max-w-96">
                    <input type="text" placeholder="Search" className="w-full h-full rounded-xl border-2 border-zinc-800 p-2" />
                </div>
                <BoxHovered>
                    <BoxHoveredTrigger>
                        <div className="border-2 bg-zinc-950 border-zinc-800 rounded-lg flex items-center justify-center size-16">
                            <TextureRenderer id={props.recipeType.id} />
                        </div>
                    </BoxHoveredTrigger>
                    <BoxHoveredContent className="relative">
                        <div className="absolute inset-0 z-0 hue-rotate-45 starting:opacity-0 transition-all duration-500 brightness-20">
                            <img src="/images/shine.avif" alt="Shine" />
                        </div>
                        <div className="absolute inset-0 z-0 hue-rotate-45 rotate-180 starting:opacity-0 transition-all duration-500 brightness-10">
                            <img src="/images/shine.avif" alt="Shine" />
                        </div>

                        <div className="flex flex-col gap-2 relative z-20">
                            <div className="flex items-center justify-between gap-16">
                                <div className="grid">
                                    <p className="text-lg font-bold">Select Recipe</p>
                                    <span className="text-sm text-zinc-400">{props.recipeType.name}</span>
                                </div>
                                <TextureRenderer id={props.recipeType.id} />
                            </div>
                            <hr />
                            <div className="grid grid-cols-3 gap-2">
                                {RECIPES.map((recipe) => (
                                    <div
                                        onClick={() => props.setRecipeType(recipe)}
                                        key={recipe.id}
                                        className={cn(
                                            "border-2 bg-zinc-950 border-zinc-900 rounded-lg flex items-center justify-center size-16 transition-colors hover:border-zinc-800 hover:bg-zinc-900 cursor-pointer",
                                            props.recipeType === recipe && "border-zinc-800 bg-zinc-900"
                                        )}>
                                        <TextureRenderer id={recipe.id} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </BoxHoveredContent>
                </BoxHovered>
            </div>
        </div>
    );
}

import useLoadedPage from "@/lib/hook/useLoadedPage.ts";
import type { EnchantViewer, SectionViewer } from "@/lib/type/SectionViewer";
import { cn } from "@/lib/utils.ts";
import { useState } from "react";

export default function NeoEnchantmentViewer({
    enchant
}: {
    enchant: SectionViewer[];
}) {
    const [currentCategory, setCurrentCategory] = useState<SectionViewer>(enchant[0]);
    const [currentEnchantment, setCurrentEnchantment] = useState<EnchantViewer>(currentCategory.enchants[0]);
    const isPageLoaded = useLoadedPage();

    const handleChangeSection = (section: SectionViewer) => {
        setCurrentCategory(section);
        setCurrentEnchantment(section.enchants[0]);
    };

    return (
        <div>
            <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-16">
                <div className="flex flex-col gap-8 w-full md:w-1/2">
                    <div>
                        <h3 className="text-3xl font-bold text-white">{currentEnchantment.name}</h3>
                        <small className="text-zinc-400">Max Level: {currentEnchantment.level}</small>
                        {currentEnchantment.addons && (
                            <>
                                <span className="text-zinc-400"> - </span>
                                <a
                                    href="https://modrinth.com/datapack/yggdrasil-structure"
                                    className="text-rose-400 hover:text-rose-500 transition"
                                >
                                    Findable in the Yggdrasil structure
                                </a>
                            </>
                        )}
                        <p className="text-zinc-400 mt-4">{currentEnchantment.description}</p>
                    </div>
                    <hr className="border-t-2 border-zinc-700" />
                    <div className="grid grid-cols-items gap-8">
                        {currentCategory.enchants.map((enchantment) => (
                            <div
                                className={cn("flex flex-col items-center gap-4 cursor-pointer opacity-50 hover:opacity-100 transition", {
                                    "opacity-100 scale-125": enchantment.id === currentEnchantment.id
                                })}
                                onClick={() => setCurrentEnchantment(enchantment)}
                                onKeyDown={() => setCurrentEnchantment(enchantment)}
                                key={enchantment.id}
                            >
                                <div className="size-24 rounded-2xl p-2">
                                    <img src={enchantment.image} alt={enchantment.name} className="size-full pixelated" />
                                </div>
                                <p
                                    className={cn("text-zinc-200 font-semibold mt-2 w-3/4 text-sm text-center", {
                                        "text-rose-700": enchantment.id === currentEnchantment.id
                                    })}
                                >
                                    {enchantment.name}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex items-center w-full md:w-1/2">
                    <div className="aspect-video flex items-center relative w-full">
                        <div className="absolute inset-0 translate-x-4 scale-y-110 border border-zinc-700 rounded-3xl z-20" />
                        {isPageLoaded && currentEnchantment.video ? (
                            <video key={`${currentEnchantment.id}-video`} className="rounded-3xl relative" autoPlay loop muted>
                                <source src={currentEnchantment.video} type="video/webm" />
                                Your browser does not support the video tag.
                            </video>
                        ) : currentEnchantment.thumbnail ? (
                            <img src={currentEnchantment.thumbnail} alt={currentEnchantment.name} className="rounded-3xl relative" />
                        ) : (
                            <img
                                src="/images/background/tools/unknow.webp"
                                alt={currentEnchantment.name}
                                className="rounded-3xl relative"
                            />
                        )}
                    </div>
                </div>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 pt-24">
                {enchant.map((item) => (
                    <div
                        className={cn(
                            "flex items-center justify-evenly gap-4 px-8 py-2 border-zinc-700 border bg-gradient-to-r from-transparent to-zinc-800/50 opacity-70 hover:opacity-100 hover:to-rose-950/50 transition cursor-pointer rounded-2xl relative",
                            {
                                "opacity-100 to-rose-950/50": item.id === currentCategory.id
                            }
                        )}
                        key={item.id}
                        onClick={() => handleChangeSection(item)}
                        onKeyDown={() => handleChangeSection(item)}
                    >
                        <div className="size-24 rounded-2xl p-4 relative z-20 flex items-center justify-center">
                            <img src={item.image} alt={item.short} className="h-full pixelated" />
                        </div>
                        <p className="text-zinc-300 uppercase text-2xl font-extralight tracking-[0.2rem]">{item.short}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

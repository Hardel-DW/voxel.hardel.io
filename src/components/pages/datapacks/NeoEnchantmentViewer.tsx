import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/shadcn/select.tsx";
import useLoadedPage from "@/lib/hook/useLoadedPage.ts";
import type { EnchantViewer, SectionViewer } from "@/lib/type/SectionViewer";
import { cn } from "@/lib/utils.ts";
import React, { useState } from "react";

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
        <div className="flex flex-col-reverse md:flex-col gap-8">
            <div className="flex flex-row justify-between items-start min-h-32 w-full">
                <div className="flex flex-col flex-1">
                    <h3 className="text-3xl font-bold text-white">{currentEnchantment.name}</h3>
                    <div>
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
                    </div>
                    <p className="text-zinc-400 mt-4 w-3/4">{currentEnchantment.description}</p>
                </div>

                <div className="hidden self-center md:grid grid-cols-2 xl:grid-cols-4 gap-4">
                    {enchant.map((item) => (
                        <div
                            className={cn("transition-all duration-500 opacity-50 hover:opacity-100 cursor-pointer rounded-2xl", {
                                "opacity-100": item.id === currentCategory.id
                            })}
                            key={item.id}
                            onClick={() => handleChangeSection(item)}
                            onKeyDown={() => handleChangeSection(item)}
                        >
                            <div className="size-20 p-4 relative z-20 flex items-center justify-center">
                                <img src={item.image} alt={item.short} className="h-full pixelated" />
                                {item.id === currentCategory.id && (
                                    <div className="absolute opacity-50 scale-125 inset-0">
                                        <img src="/images/border.webp" alt="star" />
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="w-full flex items-center gap-x-4">
                <div className="h-px flex-1 bg-gradient-to-l from-zinc-700 to-transparent" />
                <img src="/icons/star.svg" alt="star" className="size-6 invert" />
                <div className="h-px flex-1 bg-gradient-to-r from-zinc-700 to-transparent" />
            </div>

            <div className="flex flex-col md:flex-row gap-16 h-fit md:h-[480px] w-full pt-4">
                <div className="aspect-video md:self-start relative w-full md:w-1/2">
                    <div className="absolute inset-0 translate-x-4 scale-y-110 border border-zinc-700 rounded-3xl -z-10" />
                    {isPageLoaded && currentEnchantment.video ? (
                        <video
                            key={`${currentEnchantment.id}-video`}
                            className="rounded-3xl w-full h-full object-cover"
                            autoPlay
                            loop
                            muted
                        >
                            <source src={currentEnchantment.video} type="video/webm" />
                            Your browser does not support the video tag.
                        </video>
                    ) : currentEnchantment.thumbnail ? (
                        <img
                            src={currentEnchantment.thumbnail}
                            alt={currentEnchantment.name}
                            className="rounded-3xl w-full h-full object-cover"
                        />
                    ) : (
                        <img
                            src="/images/background/tools/unknow.webp"
                            alt={currentEnchantment.name}
                            className="rounded-3xl w-full h-full object-cover"
                        />
                    )}
                </div>

                {/* Mobile */}
                <div className="md:hidden flex z-20">
                    <Select
                        onValueChange={(value: string) => {
                            const selectedEnchant = enchant.flatMap((item) => item.enchants).find((e) => e.id === value);
                            if (selectedEnchant) {
                                setCurrentEnchantment(selectedEnchant);
                                setCurrentCategory(enchant.find((item) => item.enchants.includes(selectedEnchant)) || enchant[0]);
                            }
                        }}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select an Enchant" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {enchant.map((item) => (
                                    <React.Fragment key={`${item.id}-group`}>
                                        <SelectLabel>{item.short}</SelectLabel>
                                        {item.enchants.map((enchantment) => (
                                            <SelectItem key={`${enchantment.id}-${item.id}`} value={enchantment.id}>
                                                {enchantment.name}
                                            </SelectItem>
                                        ))}
                                    </React.Fragment>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                {/* Desktop */}
                <div className="hidden md:flex flex-1 max-h-[500px] h-fit overflow-y-auto -translate-y-4">
                    <div className="grid w-full items-start gap-4">
                        {currentCategory.enchants.map((enchantment) => (
                            <div
                                className={cn(
                                    "flex items-center gap-4 py-1 h-12 bg-cover bg-no-repeat bg-center rounded-2xl cursor-pointer opacity-50 hover:opacity-100 transition",
                                    {
                                        "opacity-100": enchantment.id === currentEnchantment.id
                                    }
                                )}
                                style={{
                                    backgroundImage: `url("/images/features/card/star.png")`
                                }}
                                onClick={() => setCurrentEnchantment(enchantment)}
                                onKeyDown={() => setCurrentEnchantment(enchantment)}
                                key={enchantment.id}
                            >
                                <div className="px-8 gap-8 flex items-center w-full">
                                    <div className="size-12 rounded-2xl p-2">
                                        <img src={enchantment.image} alt={enchantment.name} className="size-full pixelated" />
                                    </div>
                                    <p
                                        className={cn("text-zinc-200 font-semibold text-base text-center", {
                                            "text-rose-600": enchantment.id === currentEnchantment.id
                                        })}
                                    >
                                        {enchantment.name}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

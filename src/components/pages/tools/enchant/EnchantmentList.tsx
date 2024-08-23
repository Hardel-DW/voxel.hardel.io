import { useTranslate } from "@/components/TranslateContext.tsx";
import DownloadButton from "@/components/pages/tools/enchant/DownloadButton.tsx";
import { EnchantmentItem } from "@/components/pages/tools/enchant/EnchantmentItem.tsx";
import { useEnchantments } from "@/components/pages/tools/enchant/EnchantmentsContext.tsx";
import { cn } from "@/lib/utils.ts";
import { useState } from "react";

export default function EnchantmentList() {
    const [width, setWidth] = useState(350);
    const { enchantments } = useEnchantments();
    const { translate } = useTranslate();
    if (enchantments.length === 0) return null;

    const handleWidth = () => {
        setWidth(width === 350 ? 0 : 350);
    };

    return (
        <>
            <div
                style={{ width: width }}
                className={cn("flex-shrink-0 overflow-hidden container-type transition-[width] ease-in-out xl:py-4", {
                    "pl-4": width > 0
                })}
            >
                <div style={{ width: "350px" }} className="flex flex-col h-full z-10 px-4 md:pl-0 md:pt-0 pt-4">
                    <div className="overflow-hidden -mr-2 pr-2" style={{ flex: 1 }}>
                        <div className="relative size-full px-2 border-zinc-800 border-t border-l bg-header-translucent rounded-2xl shadow-black">
                            <div className="overflow-y-auto mt-2" style={{ flex: 1, height: "calc(100% - 12px)" }}>
                                <div className="flex flex-col gap-x-8 px-2 justify-between">
                                    <h2 className="text-2xl font-semibold">{translate["tools.enchantments.sidebar.title"]}</h2>
                                    <div className="h-1 w-full bg-zinc-800 rounded-full" />
                                </div>
                                <div className="grid gap-1 pt-4 pb-2 px-px">
                                    {enchantments
                                        .sort((a, b) =>
                                            (a.identifier.getResource().split("/").pop() ?? "").localeCompare(
                                                b.identifier.getResource().split("/").pop() ?? ""
                                            )
                                        )
                                        .map((element) => (
                                            <EnchantmentItem key={element.identifier.getResource()} element={element.identifier} />
                                        ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="fixed p-4 bottom-0 right-0 flex flex-col gap-4">
                <DownloadButton />

                <button
                    type="button"
                    onClick={handleWidth}
                    onKeyDown={handleWidth}
                    className="bg-header-cloudy text-white p-2 size-12 rounded-xl border-zinc-700 border-t border-l"
                >
                    {width === 350 ? "<<" : ">>"}
                </button>
            </div>
        </>
    );
}

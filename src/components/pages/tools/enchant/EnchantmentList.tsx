import { useTranslate } from "@/components/TranslateContext.tsx";
import DownloadButton from "@/components/pages/tools/enchant/DownloadButton.tsx";
import { EnchantmentItem } from "@/components/pages/tools/enchant/EnchantmentItem.tsx";
import { useEnchantments } from "@/components/pages/tools/enchant/EnchantmentsContext.tsx";
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
            <div style={{ width: width }} className="flex-shrink-0 overflow-hidden container-type transition-[width] ease-in-out xl:py-4">
                <div style={{ width: "350px" }} className="flex flex-col h-full relative z-10 px-4 md:pl-0 pt-4">
                    <div
                        className="border-zinc-800 border-t border-l bg-header-translucent px-4 rounded-2xl shadow-black overflow-hidden -mr-2 pr-2"
                        style={{ flex: 1 }}
                    >
                        <div className="size-full px-2">
                            <div className="overflow-y-auto pr-2 -mr-2 my-2" style={{ flex: 1, height: "calc(100% - 64px)" }}>
                                <div className="flex gap-x-8 pt-2 justify-between items-center border-b border-zinc-700">
                                    <h2 className="text-2xl font-semibold">{translate["tools.enchantments.sidebar.title"]}</h2>
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

                    <div className="absolute bottom-0 pl-2 pr-4 pb-2 w-full">
                        <DownloadButton />
                    </div>
                </div>
            </div>

            <div className="fixed p-4 bottom-0 right-0">
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

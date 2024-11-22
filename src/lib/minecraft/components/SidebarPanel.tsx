import { useTranslate } from "@/components/TranslateContext.tsx";
import { useConfigurator } from "@/lib/minecraft/components/ConfiguratorContext.tsx";
import DebugConfigurator from "@/lib/minecraft/components/DebugConfigurator.tsx";
import DownloadButton from "@/lib/minecraft/components/DownloadButton.tsx";
import { SidebarItem } from "@/lib/minecraft/components/SidebarItem.tsx";
import SettingsButton from "@/lib/minecraft/components/elements/SettingsButton.tsx";
import { Identifier } from "@/lib/minecraft/core/Identifier.ts";
import type { Analysers, GetAnalyserVoxel } from "@/lib/minecraft/core/engine/Analyser.ts";
import { cn } from "@/lib/utils.ts";
import { useState } from "react";

export default function SidebarPanel<T extends keyof Analysers>() {
    const [width, setWidth] = useState(350);
    const { translate } = useTranslate();
    const { elements } = useConfigurator<GetAnalyserVoxel<T>>();

    if (elements.length === 0) return null;

    return (
        <>
            <div
                style={{ width: width }}
                className={cn("shrink-0 overflow-hidden container-type transition-[width] ease-in-out xl:py-4", {
                    "pl-4": width > 0
                })}
            >
                <div style={{ width: "350px" }} className="flex flex-col h-full z-10 px-4 md:pl-0 md:pt-0 pt-4">
                    <div className="overflow-hidden -mr-2 pr-2" style={{ flex: 1 }}>
                        <div className="relative size-full px-2 border-zinc-800 border-t border-l bg-header-translucent rounded-2xl shadow-black">
                            <div className="overflow-y-auto mt-2" style={{ flex: 1, height: "calc(100% - 56px)" }}>
                                <div className="flex flex-col gap-x-8 px-2 justify-between">
                                    <div className="flex justify-between items-center">
                                        <h2 className="text-2xl font-semibold">{translate["tools.enchantments.sidebar.title"]}</h2>
                                        <DebugConfigurator />
                                    </div>
                                    <div className="h-1 w-full bg-zinc-800 rounded-full" />
                                </div>
                                <div className="grid gap-1 pt-4 pb-2 px-px">
                                    {Identifier.sortRegistry(elements).map((element) => (
                                        <SidebarItem key={element.identifier.getResource()} element={element} />
                                    ))}
                                </div>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 px-2 pb-2 flex items-center gap-2">
                                <DownloadButton />
                                <SettingsButton />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="fixed p-4 bottom-0 right-0 flex flex-col gap-4">
                <button
                    type="button"
                    onClick={() => setWidth(width === 350 ? 0 : 350)}
                    className="bg-header-cloudy text-white p-2 size-12 rounded-xl border-zinc-700 border-t border-l"
                >
                    {width === 350 ? "<<" : ">>"}
                </button>
            </div>
        </>
    );
}

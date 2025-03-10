import DownloadButton from "@/components/tools/DownloadButton.tsx";
import { useConfiguratorStore } from "@/components/tools/Store";
import DebugConfigurator from "@/components/tools/debug/DebugConfigurator";
import SettingsButton from "@/components/tools/sidebar/SettingsButton";
import { SidebarContainer } from "@/components/tools/sidebar/SidebarContainer";
import { useTranslate } from "@/lib/hook/useTranslate";
import { useRef } from "react";

export default function SidebarPanel() {
    const isHiddenRef = useRef<boolean>(false);
    const panelRef = useRef<HTMLDivElement>(null);

    const { t } = useTranslate();
    const hasElements = useConfiguratorStore((state) => state.elements.size > 0);
    if (!hasElements) return null;

    return (
        <>
            <div
                ref={panelRef}
                className="shrink-0 overflow-hidden container-type transition-[width] ease-in-out xl:py-4 pl-4 w-64 xl:w-87.5 in-has-data-hidden:w-0 in-has-data-hidden:pl-0">
                <div className="flex flex-col h-full z-10 px-4 md:pl-0 md:pt-0 pt-4 w-64 xl:w-87.5 in-has-data-hidden:w-0">
                    <div className="overflow-hidden -mr-2 pr-2" style={{ flex: 1 }}>
                        <div className="relative size-full px-2 border-zinc-800 border-t border-l bg-header-translucent rounded-2xl shadow-black">
                            <div className="overflow-y-auto mt-2" style={{ flex: 1, height: "calc(100% - 56px)" }}>
                                <div className="flex flex-col gap-x-8 px-2 justify-between">
                                    <div className="flex justify-between items-center">
                                        <h2 className="text-2xl font-semibold">{t("tools.enchantments.sidebar.title")}</h2>
                                        <DebugConfigurator />
                                    </div>
                                    <div className="h-1 w-full bg-zinc-800 rounded-full" />
                                </div>
                                <div className="grid gap-1 pt-4 pb-2 px-px">
                                    <SidebarContainer />
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

            <div className="fixed z-100 p-4 bottom-0 right-0 flex flex-col gap-4 cursor-pointer">
                <button
                    type="button"
                    onClick={() => {
                        isHiddenRef.current = !isHiddenRef.current;
                        if (panelRef.current) {
                            panelRef.current.toggleAttribute("data-hidden", isHiddenRef.current);
                        }
                    }}
                    className="bg-header-cloudy text-white p-2 size-12 rounded-xl border-zinc-700 border-t border-l cursor-pointer">
                    <img src="/icons/menu.svg" alt="Sidebar Arrow" className="size-6 invert" />
                </button>
            </div>
        </>
    );
}

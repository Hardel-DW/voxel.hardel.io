import { TabsList, TabsTrigger } from "@/components/ui/shadcn/tabs.tsx";
import { useConfiguratorStore } from "@/lib/minecraft/core/engine/Store";
import { resolve } from "@/lib/minecraft/core/engine/renderer/resolve_field";
import translate from "@/lib/minecraft/i18n/translate";
import { Tabs } from "@radix-ui/react-tabs";
import type React from "react";
import ConfiguratorContent from "./ConfiguratorContent";

export default function ConfiguratorPanel(props: {
    children?: React.ReactNode;
    defaultTab: string;
}) {
    const hasElements = useConfiguratorStore((state) => state.elements.size > 0);
    const configuration = useConfiguratorStore((state) => state.configuration);
    const toggleSection = useConfiguratorStore((state) => state.toggleSection);
    if (!hasElements || !configuration || !toggleSection) return null;

    const resolvedInterface = resolve(configuration.interface, toggleSection);

    return (
        <>
            <div className="absolute w-full -z-10 inset-0 shadow-2xl bg-linear-to-r from-[#401727] to-[#311e7696] opacity-20 rounded-full blur-[10rem]" />
            {props.children}
            <div className="border-zinc-800 border-t border-l bg-header-translucent rounded-2xl shadow-black p-4 sm:p-8">
                <Tabs defaultValue={props.defaultTab}>
                    <TabsList className="bg-inherit overflow-x-auto h-[inherit] border-0 mb-4 pb-4 flex justify-start gap-x-10 border-b-2 rounded-none border-zinc-800">
                        {resolvedInterface.map((section) => (
                            <TabsTrigger
                                key={section.id}
                                className="text-md transition-none py-2 bg-transparent border-0 data-[state=active]:bg-rose-900 data-[state=active]:text-white"
                                disabled={section.soon}
                                value={section.id}>
                                {translate(section.section)}
                                {section.soon && <span className="text-xs text-zinc-400 font-light ml-1">(soon)</span>}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {resolvedInterface.map((section) => (
                        <ConfiguratorContent key={section.id} section={section} />
                    ))}
                </Tabs>
            </div>
        </>
    );
}

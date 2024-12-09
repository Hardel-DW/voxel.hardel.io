import { useConfigurator } from "@/components/tools/ConfiguratorContext.tsx";
import { RenderComponent } from "@/components/tools/RenderComponent.tsx";
import { TabsList, TabsTrigger } from "@/components/ui/shadcn/tabs.tsx";
import type { Analysers, GetAnalyserVoxel } from "@/lib/minecraft/core/engine/Analyser.ts";
import { cn } from "@/lib/utils.ts";
import { Tabs, TabsContent } from "@radix-ui/react-tabs";
import type React from "react";
import TranslateText from "./elements/text/TranslateText";

export default function ConfiguratorPanel<T extends keyof Analysers>(props: {
    children?: React.ReactNode;
    defaultTab: string;
}) {
    const { currentElement, elements, configuration } = useConfigurator<GetAnalyserVoxel<T>>();
    if (elements.length === 0) return null;
    if (!currentElement || !configuration) return null;

    return (
        <>
            <div className="absolute w-full -z-10 inset-0 shadow-2xl bg-linear-to-r from-[#401727] to-[#311e7696] opacity-20 rounded-full blur-[10rem]" />
            {props.children}
            <div className="border-zinc-800 border-t border-l bg-header-translucent rounded-2xl shadow-black p-4 sm:p-8">
                <Tabs defaultValue={props.defaultTab}>
                    <TabsList className="bg-inherit overflow-x-auto h-[inherit] border-0 mb-4 pb-4 flex justify-start gap-x-10 border-b-2 rounded-none border-zinc-800">
                        {configuration.interface.map((section, index) => (
                            <TabsTrigger
                                key={section.id}
                                className={cn(
                                    "text-md transition-none py-2 bg-transparent border-0 data-[state=active]:bg-rose-900 data-[state=active]:text-white",
                                    {
                                        "text-zinc-500": currentElement?.identifier?.getNamespace() === "minecraft" && index > 2
                                    }
                                )}
                                disabled={section.soon}
                                value={section.id}>
                                <TranslateText content={section.section} />
                                {section.soon && <span className="text-xs text-zinc-400 font-light ml-1">(soon)</span>}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {configuration.interface.map((section) => (
                        <TabsContent key={section.id} value={section.id}>
                            {currentElement?.identifier?.getNamespace() === "minecraft" && (
                                <div className="text-xs text-zinc-400 font-light mb-4">
                                    <TranslateText
                                        content={{
                                            type: "translate",
                                            value: "tools.enchantments.vanilla"
                                        }}
                                    />
                                </div>
                            )}

                            <div className="flex items flex-col gap-4">
                                {section.components.map((component, index) => (
                                    <RenderComponent key={index.toString()} component={component} />
                                ))}
                            </div>
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
        </>
    );
}

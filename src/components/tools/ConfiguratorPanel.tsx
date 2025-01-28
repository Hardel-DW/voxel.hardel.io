import { RenderComponent } from "@/components/tools/RenderComponent.tsx";
import { TabsList, TabsTrigger } from "@/components/ui/shadcn/tabs.tsx";
import { resolve } from "@/lib/minecraft/core/engine/renderer/resolve_field";
import type { FormComponent } from "@/lib/minecraft/core/schema/primitive/component";
import translate from "@/lib/minecraft/i18n/translate";
import { useConfiguratorStore } from "@/lib/store/configuratorStore";
import { cn } from "@/lib/utils.ts";
import { Tabs, TabsContent } from "@radix-ui/react-tabs";
import type React from "react";

export default function ConfiguratorPanel(props: {
    children?: React.ReactNode;
    defaultTab: string;
}) {
    const store = useConfiguratorStore();
    if (store.elements.length === 0) return null;
    const currentElement = store.getCurrentElement();

    if (!currentElement || !store.configuration || !store.toggleSection) return null;
    const resolvedInterface = resolve(store.configuration.interface, store.toggleSection);

    return (
        <>
            <div className="absolute w-full -z-10 inset-0 shadow-2xl bg-linear-to-r from-[#401727] to-[#311e7696] opacity-20 rounded-full blur-[10rem]" />
            {props.children}
            <div className="border-zinc-800 border-t border-l bg-header-translucent rounded-2xl shadow-black p-4 sm:p-8">
                <Tabs defaultValue={props.defaultTab}>
                    <TabsList className="bg-inherit overflow-x-auto h-[inherit] border-0 mb-4 pb-4 flex justify-start gap-x-10 border-b-2 rounded-none border-zinc-800">
                        {resolvedInterface.map((section, index) => (
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
                                {translate(section.section)}
                                {section.soon && <span className="text-xs text-zinc-400 font-light ml-1">(soon)</span>}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {resolvedInterface.map((section) => (
                        <TabsContent key={section.id} value={section.id}>
                            {currentElement?.identifier?.getNamespace() === "minecraft" && (
                                <div className="text-xs text-zinc-400 text-center font-light mb-4">
                                    {translate({ type: "translate", value: "tools.enchantments.vanilla" })}
                                </div>
                            )}

                            <div className="flex items flex-col gap-4">
                                {section.components.map((component: FormComponent, index) => (
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

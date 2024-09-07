import { useTranslate } from "@/components/TranslateContext.tsx";
import { useConfigurator } from "@/components/pages/tools/ConfiguratorContext.tsx";
import { RenderComponent } from "@/components/pages/tools/RenderComponent.tsx";
import { formConfigurations } from "@/components/pages/tools/enchant/Config.ts";
import { TabsList, TabsTrigger } from "@/components/ui/tabs.tsx";
import ToolSection from "@/components/ui/tools/ToolSection.tsx";
import { cn } from "@/lib/utils.ts";
import { Tabs, TabsContent } from "@radix-ui/react-tabs";
import type React from "react";

export default function ConfiguratorPanel<T>({
    children
}: {
    children?: React.ReactNode;
}) {
    const { currentElement, elements } = useConfigurator<T>();
    const { translate } = useTranslate();

    if (elements.length === 0) return null;
    if (!currentElement) return null;

    return (
        <>
            {children}
            <div className="border-zinc-800 border-t border-l bg-header-translucent rounded-2xl shadow-black p-4 sm:p-8">
                <Tabs defaultValue="global">
                    <TabsList className="bg-inherit overflow-x-auto h-[inherit] border-inherit border-0 mb-4 pb-4 flex justify-start gap-x-10 border-b-2 rounded-none border-zinc-800">
                        {formConfigurations.map((section, index) => (
                            <TabsTrigger
                                key={section.id}
                                className={cn(
                                    "text-md transition-none py-2 data-[state=active]:bg-rose-900 data-[state=active]:text-white",
                                    {
                                        "text-zinc-500": currentElement?.identifier?.getNamespace() === "minecraft" && index > 2
                                    }
                                )}
                                disabled={currentElement?.identifier?.getNamespace() === "minecraft" && index > 2}
                                value={section.id}
                            >
                                {translate[section.section]}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {formConfigurations.map((section) => (
                        <TabsContent key={section.id} value={section.id}>
                            {currentElement?.identifier?.getNamespace() === "minecraft" && (
                                <div className="text-xs text-zinc-400 font-light mb-4">{translate["tools.enchantments.vanilla"]}</div>
                            )}

                            <ToolSection
                                toggle={section.toggle}
                                id={section.id}
                                key={section.section}
                                title={translate[section.description]}
                            >
                                {section.components.map((component, index) => (
                                    <RenderComponent sectionId={section.id} key={index.toString()} component={component} />
                                ))}
                            </ToolSection>
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
        </>
    );
}

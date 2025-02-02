import { getCurrentElement, useConfiguratorStore } from "@/lib/minecraft/core/engine/Store";
import type { InterfaceConfiguration } from "@/lib/minecraft/core/schema/primitive";
import translate from "@/lib/minecraft/i18n/translate";
import { TabsContent } from "@radix-ui/react-tabs";
import { RenderComponent } from "./RenderComponent";

export default function ConfiguratorContent(props: { section: InterfaceConfiguration }) {
    const currentNamespace = useConfiguratorStore((state) => getCurrentElement(state)?.identifier.namespace);

    return (
        <TabsContent key={props.section.id} value={props.section.id}>
            {currentNamespace === "minecraft" && (
                <div className="text-xs text-zinc-400 text-center font-light mb-4">
                    {translate({ type: "translate", value: "tools.enchantments.vanilla" })}
                </div>
            )}

            <div className="flex items flex-col gap-4 relative">
                {props.section.disabled && (
                    <div className="absolute inset-0 bg-black/10 backdrop-blur-sm flex flex-col items-center justify-center gap-4">
                        <img src="/icons/tools/lock.svg" alt="Lock" className="w-48 h-48 invert-50" />
                        <div className="text-2xl text-zinc-400 text-center font-light mb-4">Temporarily disabled - Come back soon!</div>
                    </div>
                )}

                {props.section.components.map((component, index) => (
                    <RenderComponent key={index.toString()} component={component} />
                ))}
            </div>
        </TabsContent>
    );
}

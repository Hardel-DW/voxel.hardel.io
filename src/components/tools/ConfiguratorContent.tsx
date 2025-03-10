import { getCurrentElement, useConfiguratorStore } from "@/components/tools/Store";
import { MenuTabsContent } from "@/components/ui/react/MenuTabs";
import { translate } from "@/lib/hook/useTranslate";
import type { InterfaceConfiguration } from "@voxelio/breeze/core";
import { RenderComponent } from "./RenderComponent";

export default function ConfiguratorContent(props: { section: InterfaceConfiguration }) {
    const currentNamespace = useConfiguratorStore((state) => getCurrentElement(state)?.identifier.namespace);

    return (
        <MenuTabsContent value={props.section.id}>
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
        </MenuTabsContent>
    );
}

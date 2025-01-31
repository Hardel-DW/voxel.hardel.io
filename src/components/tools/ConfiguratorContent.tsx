import type { InterfaceConfiguration } from "@/lib/minecraft/core/schema/primitive";
import translate from "@/lib/minecraft/i18n/translate";
import { useConfiguratorStore } from "@/lib/store/configuratorStore";
import { TabsContent } from "@radix-ui/react-tabs";
import { RenderComponent } from "./RenderComponent";

export default function ConfiguratorContent(props: { section: InterfaceConfiguration }) {
    const currentNamespace = useConfiguratorStore((state) => state.currentElement?.identifier.namespace);

    return (
        <TabsContent key={props.section.id} value={props.section.id}>
            {currentNamespace === "minecraft" && (
                <div className="text-xs text-zinc-400 text-center font-light mb-4">
                    {translate({ type: "translate", value: "tools.enchantments.vanilla" })}
                </div>
            )}

            <div className="flex items flex-col gap-4">
                {props.section.components.map((component, index) => (
                    <RenderComponent key={index.toString()} component={component} />
                ))}
            </div>
        </TabsContent>
    );
}

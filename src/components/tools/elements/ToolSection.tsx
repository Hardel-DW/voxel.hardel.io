import Button from "@/components/ui/react/Button.tsx";
import type { ToolSectionType } from "@/lib/minecraft/core/schema/primitive/component";
import translate from "@/lib/minecraft/i18n/translate";
import { useConfiguratorStore } from "@/lib/store/configuratorStore";
import { cn } from "@/lib/utils.ts";
import { RenderComponent } from "@/components/tools/RenderComponent";

export default function ToolSection({
    component
}: {
    component: ToolSectionType;
}) {
    const toggleSection = useConfiguratorStore((state) => state.toggleSection);
    const changeToggleValue = useConfiguratorStore((state) => state.changeToggleValue);

    return (
        <div className="not-first:mt-8">
            <div className="bg-black/50 p-4 flex flex-col ring-0 transition-all rounded-xl">
                <div className="py-2 px-2 flex justify-between items-center cursor-pointer">
                    <div>
                        <h2 className="text-2xl font-semibold">{translate(component.title)}</h2>
                        {component.toggle?.some((toggle) => toggle.name === toggleSection?.[component.id]?.name) && (
                            <div className="text-xs text-zinc-400 font-light">
                                {translate(
                                    component.toggle?.find((toggle) => toggle.name === toggleSection?.[component.id]?.name)?.description
                                )}
                            </div>
                        )}
                    </div>
                    {component.button && (
                        <Button href={component.button.url} variant="ghost">
                            {translate(component.button.text)}
                        </Button>
                    )}
                    {component.toggle && (
                        <div className="flex gap-x-2 py-2 px-2 items-center rounded-2xl p-1 bg-header-cloudy shrink-0">
                            {component.toggle?.map((element) => (
                                <div
                                    className={cn("px-4 py-2 rounded-xl", {
                                        "bg-rose-900 text-white": toggleSection?.[component.id]?.name === element.name
                                    })}
                                    key={element.name}
                                    onKeyDown={() => changeToggleValue(component.id, element)}
                                    onClick={() => changeToggleValue(component.id, element)}>
                                    <p className="text-sm font-semibold">{translate(element.title)}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="transition-height duration-100 ease-in-out overflow-hidden pb-1 px-1">
                    <div className="pt-4 gap-4 flex items flex-col">
                        {component.children.map((child, index) => (
                            <RenderComponent key={component.id + index.toString()} component={child} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

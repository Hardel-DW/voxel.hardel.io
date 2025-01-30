import Tabs from "@/components/ui/react/Tabs";
import type { ToolSelectorType } from "@/lib/minecraft/core/schema/primitive/component";
import translate from "@/lib/minecraft/i18n/translate";
import { useConfiguratorStore } from "@/lib/store/configuratorStore";
import { useElementLocks, useElementValue } from "@/lib/store/hooks";

export default function ToolSelector({
    component
}: {
    component: ToolSelectorType;
}) {
    const value = useElementValue<string>(component.renderer);
    if (value === null) return null;

    const { isLocked, text: lockText } = useElementLocks(component.lock);

    const handleChange = useConfiguratorStore((state) => state.handleChange);
    const currentElementId = useConfiguratorStore((state) => state.currentElementId);

    const list = component.options.map((option) => ({
        label: translate(option.label) || "",
        value: option.value
    }));

    return (
        <div className="flex justify-between items-center py-2 px-1">
            <div className="flex flex-col">
                <div className="flex items-center gap-2">
                    <span className="text-white line-clamp-1">{translate(component.title)}</span>
                </div>
                {isLocked ? (
                    <span className="text-xs text-zinc-400 font-light line-clamp-2">{translate(lockText)}</span>
                ) : (
                    <span className="text-xs text-zinc-400 font-light line-clamp-2">{translate(component.description)}</span>
                )}
            </div>

            <Tabs
                tabs={list}
                defaultTab={value}
                onChange={(option) => handleChange(component.action, currentElementId, option)}
                disabled={isLocked}
            />
        </div>
    );
}

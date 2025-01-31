import Tabs from "@/components/ui/react/Tabs";
import type { ToolSelectorType } from "@/lib/minecraft/core/schema/primitive/component";
import translate from "@/lib/minecraft/i18n/translate";
import type { InteractiveComponentProps } from "./InteractiveComponent";

export default function ToolSelector({ component, interactiveProps }: InteractiveComponentProps<string, ToolSelectorType>) {
    const { value, lock, handleChange } = interactiveProps;

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
                {lock.isLocked ? (
                    <span className="text-xs text-zinc-400 font-light line-clamp-2">{translate(lock.text)}</span>
                ) : (
                    <span className="text-xs text-zinc-400 font-light line-clamp-2">{translate(component.description)}</span>
                )}
            </div>

            <Tabs tabs={list} defaultTab={value} onChange={(option) => handleChange(option)} disabled={lock.isLocked} />
        </div>
    );
}

import type { ToolSwitchSlotType } from "@/lib/minecraft/core/schema/primitive/component";
import translate from "@/lib/minecraft/i18n/translate";
import { useConfiguratorStore } from "@/lib/store/configuratorStore";
import { useElementLocks, useElementValue } from "@/lib/store/hooks";
import { cn } from "@/lib/utils";

export default function ToolSwitchSlot({
    component
}: {
    component: ToolSwitchSlotType;
}) {
    const value = useElementValue(component.renderer);
    if (value === null) return null;

    const { isLocked, text: lockText } = useElementLocks(component.lock);

    const handleChange = useConfiguratorStore((state) => state.handleChange);
    const currentElementId = useConfiguratorStore((state) => state.currentElementId);

    const handleClick = () => {
        if (isLocked) return;
        handleChange(component.action, currentElementId, !value);
    };

    return (
        <div
            className={cn(
                "bg-blue-50/5 ring-0 ring-zinc-700 transition-all hover:ring-1 px-6 py-4 rounded-xl cursor-pointer",
                { "ring-1 ring-rose-900": value },
                { "opacity-50 ring-1 ring-rose-950": isLocked }
            )}
            onClick={handleClick}
            onKeyDown={handleClick}>
            <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-4">
                    {component.image && (
                        <div className="shrink-0">
                            <img src={component.image} alt="" className="w-8 h-8 object-contain pixelated" />
                        </div>
                    )}
                    <div className="flex flex-col">
                        <span className="text-white line-clamp-1">{translate(component.title)}</span>
                        <span className="text-xs text-zinc-400 font-light line-clamp-2">{translate(component.description)}</span>
                    </div>
                </div>

                <div className="flex gap-4">
                    {isLocked && <span className="text-xs text-zinc-400 font-light w-max flex items-center">{translate(lockText)}</span>}
                    {(value || isLocked) && <img src="/icons/check.svg" alt="checkbox" className="w-6 h-6 invert" />}
                </div>
            </div>
        </div>
    );
}

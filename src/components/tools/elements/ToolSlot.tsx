import type { Analysers } from "@/lib/minecraft/core/engine/Analyser";
import type { ToolSlotType } from "@/lib/minecraft/core/schema/primitive/component";
import translate from "@/lib/minecraft/i18n/translate";
import { getKey } from "@/lib/minecraft/i18n/translations";
import { useConfiguratorStore } from "@/lib/store/configuratorStore";
import { useElementLocks, useElementValue } from "@/lib/store/hooks";
import { cn } from "@/lib/utils";

export default function ToolSlot<T extends keyof Analysers>({
    component
}: {
    component: ToolSlotType;
}) {
    const value = useElementValue<T, boolean>(component.renderer);
    if (value === null) return null;

    const { isLocked, text: lockText } = useElementLocks<T>(component.lock);

    const handleChange = useConfiguratorStore((state) => state.handleChange);
    const currentElementId = useConfiguratorStore((state) => state.currentElementId);

    const handleClick = () => {
        if (isLocked) return;
        handleChange(component.action, currentElementId, !value);
    };

    return (
        <div
            className={cn(
                "bg-blue-50/5 select-none ring-0 cursor-pointer ring-zinc-700 relative transition-all hover:ring-1 p-6 rounded-xl",
                { "ring-1 ring-rose-900": value },
                { "opacity-50 ring-1 ring-rose-950": isLocked }
            )}
            onClick={handleClick}
            onKeyDown={handleClick}>
            {(value || isLocked) && (
                <div className="absolute p-4 top-0 right-0">
                    <img src="/icons/check.svg" alt="checkbox" className="w-6 h-6 invert" />
                </div>
            )}

            {isLocked && <span className="absolute p-4 bottom-0 right-0 text-xs text-zinc-400 font-light">{translate(lockText)}</span>}

            <div className="flex flex-col items-center justify-between h-full">
                <div className="mb-8 text-center">
                    <h3 className="text-lg font-semibold mb-1">{translate(component.title)}</h3>
                    {component.description && <p className="text-sm text-zinc-400">{translate(component.description)}</p>}
                </div>

                <img
                    src={component.image}
                    alt={getKey(component.title)}
                    className="mb-8 pixelated"
                    style={{
                        height: component.size ? component.size : "64px"
                    }}
                />
            </div>
        </div>
    );
}

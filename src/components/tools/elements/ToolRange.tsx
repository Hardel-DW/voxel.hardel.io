import type { Analysers } from "@/lib/minecraft/core/engine/Analyser";
import type { ToolRangeType } from "@/lib/minecraft/core/schema/primitive/component";
import translate from "@/lib/minecraft/i18n/translate";
import { getKey } from "@/lib/minecraft/i18n/translations";
import { useConfiguratorStore } from "@/lib/store/configuratorStore";
import { useElementLocks, useElementValue } from "@/lib/store/hooks";

export default function ToolRange<T extends keyof Analysers>({
    component
}: {
    component: ToolRangeType;
}) {
    const value = useElementValue<T, number>(component.renderer);
    if (value === null) return null;

    const { isLocked, text: lockText } = useElementLocks<T>(component.lock);

    const handleChange = useConfiguratorStore((state) => state.handleChange);
    const currentElementId = useConfiguratorStore((state) => state.currentElementId);

    return (
        <div className="relative w-full mt-4">
            <div className="flex justify-between items-center w-full">
                {isLocked ? (
                    <span className="text-xs text-zinc-400 font-light line-clamp-2">{translate(lockText)}</span>
                ) : (
                    component.label && (
                        <label htmlFor={getKey(component.label)} className="block line-clamp-1 text-sm font-medium text-zinc-400 mb-1">
                            {translate(component.label)}
                        </label>
                    )
                )}
                <span className="text-sm font-medium text-zinc-400">{value}</span>
            </div>
            <input
                id={getKey(component.label)}
                type="range"
                disabled={isLocked}
                min={component.min}
                max={component.max}
                step={component.step}
                value={value}
                onChange={(e) => handleChange(component.action, currentElementId, +e.target.value)}
                className="w-full text-sm font-normal"
            />
        </div>
    );
}

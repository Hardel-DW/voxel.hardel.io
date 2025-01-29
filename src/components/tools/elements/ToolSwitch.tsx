import type { Analysers } from "@/lib/minecraft/core/engine/Analyser";
import type { ToolSwitchType } from "@/lib/minecraft/core/schema/primitive/component";
import translate from "@/lib/minecraft/i18n/translate";
import { useConfiguratorStore } from "@/lib/store/configuratorStore";
import { useElementLocks, useElementValue } from "@/lib/store/hooks";

export default function ToolSwitch<T extends keyof Analysers>({
    component
}: {
    component: ToolSwitchType;
}) {
    const value = useElementValue<T, boolean>(component.renderer);
    if (value === null) return null;

    const { isLocked, text: lockText } = useElementLocks<T>(component.lock);

    const handleChange = useConfiguratorStore((state) => state.handleChange);
    const currentElementId = useConfiguratorStore((state) => state.currentElementId);

    return (
        <div className="bg-blue-50/5 ring-0 ring-zinc-700 transition-all hover:ring-1 p-6 rounded-xl">
            <label className="flex items-center justify-between w-full">
                <div className="flex flex-col w-3/4">
                    <span className="text-white line-clamp-1">{translate(component.title)}</span>
                    <span className="text-xs text-zinc-400 font-light line-clamp-2">
                        {isLocked ? (
                            <span className="text-xs text-zinc-400 font-light w-max">{translate(lockText)}</span>
                        ) : (
                            translate(component.description)
                        )}
                    </span>
                </div>
                <div className="flex gap-4">
                    <input
                        type="checkbox"
                        name={translate(component.title) || "No name"}
                        disabled={isLocked}
                        checked={value || isLocked}
                        onChange={(e) => handleChange(component.action, currentElementId, e.target.checked)}
                    />
                </div>
            </label>
        </div>
    );
}

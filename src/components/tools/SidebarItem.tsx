import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/shadcn/tooltip.tsx";
import type { Identifier } from "@/lib/minecraft/core/Identifier";
import translate from "@/lib/minecraft/i18n/translate";
import { useConfiguratorStore } from "@/lib/store/configuratorStore";
import { useElementCondition, useElementLocks } from "@/lib/store/hooks";
import { cn } from "@/lib/utils.ts";
import { useRef } from "react";

export function SidebarItem({ elementId }: { elementId: Identifier }) {
    const switchRef = useRef<HTMLDivElement>(null);
    const configuration = useConfiguratorStore((state) => state.configuration);
    const currentElementId = useConfiguratorStore((state) => state.currentElementId);
    const setCurrentElementId = useConfiguratorStore((state) => state.setCurrentElementId);
    const handleChange = useConfiguratorStore((state) => state.handleChange);
    const lockData = useElementLocks(configuration?.sidebar.lock, elementId);
    const conditionResult = useElementCondition(configuration?.sidebar.enabled, elementId);
    const isEnabled = !configuration?.sidebar.enabled ? true : !conditionResult;
    const isSelected = currentElementId ? currentElementId.equals(elementId) : false;

    const handleClick = () => {
        if (switchRef.current?.contains(document.activeElement)) return;
        setCurrentElementId(elementId);
    };

    const handleSwitch = (checked: boolean) => {
        if (!configuration?.sidebar.action) return;
        handleChange(configuration.sidebar.action, elementId, checked);
    };

    return (
        <div
            className={cn("odd:bg-black/75 pl-4 pr-2 py-2 rounded-xl", {
                "ring-1 ring-rose-900": isSelected
            })}>
            <div className="flex items-center justify-between" onClick={handleClick} onKeyDown={handleClick}>
                <div className="break-words">{elementId.renderFilename()}</div>
                <div className="flex items-center gap-8" ref={switchRef}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <label className="flex items-center justify-between gap-4">
                                <input
                                    type="checkbox"
                                    name="enable"
                                    disabled={lockData.isLocked}
                                    checked={isEnabled}
                                    onChange={(e) => handleSwitch(!e.target.checked)}
                                />
                            </label>
                        </TooltipTrigger>
                        <TooltipContent align="end" className="w-64">
                            {lockData.isLocked ? (
                                <span className="text-xs text-zinc-400 font-light w-max">{translate(lockData.text)}</span>
                            ) : (
                                <span className="text-xs text-zinc-400 font-light w-max">
                                    {translate({ type: "translate", value: "tooltip.safe_delete" })}
                                </span>
                            )}
                        </TooltipContent>
                    </Tooltip>
                </div>
            </div>
        </div>
    );
}

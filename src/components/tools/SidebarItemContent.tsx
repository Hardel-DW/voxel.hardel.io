import type { RefObject } from "react";
import { useConfiguratorStore } from "@/lib/store/configuratorStore";
import { useElementLocks } from "@/lib/store/hooks";
import { useElementCondition } from "@/lib/store/hooks";
import { useCallback } from "react";
import type { Identifier } from "@/lib/minecraft/core/Identifier";
import { TooltipContent, TooltipTrigger } from "@radix-ui/react-tooltip";
import { Tooltip } from "@radix-ui/react-tooltip";
import translate from "@/lib/minecraft/i18n/translate";
import type { SidebarConfig } from "@/lib/minecraft/core/schema/primitive";

export default function SidebarItemContent({
    elementId,
    sidebarConfig,
    switchRef
}: {
    elementId: Identifier;
    sidebarConfig?: SidebarConfig;
    switchRef: RefObject<HTMLDivElement | null>;
}) {
    const setCurrentElementId = useConfiguratorStore((state) => state.setCurrentElementId);
    const handleChange = useConfiguratorStore((state) => state.handleChange);

    const lockData = useElementLocks(sidebarConfig?.lock, elementId);
    const conditionResult = useElementCondition(sidebarConfig?.enabled, elementId);
    const isEnabled = !sidebarConfig?.enabled ? true : !conditionResult;

    const handleClick = useCallback(() => {
        if (switchRef.current?.contains(document.activeElement)) return;
        setCurrentElementId(elementId);
    }, [elementId, setCurrentElementId, switchRef.current]);

    const handleSwitch = useCallback(
        (checked: boolean) => {
            if (!sidebarConfig?.action) return;
            handleChange(sidebarConfig.action, elementId, checked);
        },
        [sidebarConfig?.action, elementId, handleChange]
    );

    return (
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
    );
}

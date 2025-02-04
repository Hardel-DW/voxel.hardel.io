import { Identifier } from "@/lib/minecraft/core/Identifier";
import { useConfiguratorStore } from "@/lib/minecraft/core/engine/Store";
import { useElementLocks } from "@/lib/minecraft/core/engine/utils/hooks";
import { useElementCondition } from "@/lib/minecraft/core/engine/utils/hooks";
import type { RefObject } from "react";

export default function SidebarItemContent({ elementId, switchRef }: { elementId: string; switchRef: RefObject<HTMLDivElement | null> }) {
    const sidebarConfig = useConfiguratorStore((state) => state.config?.sidebar);
    const setCurrentElementId = useConfiguratorStore((state) => state.setCurrentElementId);
    const handleChange = useConfiguratorStore((state) => state.handleChange);
    const lockData = useElementLocks(sidebarConfig?.lock, elementId);
    const conditionResult = useElementCondition(sidebarConfig?.enabled, elementId);
    const identifier = useConfiguratorStore((state) => state.elements.get(elementId)?.identifier);
    const isEnabled = sidebarConfig?.enabled ? !conditionResult : true;

    const handleClick = () => {
        if (switchRef.current?.contains(document.activeElement)) return;
        setCurrentElementId(elementId);
    };

    const handleSwitch = (checked: boolean) => {
        if (!sidebarConfig?.action) return;
        handleChange(sidebarConfig.action, elementId, checked);
    };

    return (
        <div className="flex items-center justify-between" onClick={handleClick} onKeyDown={handleClick}>
            <div className="break-words">{identifier ? new Identifier(identifier).toResourceName() : "Error"}</div>
            <div className="flex items-center gap-8" ref={switchRef}>
                <label className="flex items-center justify-between gap-4 tooltip-trigger">
                    <input
                        type="checkbox"
                        name="enable"
                        disabled={lockData.isLocked}
                        checked={isEnabled}
                        onChange={(e) => handleSwitch(!e.target.checked)}
                    />
                </label>
            </div>
        </div>
    );
}

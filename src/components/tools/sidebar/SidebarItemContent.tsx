import type { RefObject } from "react";
import { useConfiguratorStore } from "@/lib/store/configuratorStore";
import { useElementLocks } from "@/lib/store/hooks";
import { useElementCondition } from "@/lib/store/hooks";
import { identifierToResourceName } from "@/lib/minecraft/core/Identifier";

export default function SidebarItemContent({ elementId, switchRef }: { elementId: string; switchRef: RefObject<HTMLDivElement | null> }) {
    const sidebarConfig = useConfiguratorStore((state) => state.configuration?.sidebar);
    const setCurrentElementId = useConfiguratorStore((state) => state.setCurrentElementId);
    const handleChange = useConfiguratorStore((state) => state.handleChange);
    const lockData = useElementLocks(sidebarConfig?.lock, elementId);
    const conditionResult = useElementCondition(sidebarConfig?.enabled, elementId);
    const resource = useConfiguratorStore((state) => state.elements.get(elementId)?.identifier.resource);
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
            <div className="break-words">{resource ? identifierToResourceName(resource) : "Error"}</div>
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

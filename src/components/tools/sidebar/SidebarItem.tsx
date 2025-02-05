import { useConfiguratorStore } from "@/lib/minecraft/core/engine/Store";
import { cn } from "@/lib/utils.ts";
import { useRef } from "react";
import SidebarItemContent from "./SidebarItemContent";

export function SidebarItem({ elementId }: { elementId: string }) {
    const switchRef = useRef<HTMLDivElement>(null);
    const isSelected = useConfiguratorStore((state) => state.currentElementId === elementId);
    const setCurrentElementId = useConfiguratorStore((state) => state.setCurrentElementId);

    const handleClick = () => {
        if (switchRef.current?.contains(document.activeElement)) return;
        setCurrentElementId(elementId);
    };

    return (
        <div
            onClick={handleClick}
            onKeyDown={handleClick}
            className={cn("odd:bg-black/75 pl-4 pr-2 py-2 rounded-xl", {
                "ring-1 ring-rose-900": isSelected
            })}>
            <SidebarItemContent elementId={elementId} switchRef={switchRef} />
        </div>
    );
}

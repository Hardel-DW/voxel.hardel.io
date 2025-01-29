import type { Identifier } from "@/lib/minecraft/core/Identifier";
import { useConfiguratorStore } from "@/lib/store/configuratorStore";
import { cn } from "@/lib/utils.ts";
import { useCallback, useRef } from "react";
import SidebarItemContent from "./SidebarItemContent";

export function SidebarItem({ elementId }: { elementId: Identifier }) {
    const switchRef = useRef<HTMLDivElement>(null);
    const isSelected = useConfiguratorStore(useCallback((state) => state.currentElementId?.equals(elementId) ?? false, [elementId]));
    const sidebarConfig = useConfiguratorStore((state) => state.configuration?.sidebar);

    return (
        <div
            className={cn("odd:bg-black/75 pl-4 pr-2 py-2 rounded-xl", {
                "ring-1 ring-rose-900": isSelected
            })}>
            <SidebarItemContent elementId={elementId} sidebarConfig={sidebarConfig} switchRef={switchRef} />
        </div>
    );
}

import { useConfiguratorStore } from "@/lib/store/configuratorStore";
import { cn } from "@/lib/utils.ts";
import { useRef } from "react";
import SidebarItemContent from "./SidebarItemContent";

export function SidebarItem({ elementId }: { elementId: string }) {
    const switchRef = useRef<HTMLDivElement>(null);
    const isSelected = useConfiguratorStore((state) => state.currentElementId === elementId);

    return (
        <div
            className={cn("odd:bg-black/75 pl-4 pr-2 py-2 rounded-xl", {
                "ring-1 ring-rose-900": isSelected
            })}>
            <SidebarItemContent
                elementId={elementId}
                switchRef={switchRef}
            />
        </div>
    );
}

import { Identifier } from "@/lib/minecraft/core/Identifier";
import { useConfiguratorStore } from "@/lib/store/configuratorStore";
import { useMemo } from "react";
import { SidebarItem } from "./SidebarItem";

export const SidebarContainer = () => {
    const elements = useConfiguratorStore((state) => state.elements);

    const sortedElements = useMemo(() => {
        return Identifier.sortRegistry(elements.filter((e) => !e.data?.override?.configurator.hide));
    }, [elements]);

    return (
        <>
            {sortedElements.map((element) => (
                <SidebarItem key={element.identifier.getResource()} elementId={element.identifier} />
            ))}
        </>
    );
};

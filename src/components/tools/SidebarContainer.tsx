import { Identifier } from "@/lib/minecraft/core/Identifier";
import { useConfiguratorStore } from "@/lib/store/configuratorStore";
import { SidebarItem } from "./SidebarItem";

export const SidebarContainer = () => {
    const elementIds = useConfiguratorStore((state) => state.elements.map((e) => e.identifier));

    return (
        <>
            {Identifier.sortIdentifier(elementIds).map((element) => (
                <SidebarItem key={element.getResource()} elementId={element} />
            ))}
        </>
    );
};

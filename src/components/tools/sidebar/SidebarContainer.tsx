import { useConfiguratorStore } from "@voxelio/breeze/core";
import { SidebarItem } from "./SidebarItem";

export const SidebarContainer = () => {
    const elementIds = useConfiguratorStore((state) => state.sortedIdentifiers);

    return (
        <>
            {elementIds.map((element) => (
                <SidebarItem key={element} elementId={element} />
            ))}
        </>
    );
};

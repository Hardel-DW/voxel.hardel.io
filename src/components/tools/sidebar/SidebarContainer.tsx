import { useConfiguratorStore } from "@/lib/store/configuratorStore";
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

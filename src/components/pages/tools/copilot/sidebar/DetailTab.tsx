import { withConcept } from "@/components/pages/tools/copilot/sidebar/HocConcept";
import SidebarCrafting from "@/components/pages/tools/copilot/sidebar/crafting/SidebarCrafting";
import SidebarEnchantment from "@/components/pages/tools/copilot/sidebar/enchant/SidebarEnchantment";
import SidebarLoot from "@/components/pages/tools/copilot/sidebar/loot/SidebarLoot";
import { useSidebarStore } from "@/components/pages/tools/copilot/store/SidebarStore";

export default function DetailTab() {
    const selectedConcept = useSidebarStore((state) => state.selectedConcept);
    const contentMap = {
        enchantment: withConcept(SidebarEnchantment),
        loot_table: withConcept(SidebarLoot),
        recipe: withConcept(SidebarCrafting)
    };

    const Component = contentMap[selectedConcept as keyof typeof contentMap];
    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">{Component && <Component />}</div>
        </div>
    );
}

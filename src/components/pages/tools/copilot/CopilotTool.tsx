import CraftingPage from "@/components/pages/tools/copilot/content/crafting/CraftingPage";
import EnchantmentPage from "@/components/pages/tools/copilot/content/enchantment/EnchantmentPage";
import LootPage from "@/components/pages/tools/copilot/content/loot/LootPage";
import UploadPage from "@/components/pages/tools/copilot/content/upload/UploadPage";
import { useCopilotStore } from "@/components/pages/tools/copilot/store/DatapackStore";
import { useSidebarStore } from "@/components/pages/tools/copilot/store/SidebarStore";
import PanelProvider from "@/components/tools/PanelProvider";
import LineSetup from "@/components/ui/react/geometry/line/LineSetup";

const PAGES = {
    loot_table: LootPage,
    recipe: CraftingPage,
    enchantment: EnchantmentPage
} as const;

const CopilotContent = () => {
    const selectedConcept = useSidebarStore((state) => state.selectedConcept);
    const Component = selectedConcept ? PAGES[selectedConcept as keyof typeof PAGES] : null;
    return Component ? <Component /> : null;
};

export default function CopilotTool({ lang }: { lang: string }) {
    const hasElements = useCopilotStore((state) => state.elements.size > 0);

    return (
        <PanelProvider lang={lang}>
            <LineSetup />
            {hasElements ? <CopilotContent /> : <UploadPage />}
        </PanelProvider>
    );
}

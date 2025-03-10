import EnchantmentCard from "@/components/pages/tools/copilot/sidebar/enchant/EnchantmentCard";
import { getElementByRegistry, useCopilotStore } from "@/components/pages/tools/copilot/store/DatapackStore";
import { EnchantmentComparator } from "@/lib/minecraft/core/enchant/EnchantmentComparator";
import type { Enchantment } from "@voxelio/breeze/schema";

export default function SidebarEnchantment() {
    const elements = useCopilotStore((state) => getElementByRegistry<Enchantment>(state, "enchantment"));
    const comparator = new EnchantmentComparator(elements);
    const supportedItems = comparator.getEnchantmentsBySupportedItems();

    return (
        <div className="grid gap-4 mt-4">
            {Array.from(supportedItems.entries()).map(([key, value]) => (
                <EnchantmentCard key={key} item={key} value={value} />
            ))}
        </div>
    );
}

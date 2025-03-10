import RewardCollection from "@/components/pages/tools/copilot/content/loot/reward/pool";
import { getCurrentElement, useCopilotStore } from "@/components/pages/tools/copilot/store/DatapackStore";
import { LootTable } from "@/lib/minecraft/core/loot/LootTable";

export default function LootPage() {
    const currentElement = useCopilotStore((state) => getCurrentElement(state));
    if (currentElement === undefined) return null;
    const lootTable = new LootTable(currentElement).serialize();

    return (
        <div className="flex flex-col gap-4">
            <RewardCollection lootTable={lootTable} />
        </div>
    );
}

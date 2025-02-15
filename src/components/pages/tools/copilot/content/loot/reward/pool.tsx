import RewardLine from "@/components/pages/tools/copilot/content/loot/reward/item";
import type { VoxelLootTable } from "@/lib/minecraft/core/loot/LootTable";

export default function RewardCollection(props: { lootTable: VoxelLootTable }) {
    return (
        <ul className="grid grid-cols-2 gap-4 pl-8">
            {props.lootTable.items.map((reward, index) => (
                <RewardLine key={index.toFixed()} id={reward.item.name} chance={reward.chance} />
            ))}
        </ul>
    );
}

import type { CollectionEntry } from "astro:content";
import RewardCard from "@/components/ui/RewardCard";
import type React from "react";
import { useRef, useState } from "react";
import RewardCollection from "./RewardCollection";

export default function RewardsModal(props: {
    onClose: () => void;
    structures: CollectionEntry<"structure">[];
}) {
    const [selectedStructure, setSelectedStructure] = useState<CollectionEntry<"structure">>(props.structures[0]);
    const [selectedReward, setSelectedReward] = useState<CollectionEntry<"structure">["data"]["rewards"][number]>(
        props.structures[0].data.rewards[0]
    );
    const contentRef = useRef<HTMLDivElement>(null);

    const handleClose = (e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>) => {
        if (!contentRef.current?.contains(e.target as Node)) {
            props.onClose();
        }
    };

    const handleRewardClick = (reward: CollectionEntry<"structure">["data"]["rewards"][number]) => {
        setSelectedReward(reward);
    };

    return (
        <div
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xl overflow-y-auto overflow-body"
            onClick={handleClose}
            onKeyDown={handleClose}
        >
            <div className="min-h-full w-full py-8 flex items-center justify-center">
                <div
                    ref={contentRef}
                    className="w-3/4 h-[80vh] border-t border-l border-zinc-800 bg-header-translucent rounded-xl grid grid-cols-7"
                >
                    {/* Left Column */}
                    <div className="overflow-y-auto col-span-2 flex flex-col gap-y-4 p-8">
                        <div className="relative stack">
                            <select
                                value={selectedStructure.id}
                                onChange={(e) => {
                                    const structure = props.structures.find((s) => s.id === e.target.value);
                                    if (structure) setSelectedStructure(structure);
                                }}
                                className="w-full h-10 rounded-md bg-zinc-800 text-zinc-200 p-2"
                            >
                                {props.structures.map((structure) => (
                                    <option key={structure.id} value={structure.id}>
                                        {structure.data.name}
                                    </option>
                                ))}
                            </select>
                            <span className="self-center justify-self-end mr-4 w-2 h-2 border-l border-b border-white -rotate-45" />
                        </div>
                        <div className="w-full h-1 bg-rose-700 rounded-full shrink-0" />

                        <div className="flex flex-col gap-y-4">
                            {selectedStructure.data.rewards.length > 0 &&
                                selectedStructure.data.rewards.map((reward) => (
                                    <RewardCard
                                        onClick={() => handleRewardClick(reward)}
                                        key={reward.content.id + reward.id}
                                        id={reward.id}
                                        description={reward.description}
                                        selected={selectedReward === reward}
                                    />
                                ))}
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="overflow-y-auto col-span-5 flex flex-col gap-y-4 p-8">
                        <div>
                            <div className="flex justify-between items-center gap-y-2">
                                <h1 className="text-2xl font-bold text-white">Chance d'obtention</h1>
                                <p className="text-sm text-zinc-400">Chaque objets a une probabilité d'apparaitre</p>
                            </div>
                            <div className="w-full h-1 bg-zinc-700 rounded-full" />
                        </div>

                        {selectedReward?.content?.id && <RewardCollection rewardId={selectedReward.content.id} />}
                    </div>
                </div>
            </div>
        </div>
    );
}

import type { CollectionEntry } from "astro:content";
import RewardLine from "@/components/ui/RewardLine";
import useSWR from "swr";

export default function RewardCollection(props: { rewardId: string }) {
    const { data, isLoading, error } = useSWR<NonNullable<CollectionEntry<"loot">["data"]["items"]>>(
        `/api/loot/${props.rewardId}.json`,
        (url: string) => fetch(url).then((res) => res.json())
    );

    if (isLoading) return <></>;
    if (error) return <></>;

    return (
        <ul className="grid grid-cols-2 gap-4 border-l border-zinc-700 pl-8">
            {data?.map((reward, index) => (
                <RewardLine key={index.toFixed()} id={reward.id} count={reward.count} description={reward.description} />
            ))}
        </ul>
    );
}

import type { CollectionEntry } from "astro:content";
import Button from "@/components/ui/react/Button";
import { useState } from "react";
import RewardsModal from "./RewardsModal";

export default function YggdrasilLootViewer(props: {
    structures: CollectionEntry<"structure">[];
}) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (isModalOpen) {
        return (
            <RewardsModal structures={props.structures.filter((s) => s.data.rewards.length > 0)} onClose={() => setIsModalOpen(false)} />
        );
    }

    return (
        <Button onClick={() => setIsModalOpen(true)} style={{ fontFamily: "fantasy" }} className="tracking-wider text-zinc-700 mb-4">
            Voir les récompenses
        </Button>
    );
}

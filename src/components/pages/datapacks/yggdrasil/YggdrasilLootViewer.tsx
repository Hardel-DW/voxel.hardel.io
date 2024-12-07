import type { CollectionEntry } from "astro:content";
import Button from "@/components/ui/react/Button";
import { useState, useEffect } from "react";
import RewardsModal from "./RewardsModal";

export default function YggdrasilLootViewer(props: {
    structures: CollectionEntry<"structure">[];
}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
        const viewer = document.getElementById("structure-viewer");
        if (!viewer) return;
        const observer = new MutationObserver(() => {
            const newIndex = Number(viewer.dataset.selectedIndex || 0);
            setSelectedIndex(newIndex);
        });

        observer.observe(viewer, { attributes: true, attributeFilter: ["data-selected-index"] });
        return () => observer.disconnect();
    }, []);

    if (isModalOpen) {
        const filteredStructures = props.structures.filter((s) => s.data.rewards.length > 0);
        const filteredIndex = props.structures.slice(0, selectedIndex).filter((s) => s.data.rewards.length > 0).length;

        return (
            <RewardsModal
                structures={filteredStructures}
                onClose={() => setIsModalOpen(false)}
                selectedIndex={Math.min(filteredIndex, filteredStructures.length - 1)}
            />
        );
    }

    // Vérifier si la structure actuelle a des récompenses
    const currentStructure = props.structures[selectedIndex];
    if (!currentStructure?.data.rewards.length) {
        return null;
    }

    return (
        <Button onClick={() => setIsModalOpen(true)} style={{ fontFamily: "fantasy" }} className="tracking-wider text-zinc-700 mb-4">
            Voir les récompenses
        </Button>
    );
}

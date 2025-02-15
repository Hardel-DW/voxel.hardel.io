import SidebarCard from "@/components/pages/tools/copilot/sidebar/SidebarCard";
import { useSidebarStore } from "@/components/pages/tools/copilot/store/SidebarStore";
import { useCopilotStore } from "@/components/pages/tools/copilot/store/DatapackStore";
import { CONCEPTS } from "@/components/pages/tools/copilot/store/data/elements";

export default function ConceptTab() {
    const { selectedConcept, setSelectedConcept } = useSidebarStore();
    const elementCountByRegistry = useCopilotStore((state) => state.elementCountByRegistry);

    return (
        <div className="flex flex-col gap-4 mt-4">
            {CONCEPTS.map((concept, index) => (
                <SidebarCard
                    key={concept.title}
                    {...concept}
                    index={index}
                    description={`${elementCountByRegistry.get(concept.registry) || 0} Elements`}
                    selected={selectedConcept === concept.registry}
                    onClick={() => setSelectedConcept(concept.registry)}
                />
            ))}
        </div>
    );
}

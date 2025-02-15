import type { ComponentType } from "react";
import { CONCEPTS } from "@/components/pages/tools/copilot/store/data/elements";
import { useSidebarStore } from "@/components/pages/tools/copilot/store/SidebarStore";

type WithConceptProps = {};

/**
 * HOC pour gérer le rendu conditionnel des concepts
 * @param WrappedComponent Le composant à wrapper
 * @returns Un nouveau composant avec la logique de concept
 */
export const withConcept = <P extends WithConceptProps>(WrappedComponent: ComponentType<P>) => {
    return function ConceptContainer(props: P) {
        const selectedConcept = useSidebarStore((state) => state.selectedConcept);

        // Vérifie si le concept existe dans la liste des concepts
        const isValidConcept = CONCEPTS.some((concept) => concept.registry === selectedConcept);

        if (!isValidConcept) {
            return null;
        }

        return <WrappedComponent {...props} />;
    };
};

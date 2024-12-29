import type { RegistryElement } from "@/lib/minecraft/mczip";
import type { VoxelElement } from "@/lib/minecraft/core/engine/Analyser";

function flattenObject(obj: any): string[] {
    const result: string[] = [];

    function recurse(current: any) {
        if (Array.isArray(current)) {
            for (const item of current) {
                if (typeof item === "object" && item !== null) {
                    recurse(item);
                } else if (item !== null && item !== undefined) {
                    result.push(String(item));
                }
            }
        } else if (typeof current === "object" && current !== null) {
            for (const value of Object.values(current)) {
                if (typeof value === "object" && value !== null) {
                    recurse(value);
                } else if (value !== null && value !== undefined) {
                    result.push(String(value));
                }
            }
        }
    }

    recurse(obj);
    return result;
}

interface ScoredElement {
    element: RegistryElement<VoxelElement>;
    score: number;
    searchString: string;
}

export function searchRelevantElements(
    elements: RegistryElement<VoxelElement>[],
    query: string,
    excludeFields: (keyof VoxelElement)[] = []
): RegistryElement<VoxelElement>[] {
    const searchTerms = query.toLowerCase().split(" ");

    const scoredElements = elements.map((element): ScoredElement => {
        const identifier = element.identifier;

        // Recherche dans l'identifiant avec une pondération plus élevée
        const identifierStrings = [
            identifier.getNamespace(),
            identifier.getResource(),
            identifier.renderResource(),
            identifier.renderResourceName(),
            identifier.renderFilename()
        ];

        const dataStrings = flattenObject(element.data);

        // Combine tous les champs de recherche
        const searchString = [...identifierStrings, ...dataStrings].join(" ").toLowerCase();

        // Calcul du score de pertinence avec pondération
        const score = searchTerms.reduce((acc, term) => {
            let termScore = 0;

            // Score plus élevé pour les correspondances exactes dans l'identifiant
            if (identifierStrings.some((str) => str.toLowerCase() === term)) {
                termScore += 10;
            }
            // Score pour les correspondances partielles dans l'identifiant
            else if (identifierStrings.some((str) => str.toLowerCase().includes(term))) {
                termScore += 5;
            }

            // Score pour les correspondances dans les données
            if (dataStrings.some((str) => str.toLowerCase().includes(term))) {
                termScore += 3;
            }

            return acc + termScore;
        }, 0);

        // Filter out excluded fields from returned element
        const filteredElement = {
            ...element,
            data: { ...element.data }
        };
        for (const field of excludeFields) {
            delete filteredElement.data[field];
        }

        return { element: filteredElement, score, searchString };
    });

    return scoredElements
        .filter(({ score }) => score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 5)
        .map(({ element }) => element);
}

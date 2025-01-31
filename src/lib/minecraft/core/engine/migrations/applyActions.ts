import { isRegistryVoxelElement, type Analysers, type GetAnalyserVoxel } from "@/lib/minecraft/core/engine/Analyser";
import type { ParseDatapackResult } from "@/lib/minecraft/core/engine/Parser";
import type { Action } from "@/lib/minecraft/core/engine/actions";
import { updateData } from "@/lib/minecraft/core/engine/actions";

/**
 * Applies migration actions to a target datapack
 */
export async function applyActions<T extends keyof Analysers>(
    target: ParseDatapackResult<GetAnalyserVoxel<T>>,
    actions: Map<string, Action[]>
): Promise<ParseDatapackResult<GetAnalyserVoxel<T>>> {
    const modifiedElements = new Map(target.elements);

    // Apply each action to the corresponding element
    for (const [identifier, elementActions] of actions) {
        const element = modifiedElements.get(identifier);
        if (!element) continue;

        let currentElement = element;
        for (const action of elementActions) {
            const updatedElement = updateData(action, currentElement, target.version);
            const voxelElement = isRegistryVoxelElement(updatedElement);
            if (voxelElement) {
                currentElement = updatedElement.data;
            }
        }
        modifiedElements.set(identifier, currentElement);
    }

    return {
        ...target,
        elements: modifiedElements
    };
}

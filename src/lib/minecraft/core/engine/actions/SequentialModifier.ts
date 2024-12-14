import type { Analysers, GetAnalyserVoxel } from "@/lib/minecraft/core/engine/Analyser.ts";
import type { Action } from "@/lib/minecraft/core/engine/actions/index.ts";
import { updateData } from "@/lib/minecraft/core/engine/actions/index.ts";
import type { RegistryElement } from "@/lib/minecraft/mczip.ts";

export interface SequentialAction {
    type: "sequential";
    actions: Action[];
}

/**
 * Execute a sequence of actions in order. Each action is executed with its corresponding value if provided.
 * If any action in the sequence fails, the entire sequence is aborted and undefined is returned.
 * @param action - The sequential action containing the list of actions to perform
 * @param element - The element to modify
 * @param version - The version of the element
 */
export default function SequentialModifier<T extends keyof Analysers>(
    action: SequentialAction,
    element: RegistryElement<GetAnalyserVoxel<T>>,
    version: number
): RegistryElement<GetAnalyserVoxel<T>> | undefined {
    let currentElement = element;

    for (const subAction of action.actions) {
        const updatedElement = updateData<T>(subAction, currentElement, version);
        if (!updatedElement) return undefined;
        currentElement = updatedElement;
    }

    return currentElement;
}

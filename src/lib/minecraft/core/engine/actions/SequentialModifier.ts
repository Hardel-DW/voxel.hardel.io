import type { Analysers, GetAnalyserVoxel } from "@/lib/minecraft/core/engine/Analyser.ts";
import type { Action, ActionValue, ExtraActionData } from "@/lib/minecraft/core/engine/actions/index.ts";
import { updateData } from "@/lib/minecraft/core/engine/actions/index.ts";
import type { RegistryElement } from "@/lib/minecraft/mczip.ts";

export type SequentialAction = {
    type: "Sequential";
    actions: Array<{
        action: Action;
        value?: ActionValue;
    }>;
};

/**
 * Execute a sequence of actions in order. Each action is executed with its corresponding value if provided.
 * If any action in the sequence fails, the entire sequence is aborted and undefined is returned.
 * @param action - The sequential action containing the list of actions to perform
 * @param element - The element to modify
 * @param extra - Extra data
 */
export default function SequentialModifier<T extends keyof Analysers>(
    action: SequentialAction,
    element: RegistryElement<GetAnalyserVoxel<T>>,
    extra: ExtraActionData
): RegistryElement<GetAnalyserVoxel<T>> | undefined {
    const { value, toggleSection } = extra;
    let currentElement = element;

    for (const { action: subAction, value: subValue } of action.actions) {
        const resolvedValue = subValue ?? value;

        const updatedElement = updateData<T>(subAction, currentElement, { value: resolvedValue, toggleSection });
        if (!updatedElement) return undefined;
        currentElement = updatedElement;
    }

    return currentElement;
}

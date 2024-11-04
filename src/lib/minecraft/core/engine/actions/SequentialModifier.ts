import type { ConfiguratorContextType } from "@/lib/minecraft/components/ConfiguratorContext.tsx";
import type { Analysers, GetAnalyserVoxel } from "@/lib/minecraft/core/engine/Analyser.ts";
import type { Action, ActionValue } from "@/lib/minecraft/core/engine/actions/index.ts";
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
 * @param value - Not used for sequential actions
 * @param context - The context of the configurator
 * @param element - The element to modify
 */
export default function SequentialModifier<T extends keyof Analysers>(
    action: SequentialAction,
    value: ActionValue,
    context: ConfiguratorContextType<GetAnalyserVoxel<T>>,
    element: RegistryElement<GetAnalyserVoxel<T>>
): RegistryElement<GetAnalyserVoxel<T>> | undefined {
    let currentElement = element;

    for (const { action: subAction, value: subValue } of action.actions) {
        const resolvedValue = subValue ?? value;

        const updatedElement = updateData<T>(subAction, resolvedValue, context, currentElement);
        if (!updatedElement) return undefined;
        currentElement = updatedElement;
    }

    return currentElement;
}

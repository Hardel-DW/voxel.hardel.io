import type { Analysers, GetAnalyserVoxel } from "@/lib/minecraft/core/engine/Analyser.ts";
import type { Action, ActionValue } from "@/lib/minecraft/core/engine/actions/index.ts";
import { updateData } from "@/lib/minecraft/core/engine/actions/index.ts";
import type { RegistryElement } from "@/lib/minecraft/mczip.ts";

export interface AlternativeAction {
    type: "alternative";
    field: string;
    cases: {
        when: ActionValue;
        do: Action;
    }[];
}

/**
 * This action allows to choose between multiple actions based on the value.
 * If the value is not found in the cases, the action is not performed and undefined is returned.
 * @param action - The action to perform
 * @param element - The element to modify
 * @param version - The version of the element
 * @param value
 */
export default function AlternativeModifier<T extends keyof Analysers>(
    action: AlternativeAction,
    element: RegistryElement<GetAnalyserVoxel<T>>,
    version: number
): RegistryElement<GetAnalyserVoxel<T>> | undefined {
    let currentElement = element;
    const { field } = action;
    const value = element.data[field] as ActionValue | undefined;
    if (value === undefined) return undefined;

    for (const subAction of action.cases) {
        if (subAction.when === value) {
            const updatedElement = updateData<T>(subAction.do, currentElement, version, value);
            if (!updatedElement) return undefined;
            currentElement = updatedElement;
        }
    }

    return currentElement;
}

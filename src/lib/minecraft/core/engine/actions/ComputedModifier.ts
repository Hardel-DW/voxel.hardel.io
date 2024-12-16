import type { Analysers, GetAnalyserVoxel } from "@/lib/minecraft/core/engine/Analyser.ts";
import type { RegistryElement } from "@/lib/minecraft/mczip.ts";
import type { ActionValue, BaseAction } from ".";

export interface ComputedAction extends BaseAction {
    type: "set_value_from_computed_value" | "toggle_value_from_computed_value";
}

/**
 * Modifies the field of the element with a computed value passed as parameter.
 * For set_value_from_computed_value: Sets the field to the computed value
 * For toggle_value_from_computed_value: Toggles between the computed value and undefined
 * @param action - The action to perform
 * @param element - The element to modify
 * @param value - The computed value to use
 */
export function ComputedModifier<T extends keyof Analysers>(
    action: ComputedAction,
    element: RegistryElement<GetAnalyserVoxel<T>>,
    value?: ActionValue
): RegistryElement<GetAnalyserVoxel<T>> | undefined {
    if (value === undefined) return undefined;
    const { field } = action;

    if (action.type === "toggle_value_from_computed_value" && element.data[field] === value) {
        return {
            identifier: element.identifier,
            data: {
                ...element.data,
                [field]: undefined
            }
        };
    }

    return {
        identifier: element.identifier,
        data: {
            ...element.data,
            [field]: value
        }
    };
}

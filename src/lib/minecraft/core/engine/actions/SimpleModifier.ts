import type { Analysers, GetAnalyserVoxel } from "@/lib/minecraft/core/engine/Analyser.ts";
import type { RegistryElement } from "@/lib/minecraft/mczip.ts";
import type { ActionValue, BaseAction } from ".";

export interface SimpleAction extends BaseAction {
    type: "set_value" | "toggle_value";
    value: ActionValue;
}

/**
 * Modifies the field of the element with the hardcoded value given.
 * For set_value: Sets the field to the given value
 * For toggle_value: Toggles between the value and undefined
 * @param action - The action to perform.
 * @param element - The element to modify.
 * @constructor
 */
export function SimpleModifier<T extends keyof Analysers>(
    action: SimpleAction,
    element: RegistryElement<GetAnalyserVoxel<T>>
): RegistryElement<GetAnalyserVoxel<T>> | undefined {
    const { field } = action;

    if (action.type === "toggle_value" && element.data[field] === action.value) {
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
            [field]: action.value
        }
    };
}

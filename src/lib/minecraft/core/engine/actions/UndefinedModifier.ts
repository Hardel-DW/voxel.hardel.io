import type { Analysers, GetAnalyserVoxel } from "@/lib/minecraft/core/engine/Analyser.ts";
import type { RegistryElement } from "@/lib/minecraft/mczip.ts";
import type { BaseAction } from ".";

export interface UndefinedAction extends BaseAction {
    type: "set_undefined";
}

/**
 * Modifies the field of the element with the hardcoded value given.
 * For set_value: Sets the field to the given value
 * For toggle_value: Toggles between the value and undefined
 * For set_undefined: Sets the field to undefined
 * @param action - The action to perform.
 * @param element - The element to modify.
 * @constructor
 */
export function UndefinedModifier<T extends keyof Analysers>(
    action: UndefinedAction,
    element: RegistryElement<GetAnalyserVoxel<T>>
): RegistryElement<GetAnalyserVoxel<T>> | undefined {
    const { field } = action;

    return {
        identifier: element.identifier,
        data: {
            ...element.data,
            [field]: undefined
        }
    };
}

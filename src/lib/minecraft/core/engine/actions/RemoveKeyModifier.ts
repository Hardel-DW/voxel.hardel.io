import type { Analysers, GetAnalyserVoxel } from "@/lib/minecraft/core/engine/Analyser.ts";
import type { RegistryElement } from "@/lib/minecraft/mczip.ts";
import type { ActionValue, BaseAction } from ".";

export interface RemoveKeyAction extends BaseAction {
    type: "remove_key";
    value: ActionValue;
}

/**
 * This action removes a key from the field of the element.
 * @param action - The action to perform
 * @param element - The element to modify
 * @constructor
 */
export function RemoveKeyModifier<T extends keyof Analysers>(
    action: RemoveKeyAction,
    element: RegistryElement<GetAnalyserVoxel<T>>
): RegistryElement<GetAnalyserVoxel<T>> | undefined {
    const { value, field } = action;

    if (typeof value !== "string") {
        throw new Error("Remove Key action requires a string value");
    }

    const shadowCopy = structuredClone(element);
    const effects = shadowCopy.data[field] as Record<string, unknown> | undefined;
    if (effects) {
        delete effects[value];
    }

    return {
        identifier: element.identifier,
        data: {
            ...element.data,
            [field]: effects
        }
    };
}

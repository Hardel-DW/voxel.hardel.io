import type { Analysers, GetAnalyserVoxel } from "@/lib/minecraft/core/engine/Analyser.ts";
import type { RegistryElement } from "@/lib/minecraft/mczip.ts";
import type { ActionValue, BaseAction } from ".";

export interface ToggleListValueAction extends BaseAction {
    type: "toggle_value_in_list";
    mode?: "remove_if_empty";
    value: ActionValue;
}

/**
 * Toggle the value in the list field of the element. it adds them if not present, remove them if present.
 * @param action - The action to perform.
 * @param element - The element to modify.
 * @constructor
 */
export default function ToggleListValueModifier<T extends keyof Analysers>(
    action: ToggleListValueAction,
    element: RegistryElement<GetAnalyserVoxel<T>>
): RegistryElement<GetAnalyserVoxel<T>> | undefined {
    const { value, field } = action;
    const shadowCopy = structuredClone(element);

    const list = (shadowCopy.data[field] as string[]) || [];
    if (!Array.isArray(list) || !list.every((item) => typeof item === "string") || typeof value !== "string") {
        return;
    }

    const isPresent = list.includes(value);
    const newList = isPresent ? list.filter((item) => item !== value) : [...list, value];

    return {
        identifier: element.identifier,
        data: {
            ...element.data,
            [field]: action.mode === "remove_if_empty" && newList.length === 0 ? undefined : newList
        }
    };
}

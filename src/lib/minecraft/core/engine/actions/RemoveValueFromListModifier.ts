import type { RegistryElement } from "@/lib/minecraft/mczip.ts";
import type { ActionValue, BaseAction } from ".";

export interface RemoveValueFromListAction extends BaseAction {
    type: "remove_value_from_list";
    mode?: "remove_if_empty"[];
    value?: ActionValue;
}

/**
 * Removes a specific value from a list field if it exists
 * - With remove_if_empty mode, removes the field if the list becomes empty
 * Returns undefined if the field is not an array or if the types don't match
 */
export default function RemoveValueFromListModifier(
    action: RemoveValueFromListAction,
    element: RegistryElement<Record<string, unknown>>,
    props?: ActionValue
): RegistryElement<Record<string, unknown>> | undefined {
    const { field } = action;
    const value = action.value ?? props;
    const modes = action.mode || [];

    if (value === undefined && action.value === undefined) {
        throw new Error("Both props and action.value cannot be undefined");
    }

    const list = element.data[field];

    // Verify that list is an array of strings
    if (!Array.isArray(list) || !list.every((item): item is string => typeof item === "string") || typeof value !== "string") {
        return undefined;
    }

    const newList = list.filter((item) => item !== value);

    // Return modified element
    return {
        identifier: element.identifier,
        data: {
            ...element.data,
            [field]: modes.includes("remove_if_empty") && newList.length === 0 ? undefined : newList
        }
    };
}

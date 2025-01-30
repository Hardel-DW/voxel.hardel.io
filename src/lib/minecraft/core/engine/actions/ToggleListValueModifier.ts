import type { RegistryElement } from "@/lib/minecraft/mczip.ts";
import type { ActionValue, BaseAction } from ".";

export interface ToggleListValueAction extends BaseAction {
    type: "toggle_value_in_list";
    mode?: ("remove_if_empty" | "override")[];
    value?: ActionValue;
}

/**
 * Toggle the value in the list field of the element.
 * - Adds them if not present, removes them if present
 * - With override mode, converts primitive values to arrays
 * - With remove_if_empty mode, removes the field if the list becomes empty
 */
export default function ToggleListValueModifier(
    action: ToggleListValueAction,
    element: RegistryElement<Record<string, unknown>>,
    props?: ActionValue
): RegistryElement<Record<string, unknown>> | undefined {
    const { field } = action;
    const value = action.value ?? props;
    const modes = action.mode || [];

    if (value === undefined && action.value === undefined) {
        throw new Error("Both props and action.value cannot be undefined");
    }

    const shadowCopy = structuredClone(element);
    let list: unknown = shadowCopy.data[field];

    // Handle override mode for primitive values
    if (modes.includes("override") && list !== undefined && !Array.isArray(list)) {
        list = [value as string];
        return {
            identifier: element.identifier,
            data: {
                ...element.data,
                [field]: list
            }
        };
    }

    // Ensure list is an array
    if (!Array.isArray(list)) {
        list = [];
    }

    // Type guard to ensure list is string[]
    if (!Array.isArray(list) || !list.every((item: unknown): item is string => typeof item === "string") || typeof value !== "string") {
        return;
    }

    const isPresent = list.includes(value);
    const newList = isPresent ? list.filter((item: string) => item !== value) : [...list, value];

    return {
        identifier: element.identifier,
        data: {
            ...element.data,
            [field]: modes.includes("remove_if_empty") && newList.length === 0 ? undefined : newList
        }
    };
}

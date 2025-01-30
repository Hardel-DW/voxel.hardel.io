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
export function SimpleModifier(
    action: SimpleAction,
    element: RegistryElement<Record<string, unknown>>
): RegistryElement<Record<string, unknown>> | undefined {
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

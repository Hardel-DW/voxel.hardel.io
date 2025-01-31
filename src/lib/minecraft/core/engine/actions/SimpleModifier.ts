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
export function SimpleModifier(action: SimpleAction, element: Record<string, unknown>): Record<string, unknown> | undefined {
    const { field } = action;

    if (action.type === "toggle_value" && element[field] === action.value) {
        return { ...element, [field]: undefined };
    }

    return { ...element, [field]: action.value };
}

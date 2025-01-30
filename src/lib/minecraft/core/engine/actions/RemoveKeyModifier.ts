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
export default function RemoveKeyModifier(
    action: RemoveKeyAction,
    element: RegistryElement<Record<string, unknown>>
): RegistryElement<Record<string, unknown>> | undefined {
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

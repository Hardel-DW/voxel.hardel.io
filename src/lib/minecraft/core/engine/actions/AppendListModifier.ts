import type { RegistryElement } from "@/lib/minecraft/mczip.ts";
import type { ActionValue, BaseAction } from ".";

export interface ListAction extends BaseAction {
    type: "list_operation";
    mode: "prepend" | "append";
    flag?: "not_duplicate"[];
    value: ActionValue;
}

/**
 * This action adds a value to a list field, either at the beginning (prepend) or at the end (append)
 * If the not_duplicate flag is set, the value will only be added if it doesn't already exist in the list
 * @param action - The action to perform
 * @param element - The element to modify
 */
export default function AppendListModifier(
    action: ListAction,
    element: RegistryElement<Record<string, unknown>>
): RegistryElement<Record<string, unknown>> | undefined {
    const { value, field, mode, flag } = action;
    const shadowCopy = structuredClone(element);

    const list = (shadowCopy.data[field] as unknown[]) || [];
    if (!Array.isArray(list)) {
        return;
    }

    // Check if we should prevent duplicates
    if (flag?.includes("not_duplicate") && list.includes(value)) {
        return element;
    }

    const newList = mode === "prepend" ? [value, ...list] : [...list, value];

    return {
        identifier: element.identifier,
        data: {
            ...element.data,
            [field]: newList
        }
    };
}

import type { Analysers, GetAnalyserVoxel } from "@/lib/minecraft/core/engine/Analyser.ts";
import type { RegistryElement } from "@/lib/minecraft/mczip.ts";
import type { ActionValue, BaseAction } from ".";

export interface ListAction extends BaseAction {
    type: "list_operation";
    mode: "prepend" | "append";
    value: ActionValue;
}

/**
 * This action adds a value to a list field, either at the beginning (prepend) or at the end (append)
 * @param action - The action to perform
 * @param element - The element to modify
 */
export function AppendListModifier<T extends keyof Analysers>(
    action: ListAction,
    element: RegistryElement<GetAnalyserVoxel<T>>
): RegistryElement<GetAnalyserVoxel<T>> | undefined {
    const { value, field, mode } = action;
    const shadowCopy = structuredClone(element);

    const list = (shadowCopy.data[field] as unknown[]) || [];
    if (!Array.isArray(list)) {
        return;
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

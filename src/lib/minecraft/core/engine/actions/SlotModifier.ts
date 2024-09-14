import type { ConfiguratorContextType } from "@/lib/minecraft/components/ConfiguratorContext.tsx";
import { type SlotRegistryType, isArraySlotRegistryType, isSlotRegistryType, toggleSlot } from "@/lib/minecraft/core/SlotManager.ts";
import type { Analysers, GetAnalyserVoxel } from "@/lib/minecraft/core/engine/Analyser.ts";
import { type Field, getField } from "@/lib/minecraft/core/engine/field";
import type { RegistryElement } from "@/lib/minecraft/mczip.ts";
import { isStringArray } from "@/lib/utils.ts";

export type SlotAction = {
    type: "Slot";
    field: Field;
    value: string;
};

/**
 * This action modifies the slot field of the element with the given value. It adds or removes the value from the slot. If the value is already in the slot, it will be removed, otherwise it will be added.
 * @param action - The action to perform.
 * @param context - The context of the configurator.
 * @param element - The element to modify.
 * @constructor
 */
export function SlotModifier<T extends keyof Analysers>(
    action: SlotAction,
    context: ConfiguratorContextType<GetAnalyserVoxel<T>>,
    element: RegistryElement<GetAnalyserVoxel<T>>
): RegistryElement<GetAnalyserVoxel<T>> | undefined {
    const shadowCopy = structuredClone(element);
    const field = getField<T>(action.field, context);
    const unformattedValue = shadowCopy.data[field];

    let value: SlotRegistryType;
    if (isSlotRegistryType(action.value)) {
        value = action.value;
    } else {
        throw new Error(`Invalid SlotRegistryType: ${action.value}`);
    }

    let currentValue: SlotRegistryType[];
    if (isStringArray(unformattedValue) && isArraySlotRegistryType(unformattedValue)) {
        currentValue = unformattedValue;
    } else {
        throw new Error(`Invalid SlotRegistryType array: ${shadowCopy.data[field]}`);
    }

    return {
        identifier: element.identifier,
        data: {
            ...element.data,
            [field]: toggleSlot(currentValue, value)
        }
    };
}

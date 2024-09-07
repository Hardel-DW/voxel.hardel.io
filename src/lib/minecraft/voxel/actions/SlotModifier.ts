import type { ConfiguratorContextType } from "@/components/pages/tools/ConfiguratorContext.tsx";
import type { RegistryElement } from "@/lib/minecraft/mcschema.ts";
import { type SlotRegistryType, isArraySlotRegistryType, isSlotRegistryType, toggleSlot } from "@/lib/minecraft/registry/SlotRegistry.ts";
import { type Field, getField } from "@/lib/minecraft/voxel/field";
import { isStringArray } from "@/lib/utils.ts";

export type SlotAction = {
    type: "Slot";
    field: Field;
    value: string;
};

export function SlotModifier<T>(action: SlotAction, context: ConfiguratorContextType<T>): RegistryElement<T> | undefined {
    const { currentElement } = context;
    if (!currentElement) return;

    const shadowCopy = structuredClone(currentElement);
    const field = getField<T>(action.field, context);
    const unformattedValue = shadowCopy.data[field];

    let value: SlotRegistryType;
    if (isSlotRegistryType(action.value)) {
        value = action.value;
    } else {
        throw new Error(`Invalid SlotRegistryType: ${action.value}`);
    }

    let currentValue: SlotRegistryType[];
    // If it's array st
    if (isStringArray(unformattedValue) && isArraySlotRegistryType(unformattedValue)) {
        currentValue = unformattedValue;
    } else {
        throw new Error(`Invalid SlotRegistryType array: ${shadowCopy.data[field]}`);
    }

    return {
        identifier: currentElement.identifier,
        data: {
            ...currentElement.data,
            [field]: toggleSlot(currentValue, value)
        }
    };
}

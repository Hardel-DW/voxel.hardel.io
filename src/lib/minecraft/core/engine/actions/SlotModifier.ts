import type { Analysers, GetAnalyserVoxel } from "@/lib/minecraft/core/engine/Analyser.ts";
import { getManager } from "@/lib/minecraft/core/engine/Manager.ts";
import { type SlotRegistryType, isArraySlotRegistryType, isSlotRegistryType } from "@/lib/minecraft/core/engine/managers/SlotManager.ts";
import type { RegistryElement } from "@/lib/minecraft/mczip.ts";
import { isStringArray } from "@/lib/utils.ts";
import type { ActionValue, BaseAction } from ".";

export interface SlotAction extends BaseAction {
    type: "set_computed_slot";
    value: ActionValue;
}

/**
 * This action modifies the slot field of the element with the given value. It adds or removes the value from the slot. If the value is already in the slot, it will be removed, otherwise it will be added.
 * @param action - The action to perform.
 * @param element - The element to modify.
 * @param version - Extra data.
 * @constructor
 */
export function SlotModifier<T extends keyof Analysers>(
    action: SlotAction,
    element: RegistryElement<GetAnalyserVoxel<T>>,
    version: number
): RegistryElement<GetAnalyserVoxel<T>> | undefined {
    if (!version) throw new Error("Version is not set in the context");

    const shadowCopy = structuredClone(element);
    const { field } = action;
    const unformattedValue = shadowCopy.data[field];

    let value: SlotRegistryType;
    if (typeof action.value === "string" && isSlotRegistryType(action.value)) {
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

    // Utiliser le ManagerSelector pour obtenir le SlotManager approprié
    const slotManager = getManager("slot", version);
    if (!slotManager) {
        throw new Error(`SlotManager is not available for version ${version}`);
    }

    return {
        identifier: element.identifier,
        data: {
            ...element.data,
            [field]: slotManager.apply(currentValue, value)
        }
    };
}

import type { Analysers, GetAnalyserVoxel } from "@/lib/minecraft/core/engine/Analyser.ts";
import type { ExtraActionData } from "@/lib/minecraft/core/engine/actions/index.ts";
import { type Field, getField } from "@/lib/minecraft/core/engine/field";
import type { RegistryElement } from "@/lib/minecraft/mczip.ts";

export type DynamicAction = {
    type: "Dynamic";
    field: Field;
};

/**
 * Modifies the field of the element with the given value.
 * @param action - The action to perform.
 * @param value - The value to set.
 * @param context - The context of the configurator.
 * @param element - The element to modify.
 * @constructor
 */
export function DynamicModifier<T extends keyof Analysers>(
    action: DynamicAction,
    element: RegistryElement<GetAnalyserVoxel<T>>,
    extra: ExtraActionData
): RegistryElement<GetAnalyserVoxel<T>> | undefined {
    const { value, toggleSection } = extra;
    const field = getField<T>(action.field, toggleSection);

    return {
        identifier: element.identifier,
        data: {
            ...element.data,
            [field]: value
        }
    };
}

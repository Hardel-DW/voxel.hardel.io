import type { Analysers, GetAnalyserVoxel } from "@/lib/minecraft/core/engine/Analyser.ts";
import { type Field, getField } from "@/lib/minecraft/core/engine/field";
import type { RegistryElement } from "@/lib/minecraft/mczip.ts";
import type { ExtraActionData } from ".";

export type UndefinedAction = {
    type: "Undefined";
    field: Field;
};

/**
 * This action set the field of the element to undefined.
 * @param action
 * @param context
 * @param element
 * @constructor
 */
export function UndefinedModifier<T extends keyof Analysers>(
    action: UndefinedAction,
    element: RegistryElement<GetAnalyserVoxel<T>>,
    extra: ExtraActionData
): RegistryElement<GetAnalyserVoxel<T>> | undefined {
    const { toggleSection } = extra;
    const field = getField<T>(action.field, toggleSection);

    return {
        identifier: element.identifier,
        data: {
            ...element.data,
            [field]: undefined
        }
    };
}

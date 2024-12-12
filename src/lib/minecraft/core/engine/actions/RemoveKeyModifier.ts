import type { Analysers, GetAnalyserVoxel } from "@/lib/minecraft/core/engine/Analyser.ts";
import type { ExtraActionData } from "@/lib/minecraft/core/engine/actions/index.ts";
import { type Field, getField } from "@/lib/minecraft/core/engine/field";
import type { RegistryElement } from "@/lib/minecraft/mczip.ts";

export type RemoveKeyAction = {
    type: "RemoveKey";
    field: Field;
};

/**
 * This action removes a key from the field of the element.
 * @param action - The action to perform
 * @param value - The value to remove
 * @param context - The context of the configurator
 * @param element - The element to modify
 * @constructor
 */
export function RemoveKeyModifier<T extends keyof Analysers>(
    action: RemoveKeyAction,
    element: RegistryElement<GetAnalyserVoxel<T>>,
    extra: ExtraActionData
): RegistryElement<GetAnalyserVoxel<T>> | undefined {
    const { value, toggleSection } = extra;

    if (typeof value !== "string") {
        throw new Error("Remove Key action requires a string value");
    }

    const shadowCopy = structuredClone(element);
    const field = getField<T>(action.field, toggleSection);
    const effects = shadowCopy.data[field] as keyof typeof field | undefined;
    if (effects) {
        delete effects[value as keyof typeof field];
    }

    return {
        identifier: element.identifier,
        data: {
            ...element.data,
            [field]: effects
        }
    };
}

import type { ConfiguratorContextType } from "@/lib/minecraft/components/ConfiguratorContext.tsx";
import type { Analysers, GetAnalyserVoxel } from "@/lib/minecraft/core/engine/Analyser.ts";
import { type Field, getField } from "@/lib/minecraft/core/engine/field";
import type { RegistryElement } from "@/lib/minecraft/mczip.ts";

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
    context: ConfiguratorContextType<GetAnalyserVoxel<T>>,
    element: RegistryElement<GetAnalyserVoxel<T>>
): RegistryElement<GetAnalyserVoxel<T>> | undefined {
    const field = getField<T>(action.field, context);

    return {
        identifier: element.identifier,
        data: {
            ...element.data,
            [field]: undefined
        }
    };
}

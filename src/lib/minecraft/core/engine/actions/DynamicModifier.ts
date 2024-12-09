import type { ConfiguratorContextType } from "@/components/tools/ConfiguratorContext.tsx";
import type { Analysers, GetAnalyserVoxel } from "@/lib/minecraft/core/engine/Analyser.ts";
import type { ActionValue } from "@/lib/minecraft/core/engine/actions/index.ts";
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
    value: ActionValue,
    context: ConfiguratorContextType<GetAnalyserVoxel<T>>,
    element: RegistryElement<GetAnalyserVoxel<T>>
): RegistryElement<GetAnalyserVoxel<T>> | undefined {
    const field = getField<T>(action.field, context);

    return {
        identifier: element.identifier,
        data: {
            ...element.data,
            [field]: value
        }
    };
}

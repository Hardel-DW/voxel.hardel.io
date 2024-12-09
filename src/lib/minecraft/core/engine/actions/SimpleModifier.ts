import type { ConfiguratorContextType } from "@/components/tools/ConfiguratorContext.tsx";
import type { Analysers, GetAnalyserVoxel } from "@/lib/minecraft/core/engine/Analyser.ts";
import { type Field, getField } from "@/lib/minecraft/core/engine/field";
import type { RegistryElement } from "@/lib/minecraft/mczip.ts";

export type SimpleActionMode = "toggle";

export type BooleanAction = {
    type: "Boolean";
    field: Field;
    value: boolean;
    mode?: SimpleActionMode;
};

export type StringAction = {
    type: "String";
    field: Field;
    value: string;
    mode?: SimpleActionMode;
};

export type NumberAction = {
    type: "Number";
    field: Field;
    value: number;
    mode?: SimpleActionMode;
};

/**
 * Modifies the field of the element with the hardcoded value given.
 * @param action - The action to perform.
 * @param context - The context of the configurator.
 * @param element - The element to modify.
 * @constructor
 */
export function SimpleModifier<T extends keyof Analysers>(
    action: BooleanAction | StringAction | NumberAction,
    context: ConfiguratorContextType<GetAnalyserVoxel<T>>,
    element: RegistryElement<GetAnalyserVoxel<T>>
): RegistryElement<GetAnalyserVoxel<T>> | undefined {
    const field = getField<T>(action.field, context);

    if (action.mode === "toggle" && element.data[field] === action.value) {
        return {
            identifier: element.identifier,
            data: {
                ...element.data,
                [field]: undefined
            }
        };
    }

    return {
        identifier: element.identifier,
        data: {
            ...element.data,
            [field]: action.value
        }
    };
}

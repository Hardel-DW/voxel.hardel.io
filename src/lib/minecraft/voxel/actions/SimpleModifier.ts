import type { ConfiguratorContextType } from "@/components/pages/tools/ConfiguratorContext.tsx";
import type { RegistryElement } from "@/lib/minecraft/mcschema.ts";
import { type Field, getField } from "@/lib/minecraft/voxel/field";

export type BooleanAction = {
    type: "Boolean";
    field: Field;
    value: boolean;
};

export type StringAction = {
    type: "String";
    field: Field;
    value: string;
};

export type NumberAction = {
    type: "Number";
    field: Field;
    value: number;
};

export function SimpleModifier<T>(
    action: BooleanAction | StringAction | NumberAction,
    context: ConfiguratorContextType<T>
): RegistryElement<T> | undefined {
    const { currentElement } = context;
    if (!currentElement) return;
    const field = getField<T>(action.field, context);

    return {
        identifier: currentElement.identifier,
        data: {
            ...currentElement.data,
            [field]: action.value
        }
    };
}

import type { ConfiguratorContextType } from "@/components/pages/tools/ConfiguratorContext.tsx";
import type { RegistryElement } from "@/lib/minecraft/mcschema.ts";
import { type Field, getField } from "@/lib/minecraft/voxel/field";

export type DynamicAction = {
    type: "Dynamic";
    field: Field;
};

export function DynamicModifier<T>(
    action: DynamicAction,
    value: string | boolean | number,
    context: ConfiguratorContextType<T>
): RegistryElement<T> | undefined {
    const { currentElement } = context;
    if (!currentElement) return;
    const field = getField<T>(action.field, context);

    return {
        identifier: currentElement.identifier,
        data: {
            ...currentElement.data,
            [field]: value
        }
    };
}

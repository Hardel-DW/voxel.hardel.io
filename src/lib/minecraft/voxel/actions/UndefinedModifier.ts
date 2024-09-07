import type { ConfiguratorContextType } from "@/components/pages/tools/ConfiguratorContext.tsx";
import type { RegistryElement } from "@/lib/minecraft/mcschema.ts";
import { type Field, getField } from "@/lib/minecraft/voxel/field";

export type UndefinedAction = {
    type: "Undefined";
    field: Field;
};

export function UndefinedModifier<T>(action: UndefinedAction, context: ConfiguratorContextType<T>): RegistryElement<T> | undefined {
    const { currentElement } = context;
    if (!currentElement) return;
    const field = getField<T>(action.field, context);

    return {
        identifier: currentElement.identifier,
        data: {
            ...currentElement.data,
            [field]: undefined
        }
    };
}

import type { ConfiguratorContextType } from "@/components/pages/tools/ConfiguratorContext.tsx";
import type { Identifier } from "@/lib/minecraft/core/Identifier.ts";
import type { RegistryElement } from "@/lib/minecraft/mcschema.ts";
import { type Field, getField } from "@/lib/minecraft/voxel/field";

export type SoftDeleteAction = {
    type: "SoftDelete";
    identifier: Identifier;
    field: Field;
};

export function SoftDeleteModifier<T>(
    action: SoftDeleteAction,
    value: string | boolean | number,
    context: ConfiguratorContextType<T>
): RegistryElement<T> | undefined {
    const { elements, currentElement } = context;
    if (elements.length === 0) return;
    const field = getField<T>(action.field, context);

    if (currentElement?.identifier.equals(action.identifier)) {
        return {
            identifier: currentElement?.identifier,
            data: {
                ...currentElement?.data,
                [field]: value
            }
        };
    }

    context.setElements((prev) => {
        const index = prev.findIndex((element) => element.identifier.equals(action.identifier));
        if (index === -1) return prev;
        return prev.map((element, i) => (i === index ? { ...element, data: { ...element.data, [field]: value } } : element));
    });
}

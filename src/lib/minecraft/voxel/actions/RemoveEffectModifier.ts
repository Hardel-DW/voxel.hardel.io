import type { ConfiguratorContextType } from "@/components/pages/tools/ConfiguratorContext.tsx";
import type { RegistryElement } from "@/lib/minecraft/mcschema.ts";
import type { EffectComponentsRecord } from "@/lib/minecraft/schema/enchantment/EffectComponents.ts";
import type { ActionValue } from "@/lib/minecraft/voxel/actions/index.ts";
import { type Field, getField } from "@/lib/minecraft/voxel/field";

export type RemoveEffectAction = {
    type: "RemoveEffect";
    field: Field;
};

export function RemoveEffectModifier<T>(
    action: RemoveEffectAction,
    value: ActionValue,
    context: ConfiguratorContextType<T>
): RegistryElement<T> | undefined {
    if (typeof value !== "string") {
        throw new Error("RemoveEffect action requires a string value");
    }

    const { currentElement } = context;
    if (!currentElement) return;

    const shadowCopy = structuredClone(currentElement);
    const field = getField<T>(action.field, context);

    const effects = shadowCopy.data[field] as EffectComponentsRecord | undefined;
    if (effects) {
        delete effects[value as keyof EffectComponentsRecord];
    }

    return {
        identifier: currentElement.identifier,
        data: {
            ...currentElement.data,
            [field]: effects
        }
    };
}

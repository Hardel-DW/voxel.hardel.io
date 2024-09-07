import type { ConfiguratorContextType } from "@/components/pages/tools/ConfiguratorContext.tsx";
import type { ConditionResult } from "@/lib/minecraft/voxel/condition";
import { type Field, getField } from "@/lib/minecraft/voxel/field";

export type ConditionEqualsUndefined = {
    type: "Undefined";
    field: Field;
};

export function CheckEqualConditionUndefined<T>(condition: ConditionEqualsUndefined, context: ConfiguratorContextType<T>): ConditionResult {
    const { currentElement } = context;
    if (!currentElement) return { value: false };
    const field = getField<T>(condition.field, context);
    const fieldValue = currentElement.data[field];

    return { value: fieldValue === undefined };
}

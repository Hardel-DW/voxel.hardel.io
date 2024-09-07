import type { ConfiguratorContextType } from "@/components/pages/tools/ConfiguratorContext.tsx";
import type { ConditionResult } from "@/lib/minecraft/voxel/condition";
import { type Field, getField } from "@/lib/minecraft/voxel/field";

export type ConditionEqualsString = {
    type: "String";
    field: Field;
    value: string;
};

export function CheckEqualConditionString<T>(condition: ConditionEqualsString, context: ConfiguratorContextType<T>): ConditionResult {
    const { currentElement } = context;
    if (!currentElement) return { value: false };
    const field = getField<T>(condition.field, context);

    const conditionValues = condition.value;
    const enchantValue = currentElement.data[field];

    if (!enchantValue || typeof enchantValue !== "string") {
        return { value: false };
    }

    return { value: enchantValue === conditionValues };
}

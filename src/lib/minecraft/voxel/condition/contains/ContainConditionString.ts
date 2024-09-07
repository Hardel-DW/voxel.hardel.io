import type { ConfiguratorContextType } from "@/components/pages/tools/ConfiguratorContext.tsx";
import type { ConditionResult } from "@/lib/minecraft/voxel/condition";
import { type Field, getField } from "@/lib/minecraft/voxel/field";

export type ConditionContainString = {
    type: "String";
    field: Field;
    values: string[];
};

export function CheckContainConditionString<T>(condition: ConditionContainString, context: ConfiguratorContextType<T>): ConditionResult {
    const { currentElement } = context;
    if (!currentElement) return { value: false };

    const field = getField<T>(condition.field, context);
    const conditionValues = condition.values;
    const enchantValues = currentElement.data[field];
    if (!Array.isArray(enchantValues) || !enchantValues.every((item) => typeof item === "string")) return { value: false };

    const typedValues = enchantValues as string[];
    const match = conditionValues.find((value) => typedValues.includes(value));
    if (!match) return { value: false };

    return { value: true };
}

import type { ActionValue } from "@/lib/minecraft/core/engine/actions";
import type { RegistryElement } from "@/lib/minecraft/mczip.ts";
import type { BaseCondition } from "@/lib/minecraft/core/engine/condition";

export interface ConditionContainValue extends BaseCondition {
    condition: "contains_in_value";
    values?: string[];
}

export function CheckContainConditionValue(
    condition: ConditionContainValue,
    element: RegistryElement<Record<string, unknown>>,
    value?: ActionValue
): boolean {
    const fieldValue = element.data[condition.field];
    if (!Array.isArray(fieldValue) || !fieldValue.every((item) => typeof item === "string")) return false;

    const values = condition.values ? condition.values : fieldValue;
    const typedValues = fieldValue as string[];
    return values.some((element) => typedValues.includes(value && typeof value === "string" ? value : element));
}

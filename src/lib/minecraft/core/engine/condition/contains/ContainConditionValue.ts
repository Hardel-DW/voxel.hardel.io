import type { Analysers, GetAnalyserVoxel } from "@/lib/minecraft/core/engine/Analyser.ts";
import type { ActionValue } from "@/lib/minecraft/core/engine/actions";
import type { RegistryElement } from "@/lib/minecraft/mczip.ts";

export type ConditionContainValue = {
    condition: "contains_in_value";
    field: string;
    values?: string[];
};

export function CheckContainConditionValue<T extends keyof Analysers>(
    condition: ConditionContainValue,
    element: RegistryElement<GetAnalyserVoxel<T>>,
    value?: ActionValue
): boolean {
    const fieldValue = element.data[condition.field];
    if (!Array.isArray(fieldValue) || !fieldValue.every((item) => typeof item === "string")) return false;

    const values = condition.values ? condition.values : fieldValue;
    const typedValues = fieldValue as string[];
    return values.some((element) => typedValues.includes(value && typeof value === "string" ? value : element));
}

import type { Analysers, GetAnalyserVoxel } from "@/lib/minecraft/core/engine/Analyser.ts";
import type { ActionValue } from "@/lib/minecraft/core/engine/actions";
import { type Field, getField } from "@/lib/minecraft/core/engine/field";
import type { RegistryElement } from "@/lib/minecraft/mczip.ts";
import type { ToggleSectionMap } from "@/lib/minecraft/core/schema/primitive/toggle";

export type ConditionContainString = {
    type: "String";
    field: Field;
    values?: string[];
};

export function CheckContainConditionString<T extends keyof Analysers>(
    condition: ConditionContainString,
    element: RegistryElement<GetAnalyserVoxel<T>>,
    toggleSection: ToggleSectionMap | undefined,
    value?: ActionValue
): boolean {
    const field = getField<T>(condition.field, toggleSection);
    const fieldValue = element.data[field];
    if (!Array.isArray(fieldValue) || !fieldValue.every((item) => typeof item === "string")) return false;

    const values = condition.values ? condition.values : fieldValue;
    const typedValues = fieldValue as string[];
    return values.some((element) => typedValues.includes(value && typeof value === "string" ? value : element));
}

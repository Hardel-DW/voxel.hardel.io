import type { Analysers, GetAnalyserVoxel } from "@/lib/minecraft/core/engine/Analyser.ts";
import type { RegistryElement } from "@/lib/minecraft/mczip.ts";

export type ConditionEqualsFieldValue = {
    condition: "compare_value_to_field_value";
    field: string;
    value: string;
};

export function CheckEqualFieldValueCondition<T extends keyof Analysers>(
    condition: ConditionEqualsFieldValue,
    element: RegistryElement<GetAnalyserVoxel<T>>
): boolean {
    const compared = element.data[condition.field];
    if (!compared || typeof compared !== "string") {
        return false;
    }

    return compared === condition.value;
}

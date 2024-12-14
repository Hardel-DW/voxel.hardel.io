import type { Analysers, GetAnalyserVoxel } from "@/lib/minecraft/core/engine/Analyser.ts";
import type { RegistryElement } from "@/lib/minecraft/mczip.ts";

export type ConditionEqualsString = {
    type: "String";
    field: string;
    value: string;
};

export function CheckEqualConditionString<T extends keyof Analysers>(
    condition: ConditionEqualsString,
    element: RegistryElement<GetAnalyserVoxel<T>>
): boolean {
    const enchantValue = element.data[condition.field];
    if (!enchantValue || typeof enchantValue !== "string") {
        return false;
    }

    return enchantValue === condition.value;
}

import type { Analysers, GetAnalyserVoxel } from "@/lib/minecraft/core/engine/Analyser.ts";
import type { RegistryElement } from "@/lib/minecraft/mczip.ts";

export type ConditionEqualsUndefined = {
    type: "Undefined";
    field: string;
};

export function CheckEqualConditionUndefined<T extends keyof Analysers>(
    condition: ConditionEqualsUndefined,
    element: RegistryElement<GetAnalyserVoxel<T>>
): boolean {
    return element.data[condition.field] === undefined;
}

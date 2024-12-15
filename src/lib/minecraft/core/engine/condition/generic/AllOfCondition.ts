import type { Analysers, GetAnalyserVoxel } from "@/lib/minecraft/core/engine/Analyser.ts";
import type { ActionValue } from "@/lib/minecraft/core/engine/actions";
import { type Condition, checkCondition } from "@/lib/minecraft/core/engine/condition";
import type { RegistryElement } from "@/lib/minecraft/mczip.ts";

export type AllOfCondition = {
    condition: "all_of";
    terms: Condition[];
};

export function checkAllOfCondition<T extends keyof Analysers>(
    condition: AllOfCondition,
    element: RegistryElement<GetAnalyserVoxel<T>>,
    value?: ActionValue
): boolean {
    return condition.terms.every((subCondition) => checkCondition(subCondition, element, value));
}

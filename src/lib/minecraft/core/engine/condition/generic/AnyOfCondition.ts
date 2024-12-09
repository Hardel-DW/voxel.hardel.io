import type { ConfiguratorContextType } from "@/components/tools/ConfiguratorContext.tsx";
import type { Analysers, GetAnalyserVoxel } from "@/lib/minecraft/core/engine/Analyser.ts";
import type { ActionValue } from "@/lib/minecraft/core/engine/actions";
import { type Condition, checkCondition } from "@/lib/minecraft/core/engine/condition";
import type { RegistryElement } from "@/lib/minecraft/mczip.ts";

export type AnyOfCondition = {
    condition: "AnyOf";
    conditions: Condition[];
};

export function checkAnyOfCondition<T extends keyof Analysers>(
    condition: AnyOfCondition,
    context: ConfiguratorContextType<GetAnalyserVoxel<T>>,
    element: RegistryElement<GetAnalyserVoxel<T>>,
    value?: ActionValue
): boolean {
    return condition.conditions.some((subCondition) => checkCondition(subCondition, context, element, value));
}

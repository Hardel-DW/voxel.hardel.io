import type { ConfiguratorContextType } from "@/lib/minecraft/components/ConfiguratorContext.tsx";
import type { Analysers, GetAnalyserVoxel } from "@/lib/minecraft/core/engine/Analyser.ts";
import type { ActionValue } from "@/lib/minecraft/core/engine/actions";
import { CheckContainCondition, type ContainCondition } from "@/lib/minecraft/core/engine/condition/contains/ContainCondition.ts";
import { CheckEqualsCondition, type EqualCondition } from "@/lib/minecraft/core/engine/condition/equals/EqualCondition.ts";
import { type AllOfCondition, checkAllOfCondition } from "@/lib/minecraft/core/engine/condition/generic/AllOfCondition.ts";
import { type AnyOfCondition, checkAnyOfCondition } from "@/lib/minecraft/core/engine/condition/generic/AnyOfCondition.ts";
import { type InvertedCondition, checkInvertedCondition } from "@/lib/minecraft/core/engine/condition/generic/InvertedCondition.ts";
import type { RegistryElement } from "@/lib/minecraft/mczip.ts";
import type { GetValueFromContext } from "@/lib/minecraft/core/engine";

export type Condition = ContainCondition | EqualCondition | AllOfCondition | AnyOfCondition | InvertedCondition;

export function checkCondition<T extends keyof Analysers>(
    condition: GetValueFromContext<Condition> | undefined,
    context: ConfiguratorContextType<GetAnalyserVoxel<T>>,
    element: RegistryElement<GetAnalyserVoxel<T>>,
    value?: ActionValue
): boolean {
    if (typeof condition === "object" && "type" in condition && condition.type === "get_value_from_context") {
        return false;
    }

    if (!condition) return true;

    switch (condition.condition) {
        case "Equals":
            return CheckEqualsCondition<T>(condition, context, element);
        case "Contains":
            return CheckContainCondition<T>(condition, context, element, value);
        case "AllOf":
            return checkAllOfCondition<T>(condition, context, element, value);
        case "AnyOf":
            return checkAnyOfCondition<T>(condition, context, element, value);
        case "Inverted":
            return checkInvertedCondition<T>(condition, context, element, value);
        default:
            return false;
    }
}

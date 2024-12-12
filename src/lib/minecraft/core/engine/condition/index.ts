import type { Analysers, GetAnalyserVoxel } from "@/lib/minecraft/core/engine/Analyser.ts";
import type { ActionValue } from "@/lib/minecraft/core/engine/actions";
import { CheckContainCondition, type ContainCondition } from "@/lib/minecraft/core/engine/condition/contains/ContainCondition.ts";
import { CheckEqualsCondition, type EqualCondition } from "@/lib/minecraft/core/engine/condition/equals/EqualCondition.ts";
import { type AllOfCondition, checkAllOfCondition } from "@/lib/minecraft/core/engine/condition/generic/AllOfCondition.ts";
import { type AnyOfCondition, checkAnyOfCondition } from "@/lib/minecraft/core/engine/condition/generic/AnyOfCondition.ts";
import { type InvertedCondition, checkInvertedCondition } from "@/lib/minecraft/core/engine/condition/generic/InvertedCondition.ts";
import type { ToggleSection } from "@/lib/minecraft/core/schema/primitive/toggle";
import type { RegistryElement } from "@/lib/minecraft/mczip.ts";

export type Condition = ContainCondition | EqualCondition | AllOfCondition | AnyOfCondition | InvertedCondition;

export function checkCondition<T extends keyof Analysers>(
    condition: Condition | undefined,
    element: RegistryElement<GetAnalyserVoxel<T>>,
    toggleSection: Record<string, ToggleSection> | undefined,
    value?: ActionValue
): boolean {
    if (!condition) return true;

    switch (condition.condition) {
        case "Equals":
            return CheckEqualsCondition<T>(condition, element, toggleSection);
        case "Contains":
            return CheckContainCondition<T>(condition, element, toggleSection, value);
        case "AllOf":
            return checkAllOfCondition<T>(condition, element, toggleSection, value);
        case "AnyOf":
            return checkAnyOfCondition<T>(condition, element, toggleSection, value);
        case "Inverted":
            return checkInvertedCondition<T>(condition, element, toggleSection, value);
        default:
            return false;
    }
}

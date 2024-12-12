import type { Analysers, GetAnalyserVoxel } from "@/lib/minecraft/core/engine/Analyser.ts";
import type { ActionValue } from "@/lib/minecraft/core/engine/actions";
import { type Condition, checkCondition } from "@/lib/minecraft/core/engine/condition";
import type { RegistryElement } from "@/lib/minecraft/mczip.ts";
import type { ToggleSectionMap } from "@/lib/minecraft/core/schema/primitive/toggle";

export type InvertedCondition = {
    condition: "Inverted";
    invertedCondition: Condition;
};

export function checkInvertedCondition<T extends keyof Analysers>(
    condition: InvertedCondition,
    element: RegistryElement<GetAnalyserVoxel<T>>,
    toggleSection: ToggleSectionMap | undefined,
    value?: ActionValue
): boolean {
    return !checkCondition(condition.invertedCondition, element, toggleSection, value);
}

import type { ActionValue } from "@/lib/minecraft/core/engine/actions";
import { type Condition, checkCondition } from "@/lib/minecraft/core/engine/condition";
import type { RegistryElement } from "@/lib/minecraft/mczip.ts";

export type InvertedCondition = {
    condition: "inverted";
    terms: Condition;
};

export function checkInvertedCondition(
    condition: InvertedCondition,
    element: RegistryElement<Record<string, unknown>>,
    value?: ActionValue
): boolean {
    return !checkCondition(condition.terms, element, value);
}

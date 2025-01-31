import type { ActionValue } from "@/lib/minecraft/core/engine/actions";
import { type Condition, checkCondition } from "@/lib/minecraft/core/engine/condition";

export type AnyOfCondition = {
    condition: "any_of";
    terms: Condition[];
};

export function checkAnyOfCondition(condition: AnyOfCondition, element: Record<string, unknown>, value?: ActionValue): boolean {
    return condition.terms.some((subCondition) => checkCondition(subCondition, element, value));
}

import type { ActionValue } from "@/lib/minecraft/core/engine/actions";
import { type Condition, checkCondition } from "@/lib/minecraft/core/engine/condition";

export type AllOfCondition = {
    condition: "all_of";
    terms: Condition[];
};

export function checkAllOfCondition(condition: AllOfCondition, element: Record<string, unknown>, value?: ActionValue): boolean {
    return condition.terms.every((subCondition) => checkCondition(subCondition, element, value));
}

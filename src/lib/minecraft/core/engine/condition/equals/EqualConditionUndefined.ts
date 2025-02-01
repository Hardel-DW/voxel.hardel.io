import type { BaseCondition } from "@/lib/minecraft/core/engine/condition";

export interface ConditionEqualsUndefined extends BaseCondition {
    condition: "if_field_is_undefined";
}

export function CheckEqualConditionUndefined(condition: ConditionEqualsUndefined, element: Record<string, unknown>): boolean {
    return element[condition.field] === undefined;
}

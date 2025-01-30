import type { RegistryElement } from "@/lib/minecraft/mczip.ts";
import type { BaseCondition } from "@/lib/minecraft/core/engine/condition";

export interface ConditionEqualsUndefined extends BaseCondition {
    condition: "if_field_is_undefined";
}

export function CheckEqualConditionUndefined(
    condition: ConditionEqualsUndefined,
    element: RegistryElement<Record<string, unknown>>
): boolean {
    return element.data[condition.field] === undefined;
}

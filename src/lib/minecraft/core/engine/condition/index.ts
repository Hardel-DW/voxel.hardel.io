import type { ActionValue } from "@/lib/minecraft/core/engine/actions";
import type { RegistryElement } from "@/lib/minecraft/mczip.ts";
import { CheckContainConditionTags, type ConditionContainTags } from "./contains/ContainConditionTags";
import { CheckContainConditionValue, type ConditionContainValue } from "./contains/ContainConditionValue";
import { CheckEqualConditionString, type ConditionEqualsString } from "./equals/EqualConditionString.ts";
import { CheckEqualConditionUndefined, type ConditionEqualsUndefined } from "./equals/EqualConditionUndefined.ts";
import { CheckEqualFieldValueCondition, type ConditionEqualsFieldValue } from "./equals/EqualFieldValueCondition.ts";
import { CheckNamespaceCondition, type ConditionNamespace } from "./equals/EqualNamespace.ts";
import { type AllOfCondition, checkAllOfCondition } from "./generic/AllOfCondition.ts";
import { type AnyOfCondition, checkAnyOfCondition } from "./generic/AnyOfCondition.ts";
import { type InvertedCondition, checkInvertedCondition } from "./generic/InvertedCondition.ts";

export type BaseCondition = {
    field: string;
};

export type Condition =
    | ConditionEqualsString
    | ConditionEqualsUndefined
    | ConditionEqualsFieldValue
    | ConditionContainValue
    | ConditionContainTags
    | ConditionNamespace
    | AllOfCondition
    | AnyOfCondition
    | InvertedCondition;

export function checkCondition(
    condition: Condition | undefined,
    element: RegistryElement<Record<string, unknown>>,
    value?: ActionValue
): boolean {
    if (!condition) return true;

    switch (condition.condition) {
        case "compare_to_value":
            return CheckEqualConditionString(condition);
        case "compare_value_to_field_value":
            return CheckEqualFieldValueCondition(condition, element);
        case "if_field_is_undefined":
            return CheckEqualConditionUndefined(condition, element);
        case "contains_in_value":
            return CheckContainConditionValue(condition, element, value);
        case "contains_in_tags":
            return CheckContainConditionTags(condition, element);
        case "check_namespace":
            return CheckNamespaceCondition(condition, element);
        case "all_of":
            return checkAllOfCondition(condition, element, value);
        case "any_of":
            return checkAnyOfCondition(condition, element, value);
        case "inverted":
            return checkInvertedCondition(condition, element, value);
        default:
            return false;
    }
}

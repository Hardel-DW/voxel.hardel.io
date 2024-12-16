import type { RegistryElement } from "@/lib/minecraft/mczip.ts";
import type { Analysers, GetAnalyserVoxel } from "@/lib/minecraft/core/engine/Analyser.ts";
import type { ActionValue } from "@/lib/minecraft/core/engine/actions";
import { checkAllOfCondition, type AllOfCondition } from "./generic/AllOfCondition.ts";
import { checkAnyOfCondition, type AnyOfCondition } from "./generic/AnyOfCondition.ts";
import { checkInvertedCondition, type InvertedCondition } from "./generic/InvertedCondition.ts";
import { CheckEqualFieldValueCondition, type ConditionEqualsFieldValue } from "./equals/EqualFieldValueCondition.ts";
import { CheckEqualConditionString, type ConditionEqualsString } from "./equals/EqualConditionString.ts";
import { CheckEqualConditionUndefined, type ConditionEqualsUndefined } from "./equals/EqualConditionUndefined.ts";
import { CheckContainConditionTags, type ConditionContainTags } from "./contains/ContainConditionTags";
import { CheckContainConditionValue, type ConditionContainValue } from "./contains/ContainConditionValue";

export type Condition =
    | ConditionEqualsString
    | ConditionEqualsUndefined
    | ConditionEqualsFieldValue
    | ConditionContainValue
    | ConditionContainTags
    | AllOfCondition
    | AnyOfCondition
    | InvertedCondition;

export function checkCondition<T extends keyof Analysers>(
    condition: Condition | undefined,
    element: RegistryElement<GetAnalyserVoxel<T>>,
    value?: ActionValue
): boolean {
    if (!condition) return true;

    switch (condition.condition) {
        case "compare_to_value":
            return CheckEqualConditionString(condition);
        case "compare_value_to_field_value":
            return CheckEqualFieldValueCondition<T>(condition, element);
        case "if_field_is_undefined":
            return CheckEqualConditionUndefined<T>(condition, element);
        case "contains_in_value":
            return CheckContainConditionValue<T>(condition, element, value);
        case "contains_in_tags":
            return CheckContainConditionTags<T>(condition, element);
        case "all_of":
            return checkAllOfCondition<T>(condition, element, value);
        case "any_of":
            return checkAnyOfCondition<T>(condition, element, value);
        case "inverted":
            return checkInvertedCondition<T>(condition, element, value);
        default:
            return false;
    }
}

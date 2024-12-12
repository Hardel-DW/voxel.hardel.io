import type { Analysers, GetAnalyserVoxel } from "@/lib/minecraft/core/engine/Analyser.ts";
import {
    CheckEqualConditionToggleField,
    type ConditionEqualsToggleField
} from "@/lib/minecraft/core/engine/condition/equals/CheckEqualConditionToggleField.ts";
import {
    CheckEqualConditionToggleName,
    type ConditionEqualsToggleName
} from "@/lib/minecraft/core/engine/condition/equals/CheckEqualConditionToggleName.ts";
import {
    CheckEqualConditionString,
    type ConditionEqualsString
} from "@/lib/minecraft/core/engine/condition/equals/EqualConditionString.ts";
import {
    CheckEqualConditionUndefined,
    type ConditionEqualsUndefined
} from "@/lib/minecraft/core/engine/condition/equals/EqualConditionUndefined.ts";
import type { RegistryElement } from "@/lib/minecraft/mczip.ts";
import type { ToggleSectionMap } from "@/lib/minecraft/core/schema/primitive/toggle";

export type EqualCondition = {
    condition: "Equals";
} & EqualConditionType;

type EqualConditionType = ConditionEqualsString | ConditionEqualsToggleName | ConditionEqualsToggleField | ConditionEqualsUndefined;

export function CheckEqualsCondition<T extends keyof Analysers>(
    condition: EqualCondition,
    element: RegistryElement<GetAnalyserVoxel<T>>,
    toggleSection: ToggleSectionMap | undefined
): boolean {
    switch (condition.type) {
        case "String": {
            return CheckEqualConditionString<T>(condition, element, toggleSection);
        }

        case "compare_to_toggle_name": {
            return CheckEqualConditionToggleName(condition, toggleSection);
        }

        case "compare_to_toggle_field": {
            return CheckEqualConditionToggleField(condition, toggleSection);
        }

        case "Undefined": {
            return CheckEqualConditionUndefined<T>(condition, element, toggleSection);
        }
    }
}

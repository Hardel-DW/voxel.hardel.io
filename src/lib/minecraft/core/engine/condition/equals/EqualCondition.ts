import type { ConfiguratorContextType } from "@/lib/minecraft/components/ConfiguratorContext.tsx";
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

export type EqualCondition = {
    condition: "Equals";
} & EqualConditionType;

type EqualConditionType = ConditionEqualsString | ConditionEqualsToggleName | ConditionEqualsToggleField | ConditionEqualsUndefined;

export function CheckEqualsCondition<T extends keyof Analysers>(
    condition: EqualCondition,
    context: ConfiguratorContextType<GetAnalyserVoxel<T>>,
    element: RegistryElement<GetAnalyserVoxel<T>>
): boolean {
    switch (condition.type) {
        case "String": {
            return CheckEqualConditionString<T>(condition, context, element);
        }

        case "compare_to_toggle_name": {
            return CheckEqualConditionToggleName<T>(condition, context);
        }

        case "compare_to_toggle_field": {
            return CheckEqualConditionToggleField<T>(condition, context);
        }

        case "Undefined": {
            return CheckEqualConditionUndefined<T>(condition, context, element);
        }
    }
}

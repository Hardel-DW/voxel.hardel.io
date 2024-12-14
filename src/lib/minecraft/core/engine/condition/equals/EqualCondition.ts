import type { Analysers, GetAnalyserVoxel } from "@/lib/minecraft/core/engine/Analyser.ts";
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

type EqualConditionType = ConditionEqualsString | ConditionEqualsUndefined;

export function CheckEqualsCondition<T extends keyof Analysers>(
    condition: EqualCondition,
    element: RegistryElement<GetAnalyserVoxel<T>>
): boolean {
    switch (condition.type) {
        case "String": {
            return CheckEqualConditionString<T>(condition, element);
        }

        case "Undefined": {
            return CheckEqualConditionUndefined<T>(condition, element);
        }
    }
}

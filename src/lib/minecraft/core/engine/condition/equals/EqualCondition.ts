import type { ConfiguratorContextType } from "@/lib/minecraft/components/ConfiguratorContext.tsx";
import type { Analysers, GetAnalyserVoxel } from "@/lib/minecraft/core/engine/Analyser.ts";
import {
    CheckEqualConditionString,
    type ConditionEqualsString
} from "@/lib/minecraft/core/engine/condition/equals/EqualConditionString.ts";
import {
    CheckEqualConditionToggle,
    type ConditionEqualsToggle
} from "@/lib/minecraft/core/engine/condition/equals/EqualConditionToggle.ts";
import {
    CheckEqualConditionUndefined,
    type ConditionEqualsUndefined
} from "@/lib/minecraft/core/engine/condition/equals/EqualConditionUndefined.ts";
import type { RegistryElement } from "@/lib/minecraft/mczip.ts";

export type EqualCondition = {
    condition: "Equals";
} & EqualConditionType;

type EqualConditionType = ConditionEqualsString | ConditionEqualsToggle | ConditionEqualsUndefined;

export function CheckEqualsCondition<T extends keyof Analysers>(
    condition: EqualCondition,
    context: ConfiguratorContextType<GetAnalyserVoxel<T>>,
    element: RegistryElement<GetAnalyserVoxel<T>>
): boolean {
    switch (condition.type) {
        case "String": {
            return CheckEqualConditionString<T>(condition, context, element);
        }

        case "Toggle": {
            return CheckEqualConditionToggle<T>(condition, context);
        }

        case "Undefined": {
            return CheckEqualConditionUndefined<T>(condition, context, element);
        }
    }
}

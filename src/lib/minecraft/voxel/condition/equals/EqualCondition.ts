import type { ConfiguratorContextType } from "@/components/pages/tools/ConfiguratorContext.tsx";
import type { ConditionResult } from "@/lib/minecraft/voxel/condition";
import { CheckEqualConditionString, type ConditionEqualsString } from "@/lib/minecraft/voxel/condition/equals/EqualConditionString.ts";
import { CheckEqualConditionToggle, type ConditionEqualsToggle } from "@/lib/minecraft/voxel/condition/equals/EqualConditionToggle.ts";
import {
    CheckEqualConditionUndefined,
    type ConditionEqualsUndefined
} from "@/lib/minecraft/voxel/condition/equals/EqualConditionUndefined.ts";

export type EqualCondition = {
    condition: "Equals";
} & EqualConditionType;

type EqualConditionType = ConditionEqualsString | ConditionEqualsToggle | ConditionEqualsUndefined;

export function CheckEqualsCondition<T>(condition: EqualCondition, context: ConfiguratorContextType<T>): ConditionResult {
    switch (condition.type) {
        case "String": {
            return CheckEqualConditionString<T>(condition, context);
        }

        case "Toggle": {
            return CheckEqualConditionToggle<T>(condition, context);
        }

        case "Undefined": {
            return CheckEqualConditionUndefined<T>(condition, context);
        }
    }
}

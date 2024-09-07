import type { ConfiguratorContextType } from "@/components/pages/tools/ConfiguratorContext.tsx";
import type { ConditionResult } from "@/lib/minecraft/voxel/condition";
import {
    CheckContainConditionString,
    type ConditionContainString
} from "@/lib/minecraft/voxel/condition/contains/ContainConditionString.ts";
import { CheckContainConditionTags, type ConditionContainTags } from "@/lib/minecraft/voxel/condition/contains/ContainConditionTags.ts";

export type ContainCondition = {
    condition: "Contains";
} & ContainConditionType;

type ContainConditionType = ConditionContainString | ConditionContainTags;

export function CheckContainCondition<T>(condition: ContainConditionType, context: ConfiguratorContextType<T>): ConditionResult {
    switch (condition.type) {
        case "String": {
            return CheckContainConditionString<T>(condition, context);
        }

        case "Tags": {
            return CheckContainConditionTags<T>(condition, context);
        }
    }
}

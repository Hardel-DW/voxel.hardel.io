import type { Analysers, GetAnalyserVoxel } from "@/lib/minecraft/core/engine/Analyser.ts";
import type { ActionValue } from "@/lib/minecraft/core/engine/actions";
import {
    CheckContainConditionString,
    type ConditionContainString
} from "@/lib/minecraft/core/engine/condition/contains/ContainConditionString.ts";
import {
    CheckContainConditionTags,
    type ConditionContainTags
} from "@/lib/minecraft/core/engine/condition/contains/ContainConditionTags.ts";
import type { RegistryElement } from "@/lib/minecraft/mczip.ts";

export type ContainCondition = {
    condition: "Contains";
} & ContainConditionType;

type ContainConditionType = ConditionContainString | ConditionContainTags;

export function CheckContainCondition<T extends keyof Analysers>(
    condition: ContainConditionType,
    element: RegistryElement<GetAnalyserVoxel<T>>,
    value?: ActionValue
): boolean {
    switch (condition.type) {
        case "String": {
            return CheckContainConditionString<T>(condition, element, value);
        }

        case "Tags": {
            return CheckContainConditionTags<T>(condition, element);
        }
    }
}

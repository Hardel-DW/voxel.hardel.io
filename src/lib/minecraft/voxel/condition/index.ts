import type { ConfiguratorContextType } from "@/components/pages/tools/ConfiguratorContext.tsx";
import type { Identifier } from "@/lib/minecraft/core/Identifier.ts";
import { CheckNoneCondition, type NoneCondition } from "@/lib/minecraft/voxel/condition/NoneCondition.ts";
import { CheckContainCondition, type ContainCondition } from "@/lib/minecraft/voxel/condition/contains/ContainCondition.ts";
import { CheckEqualsCondition, type EqualCondition } from "@/lib/minecraft/voxel/condition/equals/EqualCondition.ts";

export type Condition = ContainCondition | EqualCondition | NoneCondition;

type Result = {
    value: boolean | string | number | Record<string, unknown> | Array<unknown> | undefined;
    lockedBy?: Identifier;
};

export type ConditionResult = Result | undefined;

export function checkCondition<T>(conditions: Condition[] | undefined, context: ConfiguratorContextType<T>): ConditionResult {
    if (!conditions) return;

    for (const condition of conditions) {
        switch (condition.condition) {
            case "Equals": {
                return CheckEqualsCondition<T>(condition, context);
            }

            case "Contains": {
                return CheckContainCondition<T>(condition, context);
            }

            case "None": {
                return CheckNoneCondition<T>(condition, context);
            }
        }
    }

    return;
}

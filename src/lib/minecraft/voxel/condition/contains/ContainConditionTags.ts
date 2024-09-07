import type { ConfiguratorContextType } from "@/components/pages/tools/ConfiguratorContext.tsx";
import { Identifier } from "@/lib/minecraft/core/Identifier.ts";
import type { ConditionResult } from "@/lib/minecraft/voxel/condition";
import { type Field, getField } from "@/lib/minecraft/voxel/field";

export type ConditionContainTags = {
    type: "Tags";
    field: Field;
    lock?: boolean;
    values: Identifier[];
};

export function CheckContainConditionTags<T>(condition: ConditionContainTags, context: ConfiguratorContextType<T>): ConditionResult {
    const { currentElement } = context;
    if (!currentElement) return { value: false };

    const field = getField<T>(condition.field, context);
    const identifiers = condition.values;
    const values = currentElement.data[field];
    if (!Array.isArray(values) || !values.every((item) => item instanceof Identifier)) return { value: false };

    const match = identifiers.find((identifier) => values.find((value) => value.equals(identifier)));
    if (!match) return { value: false };

    return { value: true, lockedBy: match };
}

import type { Analysers, GetAnalyserVoxel } from "@/lib/minecraft/core/engine/Analyser.ts";
import { type Field, getField } from "@/lib/minecraft/core/engine/field";
import type { RegistryElement } from "@/lib/minecraft/mczip.ts";
import type { ToggleSectionMap } from "@/lib/minecraft/core/schema/primitive/toggle";

export type ConditionEqualsUndefined = {
    type: "Undefined";
    field: Field;
};

export function CheckEqualConditionUndefined<T extends keyof Analysers>(
    condition: ConditionEqualsUndefined,
    element: RegistryElement<GetAnalyserVoxel<T>>,
    toggleSection: ToggleSectionMap | undefined
): boolean {
    const field = getField<T>(condition.field, toggleSection);
    return element.data[field] === undefined;
}

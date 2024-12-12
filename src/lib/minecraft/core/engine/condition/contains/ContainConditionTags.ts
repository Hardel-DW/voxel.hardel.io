import { Identifier } from "@/lib/minecraft/core/Identifier.ts";
import type { Analysers, GetAnalyserVoxel } from "@/lib/minecraft/core/engine/Analyser.ts";
import { type Field, getField } from "@/lib/minecraft/core/engine/field";
import type { RegistryElement } from "@/lib/minecraft/mczip.ts";
import type { ToggleSectionMap } from "@/lib/minecraft/core/schema/primitive/toggle";

export type ConditionContainTags = {
    type: "Tags";
    field: Field;
    lock?: boolean;
    values: string[];
};

export function CheckContainConditionTags<T extends keyof Analysers>(
    condition: ConditionContainTags,
    element: RegistryElement<GetAnalyserVoxel<T>>,
    toggleSection: ToggleSectionMap | undefined
): boolean {
    const field = getField<T>(condition.field, toggleSection);
    const values = element.data[field];
    if (
        !Array.isArray(values) ||
        (!values.every((item) => typeof item === "string") && !values.every((item) => item instanceof Identifier))
    ) {
        return false;
    }

    const identifiers = values.map((item) => (item instanceof Identifier ? item : Identifier.fromString(item)));
    return condition.values.some((identifier) => identifiers.some((item) => item.equals(Identifier.fromString(identifier))));
}

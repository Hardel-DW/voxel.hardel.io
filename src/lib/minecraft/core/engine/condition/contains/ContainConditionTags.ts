import { Identifier } from "@/lib/minecraft/core/Identifier.ts";
import type { Analysers, GetAnalyserVoxel } from "@/lib/minecraft/core/engine/Analyser.ts";
import type { RegistryElement } from "@/lib/minecraft/mczip.ts";

export type ConditionContainTags = {
    type: "Tags";
    field: string;
    lock?: boolean;
    values: string[];
};

export function CheckContainConditionTags<T extends keyof Analysers>(
    condition: ConditionContainTags,
    element: RegistryElement<GetAnalyserVoxel<T>>
): boolean {
    const values = element.data[condition.field];
    if (
        !Array.isArray(values) ||
        (!values.every((item) => typeof item === "string") && !values.every((item) => item instanceof Identifier))
    ) {
        return false;
    }

    const identifiers = values.map((item) => (item instanceof Identifier ? item : Identifier.fromString(item)));
    return condition.values.some((identifier) => identifiers.some((item) => item.equals(Identifier.fromString(identifier))));
}

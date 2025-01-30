import { Identifier } from "@/lib/minecraft/core/Identifier.ts";
import type { RegistryElement } from "@/lib/minecraft/mczip.ts";
import type { BaseCondition } from "@/lib/minecraft/core/engine/condition";

export interface ConditionContainTags extends BaseCondition {
    condition: "contains_in_tags";
    lock?: boolean;
    values: string[];
}

export function CheckContainConditionTags(condition: ConditionContainTags, element: RegistryElement<Record<string, unknown>>): boolean {
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

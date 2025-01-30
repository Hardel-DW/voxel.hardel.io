import type { Action } from "@/lib/minecraft/core/engine/actions";
import type { Condition } from "@/lib/minecraft/core/engine/condition";
import type { ValueRenderer } from "@/lib/minecraft/core/engine/renderer/value";
import type { Lock } from "@/lib/minecraft/core/schema/primitive/component";

export function getActionFields(action: Action): string[] {
    if (action.type === "sequential") {
        return action.actions.flatMap(getActionFields);
    }
    return [action.field];
}

export function getConditionFields(condition: Condition | undefined): string[] {
    if (!condition) return [];

    switch (condition.condition) {
        case "all_of":
            return condition.terms.flatMap(getConditionFields);
        case "any_of":
            return condition.terms.flatMap(getConditionFields);
        case "inverted":
            return getConditionFields(condition.terms);
        case "check_namespace":
        case "compare_to_value":
            return [];
        default:
            return [condition.field];
    }
}

export function getRendererFields(renderer: ValueRenderer): string[] {
    switch (renderer.type) {
        case "from_field":
            return [renderer.field];
        case "conditionnal": {
            const fields = getConditionFields(renderer.term);
            if ("return_condition" in renderer && renderer.return_condition) {
                return fields;
            }
            return [
                ...fields,
                ...(renderer.on_true ? getRendererFields(renderer.on_true) : []),
                ...(renderer.on_false ? getRendererFields(renderer.on_false) : [])
            ];
        }
        case "hardcoded":
            return [];
    }
}

export function getLockFields(locks: Lock[]): string[] {
    return locks.flatMap((lock) => getConditionFields(lock.condition));
}

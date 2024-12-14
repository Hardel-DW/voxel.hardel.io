import type { Resolved, ToggleField, ToggleName, Unresolved } from "@/lib/minecraft/core/engine/resolver/field/type";
import type { ToggleSectionMap } from "@/lib/minecraft/core/schema/primitive/toggle";

export function resolve<T>(value: Unresolved<T>, toggleSection?: ToggleSectionMap): T {
    return resolveField(value, toggleSection) as T;
}

export function resolveField<T>(value: T, toggleSection?: ToggleSectionMap): Resolved<T> {
    if (value == null) {
        return value as Resolved<T>;
    }

    if (Array.isArray(value)) {
        return value.map((item) => resolveField(item, toggleSection)) as Resolved<T>;
    }

    if (typeof value === "object") {
        const obj = value as { type?: string };

        if (obj.type) {
            switch (obj.type) {
                case "get_toggle_field":
                case "get_toggle_name":
                    return resolveToggleField(value as unknown as ToggleField | ToggleName, obj.type, toggleSection) as Resolved<T>;
                default:
                    return Object.entries(value).reduce<Record<string, unknown>>((acc, [key, val]) => {
                        acc[key] = resolveField(val, toggleSection);
                        return acc;
                    }, {}) as Resolved<T>;
            }
        }

        return Object.entries(value).reduce<Record<string, unknown>>((acc, [key, val]) => {
            acc[key] = resolveField(val, toggleSection);
            return acc;
        }, {}) as Resolved<T>;
    }

    return value as Resolved<T>;
}

function resolveToggleField(value: ToggleField | ToggleName, type: string, toggleSection?: ToggleSectionMap): string {
    if (!toggleSection) {
        throw new Error(`Cannot resolve toggle ${type} ${value.group}: no toggle section provided`);
    }

    const key = type === "get_toggle_field" ? "field" : "name";
    const result = toggleSection[value.group]?.[key];

    if (!result) {
        throw new Error(`Toggle ${key} not found for group: ${value.group}`);
    }

    return result;
}

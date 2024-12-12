import type { Analysers, VoxelElement } from "@/lib/minecraft/core/engine/Analyser";
import { parseSpecificElement } from "@/lib/minecraft/core/engine/Parser";
import type { Action, ExtraActionData } from "@/lib/minecraft/core/engine/actions";
import { type Field, getField } from "@/lib/minecraft/core/engine/field";
import type { LogDifference, LogValue } from "@/lib/minecraft/core/engine/migrations/types";
import type { RegistryElement } from "@/lib/minecraft/mczip";

/**
 * Checks if a value matches the LogValue type
 * A LogValue can be:
 * - A primitive (string, number, boolean)
 * - An array of primitives
 * - An object where all values are LogValues
 *
 * @param value - The value to check
 * @returns true if the value is a valid LogValue, false otherwise
 */
export function isLogValue(value: unknown): value is LogValue {
    if (value === null || value === undefined) return false;
    if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") return true;
    if (Array.isArray(value)) {
        return value.every((item) => typeof item === "string" || typeof item === "number" || typeof item === "boolean");
    }
    if (typeof value === "object") {
        return Object.values(value as Record<string, unknown>).every(isLogValue);
    }
    return false;
}

/**
 * Type guard checking if an action has a field property
 *
 * @param action - The action to check
 * @returns true if the action has a field property, false otherwise
 */
function hasField(action: Action): action is Action & {
    field: Field;
} {
    return "field" in action;
}

/**
 * Creates a log difference from an action
 * This function analyzes changes made by an action and generates
 * an appropriate LogDifference structure for logging
 *
 * @param action - The action that generated the change
 * @param element - The registry element that was modified
 * @param extra
 * @param files
 * @param version
 * @param tool
 * @returns A LogDifference describing the change, or undefined if the change cannot be logged
 *
 * @example
 * // For a "set" type action:
 * {
 *   type: "set",
 *   path: "fieldName",
 *   value: newValue,
 *   origin_value: originalValue
 * }
 *
 * // For an "add" type action:
 * {
 *   type: "add",
 *   path: "fieldName",
 *   value: newValue
 * }
 *
 * // For a "remove" type action:
 * {
 *   type: "remove",
 *   path: "fieldName.subField"
 * }
 */
export function createDifferenceFromAction<T extends keyof Analysers>(
    action: Action,
    element: RegistryElement<VoxelElement>,
    extra: ExtraActionData,
    files: Record<string, Uint8Array>,
    version: number,
    tool: T
): LogDifference | undefined {
    if (!hasField(action)) return undefined;

    const field = getField(action.field, extra.toggleSection);
    const parsedOriginalData = parseSpecificElement<T>(element.identifier, files, version, tool);

    if (!parsedOriginalData) return undefined;
    const originalValue =
        field in parsedOriginalData.data ? parsedOriginalData.data[field as keyof typeof parsedOriginalData.data] : undefined;

    const newValue = element.data[field as keyof typeof element.data];
    if (!isLogValue(newValue)) return undefined;

    if (originalValue === undefined) {
        return {
            type: "add",
            path: String(field),
            value: newValue
        };
    }

    if (!isLogValue(originalValue)) return undefined;

    switch (action.type) {
        case "Boolean":
        case "String":
        case "Number":
        case "DynamicList":
        case "Dynamic":
            return {
                type: "set",
                path: String(field),
                value: newValue,
                origin_value: originalValue
            };
        case "List":
        case "RemoveKey":
            return {
                type: "remove",
                path: `${String(field)}.${String(extra.value)}`
            };
        default:
            return {
                type: "set",
                path: String(field),
                value: newValue,
                origin_value: originalValue
            };
    }
}

import type { Analysers, VoxelElement } from "@/lib/minecraft/core/engine/Analyser";
import { parseSpecificElement } from "@/lib/minecraft/core/engine/Parser";
import type { Action } from "@/lib/minecraft/core/engine/actions";
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
 * Creates a log difference from an action
 * This function analyzes changes made by an action and generates
 * an appropriate LogDifference structure for logging
 *
 * @param action - The action that generated the change
 * @param element - The registry element that was modified
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
    files: Record<string, Uint8Array>,
    version: number,
    tool: T
): LogDifference[] | LogDifference | undefined {
    if (action.type === "sequential") {
        const differences: LogDifference[] = [];

        for (const subAction of action.actions) {
            const difference = createDifferenceFromAction(subAction, element, files, version, tool);
            if (difference) {
                if (Array.isArray(difference)) {
                    differences.push(...difference);
                } else {
                    differences.push(difference);
                }
            }
        }

        return differences.length > 0 ? differences : undefined;
    }

    const field = action.field;
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
        case "set_value":
        case "set_computed_slot":
        case "toggle_value_in_list":
        case "toggle_multiple_values":
        case "list_operation":
        case "set_undefined":
            return {
                type: "set",
                path: String(field),
                value: newValue,
                origin_value: originalValue
            };
        case "remove_key":
            return {
                type: "remove",
                path: `${String(field)}.${String(action.value)}`
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

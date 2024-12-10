import type { ConfiguratorContextType } from "@/components/tools/ConfiguratorContext.tsx";
import type { Identifier } from "@/lib/minecraft/core/Identifier.ts";
import type { Analysers, GetAnalyserVoxel } from "@/lib/minecraft/core/engine/Analyser.ts";
import DynamicListModifier, { type DynamicListAction } from "@/lib/minecraft/core/engine/actions/DynamicListModifier.ts";
import { type DynamicAction, DynamicModifier } from "@/lib/minecraft/core/engine/actions/DynamicModifier.ts";
import ListModifier, { type ListAction } from "@/lib/minecraft/core/engine/actions/ListModifier.ts";
import MultipleModifier, { type MultipleAction } from "@/lib/minecraft/core/engine/actions/MultipleModifier.ts";
import { type RemoveKeyAction, RemoveKeyModifier } from "@/lib/minecraft/core/engine/actions/RemoveKeyModifier.ts";
import SequentialModifier, { type SequentialAction } from "@/lib/minecraft/core/engine/actions/SequentialModifier.ts";
import {
    type BooleanAction,
    type NumberAction,
    SimpleModifier,
    type StringAction
} from "@/lib/minecraft/core/engine/actions/SimpleModifier.ts";
import { type SlotAction, SlotModifier } from "@/lib/minecraft/core/engine/actions/SlotModifier.ts";
import { type UndefinedAction, UndefinedModifier } from "@/lib/minecraft/core/engine/actions/UndefinedModifier.ts";
import type { LogDifference, LogValue } from "@/lib/minecraft/core/engine/migrations/types";
import type { RegistryElement } from "@/lib/minecraft/mczip.ts";
import type { VoxelElement } from "../Analyser";
import { parseSpecificElement } from "../Parser";
import { type Field, getField } from "../field";

export type Action =
    | RemoveKeyAction
    | DynamicListAction
    | BooleanAction
    | UndefinedAction
    | StringAction
    | NumberAction
    | DynamicAction
    | SlotAction
    | ListAction
    | MultipleAction
    | SequentialAction;

export type ActionValue = string | number | boolean | Identifier;

export function updateData<T extends keyof Analysers>(
    action: Action,
    value: ActionValue,
    context: ConfiguratorContextType<GetAnalyserVoxel<T>>,
    element: RegistryElement<GetAnalyserVoxel<T>>
): RegistryElement<GetAnalyserVoxel<T>> | undefined {
    const updatedElement = (() => {
        switch (action.type) {
            case "Boolean":
            case "String":
            case "Number":
                return SimpleModifier(action, context, element);
            case "Slot":
                return SlotModifier(action, context, element);
            case "Undefined":
                return UndefinedModifier(action, context, element);
            case "Dynamic":
                return DynamicModifier(action, value, context, element);
            case "Multiple":
                return MultipleModifier(action, context, element);
            case "List":
                return ListModifier(action, value, context, element);
            case "DynamicList":
                return DynamicListModifier(action, value, context, element);
            case "RemoveKey":
                return RemoveKeyModifier(action, value, context, element);
            case "Sequential":
                return SequentialModifier(action, value, context, element);
        }
    })();

    if (updatedElement && context.logger) {
        const difference = createDifferenceFromAction(action, value, updatedElement, context);

        if (difference) {
            context.logger.logDifference(element.identifier.toString(), element.identifier.getRegistry() || "unknown", difference);
        }
    }

    return updatedElement;
}

function hasField(action: Action): action is Action & {
    field: Field;
} {
    return "field" in action;
}

function isLogValue(value: unknown): value is LogValue {
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

function createDifferenceFromAction<T extends keyof Analysers>(
    action: Action,
    value: ActionValue,
    element: RegistryElement<VoxelElement>,
    context: ConfiguratorContextType<GetAnalyserVoxel<T>>
): LogDifference | undefined {
    if (!hasField(action)) return undefined;

    const field = getField(action.field, context);
    const parsedOriginalData = parseSpecificElement<T>(element.identifier, context);

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
        case "Dynamic":
            return {
                type: "set",
                path: String(field),
                value: newValue,
                origin_value: originalValue
            };
        case "List":
        case "DynamicList":
            return {
                type: "set",
                path: String(field),
                value: newValue,
                origin_value: originalValue
            };
        case "RemoveKey":
            return {
                type: "remove",
                path: `${String(field)}.${String(value)}`
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

export const handleChange = <T extends keyof Analysers>(
    action: Action,
    value: ActionValue,
    context: ConfiguratorContextType<GetAnalyserVoxel<T>>,
    identifier?: Identifier
) => {
    const elementToUpdate = identifier ? context.elements.find((elem) => elem.identifier.equals(identifier)) : context.currentElement;
    if (!elementToUpdate) {
        console.error("Element not found");
        return;
    }

    const updatedElement = updateData<T>(action, value, context, elementToUpdate);
    if (!updatedElement) return;

    context.setElements((prev) => {
        const index = prev.findIndex((item) => item.identifier.equals(updatedElement.identifier));
        return index === -1 ? prev : prev.toSpliced(index, 1, updatedElement);
    });
};

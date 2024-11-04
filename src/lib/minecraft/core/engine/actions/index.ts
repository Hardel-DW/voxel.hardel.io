import type { ConfiguratorContextType } from "@/lib/minecraft/components/ConfiguratorContext.tsx";
import type { Identifier } from "@/lib/minecraft/core/Identifier.ts";
import type { Analysers, GetAnalyserVoxel } from "@/lib/minecraft/core/engine/Analyser.ts";
import DynamicListModifier, { type DynamicListAction } from "@/lib/minecraft/core/engine/actions/DynamicListModifier.ts";
import { type DynamicAction, DynamicModifier } from "@/lib/minecraft/core/engine/actions/DynamicModifier.ts";
import ListModifier, { type ListAction } from "@/lib/minecraft/core/engine/actions/ListModifier.ts";
import MultipleModifier, { type MultipleAction } from "@/lib/minecraft/core/engine/actions/MultipleModifier.ts";
import { type RemoveKeyAction, RemoveKeyModifier } from "@/lib/minecraft/core/engine/actions/RemoveKeyModifier.ts";
import {
    type BooleanAction,
    type NumberAction,
    SimpleModifier,
    type StringAction
} from "@/lib/minecraft/core/engine/actions/SimpleModifier.ts";
import { type SlotAction, SlotModifier } from "@/lib/minecraft/core/engine/actions/SlotModifier.ts";
import { type UndefinedAction, UndefinedModifier } from "@/lib/minecraft/core/engine/actions/UndefinedModifier.ts";
import type { RegistryElement } from "@/lib/minecraft/mczip.ts";
import SequentialModifier, { type SequentialAction } from "@/lib/minecraft/core/engine/actions/SequentialModifier.ts";

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
    switch (action.type) {
        case "Boolean":
            return SimpleModifier(action, context, element);
        case "String":
            return SimpleModifier(action, context, element);
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

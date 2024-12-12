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
import type { ToggleSectionMap } from "@/lib/minecraft/core/schema/primitive/toggle";
import type { RegistryElement } from "@/lib/minecraft/mczip.ts";

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

export type ExtraActionData = {
    value?: ActionValue;
    toggleSection?: ToggleSectionMap | undefined;
    version?: number;
};

export function updateData<T extends keyof Analysers>(
    action: Action,
    element: RegistryElement<GetAnalyserVoxel<T>>,
    extra: ExtraActionData
): RegistryElement<GetAnalyserVoxel<T>> | undefined {
    return (() => {
        switch (action.type) {
            case "Boolean":
            case "String":
            case "Number":
                return SimpleModifier(action, element, extra);
            case "Slot":
                return SlotModifier(action, element, extra);
            case "Undefined":
                return UndefinedModifier(action, element, extra);
            case "Dynamic":
                return DynamicModifier(action, element, extra);
            case "Multiple":
                return MultipleModifier(action, element, extra);
            case "List":
                return ListModifier(action, element, extra);
            case "DynamicList":
                return DynamicListModifier(action, element, extra);
            case "RemoveKey":
                return RemoveKeyModifier(action, element, extra);
            case "Sequential":
                return SequentialModifier(action, element, extra);
        }
    })();
}

import type { Identifier } from "@/lib/minecraft/core/Identifier.ts";
import type { Analysers, GetAnalyserVoxel } from "@/lib/minecraft/core/engine/Analyser.ts";
import { AppendListModifier, type ListAction } from "@/lib/minecraft/core/engine/actions/AppendListModifier";
import MultipleModifier, { type MultipleAction } from "@/lib/minecraft/core/engine/actions/MultipleModifier.ts";
import { type RemoveKeyAction, RemoveKeyModifier } from "@/lib/minecraft/core/engine/actions/RemoveKeyModifier.ts";
import SequentialModifier, { type SequentialAction } from "@/lib/minecraft/core/engine/actions/SequentialModifier.ts";
import { type SimpleAction, SimpleModifier } from "@/lib/minecraft/core/engine/actions/SimpleModifier.ts";
import { type SlotAction, SlotModifier } from "@/lib/minecraft/core/engine/actions/SlotModifier.ts";
import { UndefinedModifier, type UndefinedAction } from "@/lib/minecraft/core/engine/actions/UndefinedModifier.ts";
import ToggleListValueModifier, { type ToggleListValueAction } from "@/lib/minecraft/core/engine/actions/ToggleListValueModifier";
import type { RegistryElement } from "@/lib/minecraft/mczip.ts";
import { ComputedModifier, type ComputedAction } from "@/lib/minecraft/core/engine/actions/ComputedModifier.ts";

export type ActionValue = string | number | boolean | Identifier;
export interface BaseAction {
    field: string;
}

// Type pour les actions résolues
export type Action =
    | RemoveKeyAction
    | UndefinedAction
    | SimpleAction
    | SlotAction
    | ToggleListValueAction
    | MultipleAction
    | SequentialAction
    | ListAction
    | ComputedAction;

export function updateData<T extends keyof Analysers>(
    action: Action,
    element: RegistryElement<GetAnalyserVoxel<T>>,
    version: number,
    value?: ActionValue
): RegistryElement<GetAnalyserVoxel<T>> | undefined {
    return (() => {
        switch (action.type) {
            case "set_value_from_computed_value":
            case "toggle_value_from_computed_value":
                return ComputedModifier(action, element, value);
            case "set_value":
            case "toggle_value":
                return SimpleModifier(action, element);
            case "set_undefined":
                return UndefinedModifier(action, element);
            case "set_computed_slot":
                return SlotModifier(action, element, version);
            case "toggle_multiple_values":
                return MultipleModifier(action, element);
            case "toggle_value_in_list":
                return ToggleListValueModifier(action, element, value);
            case "remove_key":
                return RemoveKeyModifier(action, element);
            case "sequential":
                return SequentialModifier(action, element, version, value);
            case "list_operation":
                return AppendListModifier(action, element);
        }
    })();
}

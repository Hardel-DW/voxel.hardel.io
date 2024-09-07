import type { ConfiguratorContextType } from "@/components/pages/tools/ConfiguratorContext.tsx";
import type { RegistryElement } from "@/lib/minecraft/mcschema.ts";
import { type DynamicAction, DynamicModifier } from "@/lib/minecraft/voxel/actions/DynamicModifier.ts";
import ListModifier, { type ListAction } from "@/lib/minecraft/voxel/actions/ListModifier.ts";
import MultipleModifier, { type MultipleAction } from "@/lib/minecraft/voxel/actions/MultipleModifier.ts";
import { type RemoveEffectAction, RemoveEffectModifier } from "@/lib/minecraft/voxel/actions/RemoveEffectModifier.ts";
import { type BooleanAction, type NumberAction, SimpleModifier, type StringAction } from "@/lib/minecraft/voxel/actions/SimpleModifier.ts";
import { type SlotAction, SlotModifier } from "@/lib/minecraft/voxel/actions/SlotModifier.ts";
import { type SoftDeleteAction, SoftDeleteModifier } from "@/lib/minecraft/voxel/actions/SoftDeleteModifier.ts";
import TagsModifier, { type TagsAction } from "@/lib/minecraft/voxel/actions/TagsModifier.ts";
import { type UndefinedAction, UndefinedModifier } from "@/lib/minecraft/voxel/actions/UndefinedModifier.ts";

export type Action =
    | RemoveEffectAction
    | BooleanAction
    | UndefinedAction
    | StringAction
    | NumberAction
    | DynamicAction
    | SoftDeleteAction
    | SlotAction
    | ListAction
    | MultipleAction
    | TagsAction;

export type ActionValue = string | number | boolean;
function updateData<T extends Record<string, unknown>>(
    action: Action,
    value: ActionValue,
    context: ConfiguratorContextType<T>
): RegistryElement<T> | undefined {
    switch (action.type) {
        case "Boolean":
            return SimpleModifier(action, context);
        case "String":
            return SimpleModifier(action, context);
        case "Number":
            return SimpleModifier(action, context);
        case "SoftDelete":
            return SoftDeleteModifier(action, value, context);
        case "Slot":
            return SlotModifier(action, context);
        case "Undefined":
            return UndefinedModifier(action, context);
        case "Dynamic":
            return DynamicModifier(action, value, context);
        case "Multiple":
            return MultipleModifier(action, context);
        case "Tags":
            return TagsModifier(action, value, context);
        case "List":
            return ListModifier(action, value, context);
        case "RemoveEffect":
            return RemoveEffectModifier(action, value, context);
    }
}

export const handleChange = <T extends Record<string, unknown>>(
    action: Action,
    value: string | number | boolean,
    context: ConfiguratorContextType<T>
) => {
    const updatedElement = updateData<T>(action, value, context);
    if (!updatedElement) return;
    context.setCurrentElement(updatedElement);
    context.setElements((prev) => {
        const index = prev.findIndex((item) => context.currentElement && item.identifier.equals(context.currentElement.identifier));
        if (index === -1) return prev;
        return [...prev.slice(0, index), updatedElement, ...prev.slice(index + 1)];
    });
};

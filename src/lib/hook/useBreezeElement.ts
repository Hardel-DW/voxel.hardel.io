import { getConditionFields, getLockFields, getRendererFields, getValue, checkLocks, checkCondition } from "@voxelio/breeze/core";
import type { VoxelElement, Condition, Lock, ValueRenderer, TranslateTextType } from "@voxelio/breeze/core";
import { useShallow } from "zustand/shallow";
import { getCurrentElement, useConfiguratorStore } from "@/components/tools/Store";

const useElementFields = (fields: string[], elementId?: string): Partial<VoxelElement> | null => {
    return useConfiguratorStore(
        useShallow((state): Partial<VoxelElement> | null => {
            const id = elementId ? state.elements.get(elementId) : getCurrentElement(state);
            if (!id) return null;

            return fields.reduce(
                (acc, field) => {
                    acc[field] = id[field];
                    return acc;
                },
                {} as Partial<VoxelElement>
            );
        })
    );
};

export const useElementValue = <T>(renderer: ValueRenderer, elementId?: string): T | null => {
    if (!renderer) return null;

    const fields = getRendererFields(renderer);
    const element = useElementFields(fields, elementId);

    if (!element) return null;
    return getValue<T>(renderer, element);
};

export const useElementCondition = (condition: Condition | undefined, elementId?: string, value?: any): boolean => {
    if (!condition) return false;

    const fields = getConditionFields(condition);
    const element = useElementFields(fields, elementId);

    if (!element) return false;
    return checkCondition(condition, element, value);
};

export const useElementLocks = (locks: Lock[] | undefined, elementId?: string): { isLocked: boolean; text?: TranslateTextType } => {
    if (!locks) return { isLocked: false };

    const fields = getLockFields(locks);
    const element = useElementFields(fields, elementId);

    if (!element) return { isLocked: false };
    return checkLocks(locks, element);
};

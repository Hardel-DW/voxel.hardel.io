import { type Condition, checkCondition } from "@/lib/minecraft/core/engine/condition";
import { checkLocks } from "@/lib/minecraft/core/engine/renderer";
import type { ValueRenderer } from "@/lib/minecraft/core/engine/renderer/value";
import { getValue } from "@/lib/minecraft/core/engine/renderer/value";
import type { Lock } from "@/lib/minecraft/core/schema/primitive/component";
import type { TranslateTextType } from "@/lib/minecraft/core/schema/primitive/text";
import { useConfiguratorStore } from "./configuratorStore";
import { getConditionFields, getLockFields, getRendererFields } from "./utils";

const useElementData = (elementId?: string) => {
    return useConfiguratorStore((state) => {
        const id = elementId ? state.elements.get(elementId) : state.currentElement;
        if (!id) return null;

        return id;
    });
};

export const useElementValue = <T>(renderer: ValueRenderer, elementId?: string): T | null => {
    const element = useElementData(elementId);
    const fields = getRendererFields(renderer);

    if (!element) return null;
    const values = fields.reduce(
        (acc, field) => {
            acc[field] = element[field];
            return acc;
        },
        {} as Record<string, any>
    );

    return getValue<T>(renderer, values);
};

export const useElementCondition = (condition: Condition | undefined, elementId?: string, value?: any): boolean => {
    const element = useElementData(elementId);
    const fields = getConditionFields(condition);

    if (!element || !condition) return false;
    const values = fields.reduce(
        (acc, field) => {
            acc[field] = element[field];
            return acc;
        },
        {} as Record<string, any>
    );

    return checkCondition(condition, values, value);
};

export const useElementLocks = (locks: Lock[] | undefined, elementId?: string): { isLocked: boolean; text?: TranslateTextType } => {
    const element = useElementData(elementId);
    const fields = getLockFields(locks ?? []);

    if (!element || !locks) return { isLocked: false };
    const values = fields.reduce(
        (acc, field) => {
            acc[field] = element[field];
            return acc;
        },
        {} as Record<string, any>
    );

    return checkLocks(locks, values);
};

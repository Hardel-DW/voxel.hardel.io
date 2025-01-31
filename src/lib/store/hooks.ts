import type { Identifier } from "@/lib/minecraft/core/Identifier";
import { type Condition, checkCondition } from "@/lib/minecraft/core/engine/condition";
import { checkLocks } from "@/lib/minecraft/core/engine/renderer";
import type { ValueRenderer } from "@/lib/minecraft/core/engine/renderer/value";
import { getValue } from "@/lib/minecraft/core/engine/renderer/value";
import type { Lock } from "@/lib/minecraft/core/schema/primitive/component";
import type { TranslateTextType } from "@/lib/minecraft/core/schema/primitive/text";
import { useConfiguratorStore } from "./configuratorStore";
import { useMemo } from "react";
import { getConditionFields, getLockFields, getRendererFields } from "./utils";

const useElementData = (elementId?: Identifier) => {
    return useConfiguratorStore((state) => {
        const id = elementId?.toString() ?? state.currentElementId?.toString();
        if (!id) return null;

        return state.elementsById.get(id);
    });
};

export const useElementValue = <T>(renderer: ValueRenderer, elementId?: Identifier): T | null => {
    const element = useElementData(elementId);
    const fields = getRendererFields(renderer);

    const values = useMemo(() => {
        if (!element) return null;
        return {
            identifier: element.identifier,
            data: fields.reduce(
                (acc, field) => {
                    acc[field] = element.data[field];
                    return acc;
                },
                {} as Record<string, any>
            )
        };
    }, [element, fields]);

    if (!values) return null;
    return getValue<T>(renderer, values);
};

export const useElementCondition = (condition: Condition | undefined, elementId?: Identifier, value?: any): boolean => {
    const element = useElementData(elementId);
    const fields = getConditionFields(condition);

    const values = useMemo(() => {
        if (!element || !condition) return null;
        return {
            identifier: element.identifier,
            data: fields.reduce(
                (acc, field) => {
                    acc[field] = element.data[field];
                    return acc;
                },
                {} as Record<string, any>
            )
        };
    }, [element, fields, condition]);

    if (!values) return false;
    return checkCondition(condition, values, value);
};

export const useElementLocks = (locks: Lock[] | undefined, elementId?: Identifier): { isLocked: boolean; text?: TranslateTextType } => {
    const element = useElementData(elementId);
    const fields = getLockFields(locks ?? []);

    const values = useMemo(() => {
        if (!element || !locks) return null;
        return {
            identifier: element.identifier,
            data: fields.reduce(
                (acc, field) => {
                    acc[field] = element.data[field];
                    return acc;
                },
                {} as Record<string, any>
            )
        };
    }, [element, fields, locks]);

    if (!values) return { isLocked: false };
    return checkLocks(locks, values);
};

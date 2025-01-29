import type { Identifier } from "@/lib/minecraft/core/Identifier";
import type { Analysers } from "@/lib/minecraft/core/engine/Analyser";
import { type Condition, checkCondition } from "@/lib/minecraft/core/engine/condition";
import { checkLocks } from "@/lib/minecraft/core/engine/renderer";
import type { ValueRenderer } from "@/lib/minecraft/core/engine/renderer/value";
import { getValue } from "@/lib/minecraft/core/engine/renderer/value";
import type { Lock } from "@/lib/minecraft/core/schema/primitive/component";
import type { TranslateTextType } from "@/lib/minecraft/core/schema/primitive/text";
import { useMemo } from "react";
import { useConfiguratorStore } from "./configuratorStore";

export const useElement = (elementId?: Identifier) => {
    return useConfiguratorStore((state) => {
        if (elementId) {
            return state.elements.find((elem) => elem.identifier.equals(elementId));
        }
        if (!state.currentElementId) return undefined;
        return state.elements.find((elem) => elem.identifier.equals(state.currentElementId));
    });
};

export const useElementValue = <T extends keyof Analysers, K>(renderer: ValueRenderer, elementId?: Identifier): K | null => {
    const element = useElement(elementId);

    return useMemo(() => {
        if (!element) return null;
        return getValue<T, K>(renderer, element);
    }, [element, renderer]);
};

export const useElementCondition = <T extends keyof Analysers>(
    condition: Condition | undefined,
    elementId?: Identifier,
    value?: any
): boolean => {
    const element = useElement(elementId);

    return useMemo(() => {
        if (!element || !condition) return false;
        return checkCondition<T>(condition, element, value);
    }, [element, condition, value]);
};

export const useElementLocks = <T extends keyof Analysers>(
    locks: Lock[] | undefined,
    elementId?: Identifier
): { isLocked: boolean; text?: TranslateTextType } => {
    const element = useElement(elementId);

    return useMemo(() => {
        if (!element) return { isLocked: false };
        return checkLocks<T>(locks, element);
    }, [element, locks]);
};

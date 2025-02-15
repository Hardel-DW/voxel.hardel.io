import { Identifier, type DataDrivenRegistryElement } from "@voxelio/breeze";
import type { DataDrivenElement } from "@voxelio/breeze/core";
import { create } from "zustand";

export interface CopilotState {
    files: Record<string, Uint8Array>;
    elements: Map<string, DataDrivenElement>;
    elementCountByRegistry: Map<string, number>;
    currentElementId?: string;
    registryCache: Map<string, DataDrivenRegistryElement<DataDrivenElement>[]>;
    setCurrentElementId: (currentElementId: string | undefined) => void;
    setup: (elements: Map<string, DataDrivenElement>, files: Record<string, Uint8Array>, registries: string[]) => void;
}

const createCopilotStore = () =>
    create<CopilotState>((set) => ({
        files: {},
        elements: new Map(),
        elementCountByRegistry: new Map(),
        currentElementId: undefined,
        registryCache: new Map(),
        setCurrentElementId: (currentElementId) => set({ currentElementId }),
        setup: (elements, files, registries) => {
            const elementCountByRegistry = getElementCountByRegistry({ elements } as CopilotState, registries);
            set({ elements, files, elementCountByRegistry, registryCache: new Map() });
        }
    }));

export const useCopilotStore = createCopilotStore();
export const getCurrentElement = (state: CopilotState) => (state.currentElementId ? state.elements.get(state.currentElementId) : undefined);

export const getElementCountByRegistry = (state: CopilotState, registries: string[]): Map<string, number> => {
    const countByRegistry = new Map<string, number>();
    for (const registry of registries) {
        countByRegistry.set(registry, 0);
    }

    for (const elementId of state.elements.keys()) {
        const registry = elementId.split("$")[1];
        if (countByRegistry.has(registry)) {
            countByRegistry.set(registry, (countByRegistry.get(registry) || 0) + 1);
        }
    }

    return countByRegistry;
};

export const getElementByRegistry = <T extends DataDrivenElement>(
    state: CopilotState,
    registry: string
): DataDrivenRegistryElement<T>[] => {
    if (state.registryCache.has(registry)) {
        const cached = state.registryCache.get(registry);
        if (cached) {
            return cached as DataDrivenRegistryElement<T>[];
        }
    }

    const elements: DataDrivenRegistryElement<T>[] = [];
    for (const [key, element] of state.elements) {
        if (key.split("$")[1] === registry && element) {
            const identifier = Identifier.fromUniqueKey(key);
            elements.push({ identifier, data: element as T });
        }
    }

    state.registryCache.set(registry, elements);
    return elements;
};

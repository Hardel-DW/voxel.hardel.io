import { isRegistryVoxelElement, isVoxelElement, type Analysers, type GetAnalyserVoxel } from "@/lib/minecraft/core/engine/Analyser";
import type { Action, ActionValue } from "@/lib/minecraft/core/engine/actions";
import { updateData } from "@/lib/minecraft/core/engine/actions";
import type { Logger } from "@/lib/minecraft/core/engine/migrations/logger";
import type { ToolConfiguration } from "@/lib/minecraft/core/schema/primitive";
import type { ToggleSection } from "@/lib/minecraft/core/schema/primitive/toggle";
import { create } from "zustand";
import { sortVoxelElements } from "@/lib/minecraft/core/Identifier";

export interface ConfiguratorState<T extends keyof Analysers> {
    name: string;
    minify: boolean;
    logger?: Logger;
    files: Record<string, Uint8Array>;
    elements: Map<string, GetAnalyserVoxel<T>>;
    currentElement?: GetAnalyserVoxel<T>;
    currentElementId?: string;
    toggleSection?: Record<string, ToggleSection>;
    configuration: ToolConfiguration | null;
    isJar: boolean;
    version: number | null;
    identifiers: string[];
    sortedIdentifiers: string[];
    setName: (name: string) => void;
    setMinify: (minify: boolean) => void;
    setLogger: (logger: Logger | undefined) => void;
    setFiles: (files: Record<string, Uint8Array>) => void;
    setCurrentElementId: (id: string | undefined) => void;
    setToggleSection: (section: Record<string, ToggleSection> | undefined) => void;
    changeToggleValue: (id: string, name: ToggleSection) => void;
    setConfiguration: (config: ToolConfiguration | null) => void;
    setIsJar: (isJar: boolean) => void;
    setVersion: (version: number | null) => void;
    handleChange: (action: Action, identifier?: string, value?: ActionValue) => void;
    batchUpdate: (updates: Partial<ConfiguratorState<T>>) => void;
}

const createConfiguratorStore = <T extends keyof Analysers>() =>
    create<ConfiguratorState<T>>((set, get) => ({
        name: "",
        minify: true,
        files: {},
        elements: new Map(),
        configuration: null,
        isJar: false,
        version: null,
        identifiers: [],
        sortedIdentifiers: [],
        currentElement: undefined,
        setName: (name) => set({ name }),
        setMinify: (minify) => set({ minify }),
        setLogger: (logger) => set({ logger }),
        setFiles: (files) => set({ files }),
        setCurrentElementId: (currentElementId) => set({ currentElementId }),
        setToggleSection: (toggleSection) => set({ toggleSection }),
        setConfiguration: (configuration) => set({ configuration }),
        setIsJar: (isJar) => set({ isJar }),
        setVersion: (version) => set({ version }),
        changeToggleValue: (id, name) => set((state) => ({ toggleSection: { ...state.toggleSection, [id]: name } })),
        handleChange: (action, identifier, value) => {
            const state = get();
            const element = identifier ? state.elements.get(identifier) : state.currentElement;

            if (!element) {
                console.error("Element not found");
                return;
            }

            const updatedElement = updateData(action, element, state.version ?? Number.POSITIVE_INFINITY, value);
            if (!updatedElement) return;

            const isElementValid = isVoxelElement(updatedElement);
            if (!isElementValid || !identifier) return;

            set((state) => ({
                elements: state.elements.set(identifier, updatedElement),
                currentElement: state.currentElementId === identifier ? updatedElement : state.currentElement
            }));
        },
        batchUpdate: (updates) => {
            const elements = updates.elements;
            if (elements) {
                updates.sortedIdentifiers = sortVoxelElements(elements);
                updates.identifiers = Array.from(elements.keys());
            }

            const currentElementId = updates.currentElementId;
            if (currentElementId) {
                updates.currentElement = (elements ?? get().elements).get(currentElementId);
            }

            set(updates);
        }
    }));

export const useConfiguratorStore = createConfiguratorStore<"enchantment">();

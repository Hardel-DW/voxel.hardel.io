import { Identifier } from "@/lib/minecraft/core/Identifier";
import { isRegistryVoxelElement, type Analysers, type GetAnalyserVoxel } from "@/lib/minecraft/core/engine/Analyser";
import type { Action, ActionValue } from "@/lib/minecraft/core/engine/actions";
import { updateData } from "@/lib/minecraft/core/engine/actions";
import type { Logger } from "@/lib/minecraft/core/engine/migrations/logger";
import type { ToolConfiguration } from "@/lib/minecraft/core/schema/primitive";
import type { ToggleSection } from "@/lib/minecraft/core/schema/primitive/toggle";
import type { RegistryElement } from "@/lib/minecraft/mczip";
import { create } from "zustand";

export interface ConfiguratorState<T extends keyof Analysers> {
    name: string;
    minify: boolean;
    logger?: Logger;
    files: Record<string, Uint8Array>;
    elements: RegistryElement<GetAnalyserVoxel<T>>[];
    currentElement?: RegistryElement<GetAnalyserVoxel<T>>;
    currentElementId?: Identifier;
    currentElementIdString?: string;
    toggleSection?: Record<string, ToggleSection>;
    configuration: ToolConfiguration | null;
    isJar: boolean;
    version: number | null;
    identifiers: Identifier[];
    sortedIdentifiers: Identifier[];
    setName: (name: string) => void;
    setMinify: (minify: boolean) => void;
    setLogger: (logger: Logger | undefined) => void;
    setFiles: (files: Record<string, Uint8Array>) => void;
    setElements: (elements: RegistryElement<GetAnalyserVoxel<T>>[]) => void;
    setCurrentElementId: (id: Identifier | undefined) => void;
    setToggleSection: (section: Record<string, ToggleSection> | undefined) => void;
    changeToggleValue: (id: string, name: ToggleSection) => void;
    setConfiguration: (config: ToolConfiguration | null) => void;
    setIsJar: (isJar: boolean) => void;
    setVersion: (version: number | null) => void;
    handleChange: (action: Action, identifier?: Identifier, value?: ActionValue) => void;
    batchUpdate: (updates: Partial<ConfiguratorState<T>>) => void;
}

const createConfiguratorStore = <T extends keyof Analysers>() =>
    create<ConfiguratorState<T>>((set, get) => ({
        name: "",
        minify: true,
        files: {},
        elements: [],
        elementsMap: new Map(),
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
        setElements: (elements) =>
            set(() => ({
                elements,
                sortedIdentifiers: Identifier.sortIdentifier(elements.map((e) => e.identifier)),
                identifiers: elements.map((e) => e.identifier)
            })),
        setCurrentElementId: (id) =>
            set({
                currentElementIdString: id?.toString(),
                currentElementId: id,
                currentElement: get().elements.find((e) => e.identifier.equals(id))
            }),
        setToggleSection: (toggleSection) => set({ toggleSection }),
        setConfiguration: (configuration) => set({ configuration }),
        setIsJar: (isJar) => set({ isJar }),
        setVersion: (version) => set({ version }),
        changeToggleValue: (id, name) =>
            set((state) => ({
                toggleSection: { ...state.toggleSection, [id]: name }
            })),
        handleChange: (action, identifier, value) => {
            const state = get();
            const element = identifier ? state.elements.find((elem) => elem.identifier.equals(identifier)) : state.currentElement;

            if (!element) {
                console.error("Element not found");
                return;
            }

            const updatedElement = updateData(action, element, state.version ?? Number.POSITIVE_INFINITY, value);
            if (!updatedElement) return;

            const isVoxelElement = isRegistryVoxelElement(updatedElement);
            if (!isVoxelElement) return;

            set((state) => ({
                elements: state.elements.map((item) => (item.identifier.equals(updatedElement.identifier) ? updatedElement : item))
            }));
        },
        batchUpdate: (updates) => {
            const elements = updates.elements;
            if (elements) {
                updates.sortedIdentifiers = Identifier.sortIdentifier(elements.map((e) => e.identifier));
                updates.identifiers = elements.map((e) => e.identifier);
            }

            const currentElementId = updates.currentElementId;
            if (currentElementId) {
                updates.currentElementIdString = currentElementId.toString();
                updates.currentElement = (elements ?? get().elements).find((e) => e.identifier.equals(currentElementId));
            }

            set(updates);
        }
    }));

export const useConfiguratorStore = createConfiguratorStore<"enchantment">();

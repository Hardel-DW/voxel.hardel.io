import { create } from "zustand";
import type { Identifier } from "@/lib/minecraft/core/Identifier";
import type { Analysers, GetAnalyserVoxel } from "@/lib/minecraft/core/engine/Analyser";
import type { Action, ActionValue } from "@/lib/minecraft/core/engine/actions";
import { updateData } from "@/lib/minecraft/core/engine/actions";
import type { Logger } from "@/lib/minecraft/core/engine/migrations/logger";
import type { Unresolved } from "@/lib/minecraft/core/engine/resolver/field/type";
import type { ToolConfiguration } from "@/lib/minecraft/core/schema/primitive";
import type { ToggleSection } from "@/lib/minecraft/core/schema/primitive/toggle";
import type { RegistryElement } from "@/lib/minecraft/mczip";

export interface ConfiguratorState<T extends keyof Analysers> {
    name: string;
    minify: boolean;
    logger?: Logger;
    files: Record<string, Uint8Array>;
    elements: RegistryElement<GetAnalyserVoxel<T>>[];
    currentElementId?: Identifier;
    toggleSection?: Record<string, ToggleSection>;
    configuration: Unresolved<ToolConfiguration> | null;
    isJar: boolean;
    version: number | null;
    setName: (name: string) => void;
    setMinify: (minify: boolean) => void;
    setLogger: (logger: Logger | undefined) => void;
    setFiles: (files: Record<string, Uint8Array>) => void;
    setElements: (elements: RegistryElement<GetAnalyserVoxel<T>>[]) => void;
    setCurrentElementId: (id: Identifier | undefined) => void;
    setToggleSection: (section: Record<string, ToggleSection> | undefined) => void;
    changeToggleValue: (id: string, name: ToggleSection) => void;
    setConfiguration: (config: Unresolved<ToolConfiguration> | null) => void;
    setIsJar: (isJar: boolean) => void;
    setVersion: (version: number | null) => void;
    handleChange: (action: Action, identifier?: Identifier, value?: ActionValue) => void;
}

// Create a single store instance
const createConfiguratorStore = <T extends keyof Analysers>() =>
    create<ConfiguratorState<T>>((set, get) => ({
        name: "",
        minify: true,
        files: {},
        elements: [],
        configuration: null,
        isJar: false,
        version: null,
        setName: (name) => set({ name }),
        setMinify: (minify) => set({ minify }),
        setLogger: (logger) => set({ logger }),
        setFiles: (files) => set({ files }),
        setElements: (elements) => set({ elements }),
        setCurrentElementId: (currentElementId) => set({ currentElementId }),
        setToggleSection: (toggleSection) => set({ toggleSection }),
        setConfiguration: (configuration) => set({ configuration }),
        setIsJar: (isJar) => set({ isJar }),
        setVersion: (version) => set({ version }),
        changeToggleValue: (id, name) => set((state) => ({ toggleSection: { ...state.toggleSection, [id]: name } })),
        handleChange: (action, identifier, value) => {
            const state = get();

            if (!identifier && !state.currentElementId) {
                console.error("No element identifier provided");
                return;
            }

            const element = identifier
                ? state.elements.find((elem) => elem.identifier.equals(identifier))
                : state.elements.find((elem) => state.currentElementId && elem.identifier.equals(state.currentElementId));

            if (!element) {
                console.error("Element not found");
                return;
            }

            const updatedElement = updateData<T>(action, element, state.version ?? Number.POSITIVE_INFINITY, value);

            if (
                updatedElement &&
                state.logger &&
                state.version &&
                state.configuration?.analyser.id &&
                typeof state.configuration?.analyser.id === "string"
            ) {
                state.logger.handleActionDifference(
                    action,
                    element,
                    state.version ?? Number.POSITIVE_INFINITY,
                    state.configuration?.analyser.id as T,
                    value
                );
            }

            if (!updatedElement) return;

            set((state) => ({
                elements: state.elements.map((item) => (item.identifier.equals(updatedElement.identifier) ? updatedElement : item))
            }));
        }
    }));

export const useConfiguratorStore = createConfiguratorStore<"enchantment">();

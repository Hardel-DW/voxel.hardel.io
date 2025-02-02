import { isVoxelElement, sortVoxelElements } from "@/lib/minecraft/core/Element";
import type { IdentifierObject } from "@/lib/minecraft/core/Identifier";
import type { Analysers, GetAnalyserVoxel } from "@/lib/minecraft/core/engine/Analyser";
import { type CompileDatapackResult, compileDatapack } from "@/lib/minecraft/core/engine/Compiler";
import type { ParseDatapackResult } from "@/lib/minecraft/core/engine/Parser";
import type { Action, ActionValue } from "@/lib/minecraft/core/engine/actions";
import { updateData } from "@/lib/minecraft/core/engine/actions";
import type { Logger } from "@/lib/minecraft/core/engine/migrations/logger";
import type { ToolConfiguration } from "@/lib/minecraft/core/schema/primitive";
import type { ToggleSection } from "@/lib/minecraft/core/schema/primitive/toggle";
import { create } from "zustand";

export interface ConfiguratorState<T extends keyof Analysers> {
    name: string;
    minify: boolean;
    logger?: Logger;
    files: Record<string, Uint8Array>;
    elements: Map<string, GetAnalyserVoxel<T>>;
    currentElementId?: string;
    toggleSection?: Record<string, ToggleSection>;
    configuration: ToolConfiguration | null;
    isJar: boolean;
    version: number | null;
    sortedIdentifiers: string[];
    identifiers: IdentifierObject[];
    setName: (name: string) => void;
    setMinify: (minify: boolean) => void;
    setIdentifiers: (identifiers: IdentifierObject[]) => void;
    setLogger: (logger: Logger | undefined) => void;
    setFiles: (files: Record<string, Uint8Array>) => void;
    setCurrentElementId: (id: string | undefined) => void;
    setToggleSection: (section: Record<string, ToggleSection> | undefined) => void;
    changeToggleValue: (id: string, name: ToggleSection) => void;
    setConfiguration: (config: ToolConfiguration | null) => void;
    setIsJar: (isJar: boolean) => void;
    setVersion: (version: number | null) => void;
    handleChange: (action: Action, identifier?: string, value?: ActionValue) => void;
    setup: (updates: ParseDatapackResult<GetAnalyserVoxel<T>>) => void;
    compile: () => Array<CompileDatapackResult<T>>;
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
        sortedIdentifiers: [],
        identifiers: [],
        setName: (name) => set({ name }),
        setMinify: (minify) => set({ minify }),
        setLogger: (logger) => set({ logger }),
        setFiles: (files) => set({ files }),
        setIdentifiers: (identifiers) => set({ identifiers }),
        setCurrentElementId: (currentElementId) => set({ currentElementId }),
        setToggleSection: (toggleSection) => set({ toggleSection }),
        setConfiguration: (configuration) => set({ configuration }),
        setIsJar: (isJar) => set({ isJar }),
        setVersion: (version) => set({ version }),
        changeToggleValue: (id, name) => set((state) => ({ toggleSection: { ...state.toggleSection, [id]: name } })),
        handleChange: (action, identifier, value) => {
            const state = get();
            const elementId = identifier ?? state.currentElementId;
            const element = elementId ? state.elements.get(elementId) : undefined;

            if (!element) {
                console.error("Element not found");
                return;
            }

            const updatedElement = updateData(action, element, state.version ?? Number.POSITIVE_INFINITY, value);
            if (!updatedElement) return;

            const isElementValid = isVoxelElement(updatedElement);
            if (!isElementValid || !elementId) return;

            if (state.logger && state.version && typeof state.configuration?.analyser.id === "string") {
                state.logger.handleActionDifference(
                    action,
                    element,
                    state.version ?? Number.POSITIVE_INFINITY,
                    state.configuration?.analyser.id as T,
                    value
                );
            }

            set((state) => ({
                elements: state.elements.set(elementId, updatedElement)
            }));
        },
        setup: (updates) => set({ ...updates, sortedIdentifiers: sortVoxelElements(updates.elements) }),
        compile: () => {
            const { elements, version, files, configuration, identifiers } = get();
            if (!version || !files || !configuration) {
                console.error("Version, files or configuration is missing");
                return [];
            }

            return compileDatapack({
                elements: Array.from(elements.values()),
                version,
                files,
                tool: configuration.analyser.id,
                identifiers
            });
        }
    }));

export const useConfiguratorStore = createConfiguratorStore<"enchantment">();

export const getCurrentElement = <T extends keyof Analysers>(state: ConfiguratorState<T>) =>
    state.currentElementId ? state.elements.get(state.currentElementId) : undefined;

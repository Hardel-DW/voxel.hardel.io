import type { Identifier } from "@/lib/minecraft/core/Identifier.ts";
import type { Analysers, GetAnalyserVoxel } from "@/lib/minecraft/core/engine/Analyser.ts";
import type { Action, ActionValue } from "@/lib/minecraft/core/engine/actions";
import { updateData } from "@/lib/minecraft/core/engine/actions";
import { createDifferenceFromAction } from "@/lib/minecraft/core/engine/migrations/logValidation";
import type { Logger } from "@/lib/minecraft/core/engine/migrations/logger";
import type { Unresolved } from "@/lib/minecraft/core/engine/resolver/field/type";
import type { ToolConfiguration } from "@/lib/minecraft/core/schema/primitive";
import type { ToggleSection } from "@/lib/minecraft/core/schema/primitive/toggle";
import type { RegistryElement } from "@/lib/minecraft/mczip.ts";
import type React from "react";
import { type ReactNode, createContext, useContext, useState } from "react";

export interface ConfiguratorContextType<T extends keyof Analysers> {
    name: string;
    setName: (name: string) => void;

    // Store the list of files
    files: Record<string, Uint8Array>;
    setFiles: (files: Record<string, Uint8Array>) => void;

    // Store the minify state
    minify: boolean;
    setMinify: (minify: boolean) => void;

    // Logger
    logger?: Logger;
    setLogger: React.Dispatch<React.SetStateAction<Logger | undefined>>;

    // Store the list of elements
    elements: RegistryElement<GetAnalyserVoxel<T>>[];
    setElements: React.Dispatch<React.SetStateAction<RegistryElement<GetAnalyserVoxel<T>>[]>>;

    // Store the current element data
    currentElement?: RegistryElement<GetAnalyserVoxel<T>>;
    setCurrentElementId: React.Dispatch<React.SetStateAction<Identifier | undefined>>;

    // Store toggle section
    toggleSection?: Record<string, ToggleSection>;
    setToggleSection: React.Dispatch<React.SetStateAction<Record<string, ToggleSection> | undefined>>;
    changeToggleValue: (id: string, name: ToggleSection) => void;

    // Store the configuration
    configuration: Unresolved<ToolConfiguration> | null;
    setConfiguration: React.Dispatch<React.SetStateAction<Unresolved<ToolConfiguration> | null>>;

    // Store whether the file is a JAR
    isJar: boolean;
    setIsJar: React.Dispatch<React.SetStateAction<boolean>>;

    // Store the version of the datapack
    version: number | null;
    setVersion: (version: number) => void;

    // Store the type of tool
    tool: T;
    handleChange: (action: Action, identifier?: Identifier, value?: ActionValue) => void;
}

const ConfiguratorContext = createContext<ConfiguratorContextType<any> | undefined>(undefined);
export function ConfiguratorProvider<T extends keyof Analysers>(props: {
    children: ReactNode;
    tool: T;
}) {
    const [name, setName] = useState<string>("");
    const [minify, setMinify] = useState<boolean>(true);
    const [logger, setLogger] = useState<Logger>();
    const [files, setFiles] = useState<Record<string, Uint8Array>>({});
    const [elements, setElements] = useState<RegistryElement<GetAnalyserVoxel<T>>[]>([]);
    const [currentElementId, setCurrentElementId] = useState<Identifier>();
    const [toggleSection, setToggleSection] = useState<Record<string, ToggleSection>>();
    const [isJar, setIsJar] = useState<boolean>(false);
    const [version, setVersion] = useState<number | null>(null);
    const [configuration, setConfiguration] = useState<Unresolved<ToolConfiguration> | null>(null);
    const currentElement = currentElementId && elements.find((element) => element.identifier.equals(currentElementId));

    const changeToggleValue = (id: string, name: ToggleSection) => {
        setToggleSection((prevState) => ({
            ...prevState,
            [id]: name
        }));
    };

    const handleChange = (action: Action, identifier?: Identifier, value?: ActionValue) => {
        const element = identifier ? elements.find((elem) => elem.identifier.equals(identifier)) : currentElement;
        if (!element) {
            console.error("Element not found");
            return;
        }
        const updatedElement = updateData<T>(action, element, version ?? Number.POSITIVE_INFINITY, value);
        if (updatedElement && logger && version) {
            const difference = createDifferenceFromAction(action, updatedElement, files, version, props.tool);

            if (difference) {
                logger.logDifference(element.identifier.toString(), element.identifier.getRegistry() || "unknown", difference);
            }
        }

        if (!updatedElement) return;

        setElements((prev) => {
            const index = prev.findIndex((item) => item.identifier.equals(updatedElement.identifier));
            return index === -1 ? prev : prev.toSpliced(index, 1, updatedElement);
        });
    };

    const contextValue: ConfiguratorContextType<T> = {
        name,
        setName,
        minify,
        setMinify,
        logger,
        setLogger,
        files,
        setFiles,
        elements,
        setElements,
        currentElement,
        setCurrentElementId,
        toggleSection,
        setToggleSection,
        changeToggleValue,
        configuration,
        setConfiguration,
        isJar,
        setIsJar,
        version,
        setVersion,
        tool: props.tool,
        handleChange
    };

    return <ConfiguratorContext.Provider value={contextValue}>{props.children}</ConfiguratorContext.Provider>;
}

export function useConfigurator<T extends keyof Analysers>(): ConfiguratorContextType<T> {
    const context = useContext(ConfiguratorContext);
    if (!context) {
        throw new Error("useConfigurator must be used within an ConfiguratorProvider");
    }

    return context as unknown as ConfiguratorContextType<T>;
}

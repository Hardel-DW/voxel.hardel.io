import type { Identifier } from "@/lib/minecraft/core/Identifier.ts";
import type { ToolConfiguration } from "@/lib/minecraft/core/engine";
import type { Analysers, VoxelElement } from "@/lib/minecraft/core/engine/Analyser.ts";
import type { Logger } from "@/lib/minecraft/core/engine/migrations/logger";
import type { RegistryElement } from "@/lib/minecraft/mczip.ts";
import type React from "react";
import { type ReactNode, createContext, useContext, useState } from "react";
import type { ToggleSection } from "./elements/ToolSection";

export interface ConfiguratorContextType<T extends VoxelElement> {
    // Store the name of the current element
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
    elements: RegistryElement<T>[];
    setElements: React.Dispatch<React.SetStateAction<RegistryElement<T>[]>>;

    // Store the current element data
    currentElement?: RegistryElement<T>;
    setCurrentElementId: React.Dispatch<React.SetStateAction<Identifier | undefined>>;

    // Store toggle section
    toggleSection?: Record<string, ToggleSection>;
    setToggleSection: React.Dispatch<React.SetStateAction<Record<string, ToggleSection> | undefined>>;
    changeToggleValue: (id: string, name: ToggleSection) => void;

    // Store the configuration
    configuration: ToolConfiguration | null;
    setConfiguration: React.Dispatch<React.SetStateAction<ToolConfiguration | null>>;

    // Store whether the file is a JAR
    isJar: boolean;
    setIsJar: React.Dispatch<React.SetStateAction<boolean>>;

    // Store the version of the datapack
    version: number | null;
    setVersion: (version: number) => void;

    // Store the type of tool
    tool: keyof Analysers;
}

const ConfiguratorContext = createContext<ConfiguratorContextType<VoxelElement> | undefined>(undefined);
export function ConfiguratorProvider<T extends VoxelElement>(props: {
    children: ReactNode;
    tool: keyof Analysers;
}) {
    const [name, setName] = useState<string>("");
    const [minify, setMinify] = useState<boolean>(true);
    const [logger, setLogger] = useState<Logger>();
    const [files, setFiles] = useState<Record<string, Uint8Array>>({});
    const [elements, setElements] = useState<RegistryElement<T>[]>([]);
    const [currentElementId, setCurrentElementId] = useState<Identifier>();
    const [toggleSection, setToggleSection] = useState<Record<string, ToggleSection>>();
    const [isJar, setIsJar] = useState<boolean>(false);
    const [version, setVersion] = useState<number | null>(null);
    const [configuration, setConfiguration] = useState<ToolConfiguration | null>(null);
    const currentElement = currentElementId && elements.find((element) => element.identifier.equals(currentElementId));

    const changeToggleValue = (id: string, name: ToggleSection) => {
        setToggleSection((prevState) => ({
            ...prevState,
            [id]: name
        }));
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
        tool: props.tool
    };

    return (
        <ConfiguratorContext.Provider value={contextValue as ConfiguratorContextType<VoxelElement>}>
            {props.children}
        </ConfiguratorContext.Provider>
    );
}

export function useConfigurator<T extends VoxelElement>(): ConfiguratorContextType<T> {
    const context = useContext(ConfiguratorContext);
    if (!context) {
        throw new Error("useConfigurator must be used within an ConfiguratorProvider");
    }

    return context as unknown as ConfiguratorContextType<T>;
}

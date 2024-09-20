import type { Identifier } from "@/lib/minecraft/core/Identifier.ts";
import type { ToolConfiguration } from "@/lib/minecraft/core/engine";
import type { VoxelElement } from "@/lib/minecraft/core/engine/Analyser.ts";
import type { RegistryElement } from "@/lib/minecraft/mczip.ts";
import type React from "react";
import { type ReactNode, createContext, useContext, useState } from "react";

export interface ConfiguratorContextType<T extends VoxelElement> {
    // Store the name of the current element
    name: string;
    setName: (name: string) => void;

    // Store the list of files
    files: Record<string, Uint8Array>;
    setFiles: (files: Record<string, Uint8Array>) => void;

    // Store the list of elements
    elements: RegistryElement<T>[];
    setElements: React.Dispatch<React.SetStateAction<RegistryElement<T>[]>>;

    // Store the current element data
    currentElement?: RegistryElement<T>;
    setCurrentElementId: React.Dispatch<React.SetStateAction<Identifier | undefined>>;

    // Store toggle section
    toggleSection?: Record<string, string>;
    setToggleSection: (id: string, name: string) => void;

    // Store the configuration
    configuration?: ToolConfiguration;

    // Store whether the file is a JAR
    isJar: boolean;
    setIsJar: React.Dispatch<React.SetStateAction<boolean>>;

    // Store the version of the datapack
    version: number | null;
    setVersion: (version: number) => void;
}

interface ConfiguratorProviderProps {
    children: ReactNode;
    initialToggleSection?: Record<string, string>;
    config: ToolConfiguration;
}

const ConfiguratorContext = createContext<ConfiguratorContextType<any> | undefined>(undefined);

export function ConfiguratorProvider<T extends VoxelElement>({ children, initialToggleSection, config }: ConfiguratorProviderProps) {
    const configuration = config;
    const [name, setName] = useState<string>("");
    const [files, setFiles] = useState<Record<string, Uint8Array>>({});
    const [elements, setElements] = useState<RegistryElement<T>[]>([]);
    const [currentElementId, setCurrentElementId] = useState<Identifier>();
    const [toggleSection, setToggleSectionState] = useState<Record<string, string> | undefined>(initialToggleSection);
    const [isJar, setIsJar] = useState<boolean>(false);
    const [version, setVersion] = useState<number | null>(null);
    const currentElement = currentElementId && elements.find((element) => element.identifier.equals(currentElementId));

    const setToggleSection = (id: string, name: string) => {
        setToggleSectionState((prevState) => ({
            ...prevState,
            [id]: name
        }));
    };

    const contextValue: ConfiguratorContextType<T> = {
        name,
        setName,
        files,
        setFiles,
        elements,
        setElements,
        currentElement,
        setCurrentElementId,
        toggleSection,
        setToggleSection,
        configuration,
        isJar,
        setIsJar,
        version,
        setVersion
    };

    return <ConfiguratorContext.Provider value={contextValue}>{children}</ConfiguratorContext.Provider>;
}

export function useConfigurator<T extends VoxelElement>(): ConfiguratorContextType<T> {
    const context = useContext(ConfiguratorContext);
    if (!context) {
        throw new Error("useConfigurator must be used within an ConfiguratorProvider");
    }

    return context;
}

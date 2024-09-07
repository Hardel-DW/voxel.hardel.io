import type { RegistryElement } from "@/lib/minecraft/mcschema.ts";
import type React from "react";
import { type ReactNode, createContext, useContext, useState } from "react";

export interface ConfiguratorContextType<T> {
    files: Record<string, Uint8Array>;
    setFiles: (files: Record<string, Uint8Array>) => void;

    // Store the list of elements
    elements: RegistryElement<T>[];
    setElements: React.Dispatch<React.SetStateAction<RegistryElement<T>[]>>;

    // Store the current element data
    currentElement?: RegistryElement<T>;
    setCurrentElement: React.Dispatch<React.SetStateAction<RegistryElement<T> | undefined>>;

    // Store toggle section
    toggleSection?: Record<string, string>;
    setToggleSection: (id: string, name: string) => void;
}

interface ConfiguratorProviderProps {
    children: ReactNode;
    initialToggleSection?: Record<string, string>;
}

const ConfiguratorContext = createContext<ConfiguratorContextType<any> | undefined>(undefined);

export function ConfiguratorProvider<T>({ children, initialToggleSection }: ConfiguratorProviderProps) {
    const [files, setFiles] = useState<Record<string, Uint8Array>>({});
    const [elements, setElements] = useState<RegistryElement<T>[]>([]);
    const [currentElement, setCurrentElement] = useState<RegistryElement<T>>();
    const [toggleSection, setToggleSectionState] = useState<Record<string, string> | undefined>(initialToggleSection);

    const setToggleSection = (id: string, name: string) => {
        setToggleSectionState((prevState) => ({
            ...prevState,
            [id]: name
        }));
    };

    const contextValue: ConfiguratorContextType<T> = {
        files,
        setFiles,
        elements,
        setElements,
        currentElement,
        setCurrentElement,
        toggleSection,
        setToggleSection
    };

    return <ConfiguratorContext.Provider value={contextValue}>{children}</ConfiguratorContext.Provider>;
}

export function useConfigurator<T>(): ConfiguratorContextType<T> {
    const context = useContext(ConfiguratorContext);
    if (!context) {
        throw new Error("useConfigurator must be used within an ConfiguratorProvider");
    }

    return context;
}

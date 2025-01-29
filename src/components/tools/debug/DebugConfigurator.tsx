import type { Analysers, versionedAnalyserCollection } from "@/lib/minecraft/core/engine/Analyser.ts";
import { type CompileDatapackResult, compileDatapack, getIdentifierFromCompiler } from "@/lib/minecraft/core/engine/Compiler.ts";
import { useConfiguratorStore } from "@/lib/store/configuratorStore";
import { useCallback, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import DebugPanel from "./DebugPanel";

export default function DebugConfigurator() {
    const [isDebugging, setIsDebugging] = useState(false);
    const [datapack, setDatapack] = useState<Record<string, CompileDatapackResult<keyof Analysers>[]>>();
    const [selectedElement, setSelectedElement] = useState<CompileDatapackResult<keyof Analysers>>();
    const [namespaces, setNamespaces] = useState<string[]>([]);

    const groupByRegistry = useCallback(
        (elements: CompileDatapackResult<keyof Analysers>[]): Record<string, CompileDatapackResult<keyof Analysers>[]> => {
            const groups: Record<string, CompileDatapackResult<keyof Analysers>[]> = {};

            for (const element of elements) {
                const identifier = getIdentifierFromCompiler(element);
                const registry = identifier.getRegistry();
                if (!registry) continue;

                if (!groups[registry]) groups[registry] = [];
                groups[registry].push(element);
            }

            return groups;
        },
        []
    );

    const handleDebugging = useCallback(() => {
        const store = useConfiguratorStore.getState();
        if (!store.version || !store.configuration) {
            console.error("Version or configuration is missing");
            return;
        }

        const assembleDatapack = compileDatapack({
            elements: store.elements,
            version: store.version,
            files: store.files,
            identifiers: store.identifiers,
            tool: store.configuration.analyser.id as keyof typeof versionedAnalyserCollection
        });

        const registries = groupByRegistry(assembleDatapack);
        if (!registries) return;

        setDatapack(registries);
        setIsDebugging((prev) => !prev);
        setSelectedElement(registries[Object.keys(registries)[0]][0]);
        setNamespaces(Array.from(new Set(assembleDatapack.map((element) => getIdentifierFromCompiler(element).getNamespace()))));
    }, [groupByRegistry]);

    const debugPanel = useMemo(() => {
        if (isDebugging && datapack) {
            return createPortal(
                <DebugPanel
                    selectedElement={selectedElement}
                    onElementSelect={setSelectedElement}
                    onClose={handleDebugging}
                    datapack={datapack}
                    namespaces={namespaces}
                />,
                document.getElementById("portal") as HTMLElement
            );
        }
        return null;
    }, [isDebugging, datapack, selectedElement, namespaces, handleDebugging]);

    return (
        <>
            {debugPanel}
            <button
                className="p-2 bottom-36 cursor-pointer right-4 z-50 rounded-xl size-10"
                onClick={handleDebugging}
                onKeyDown={handleDebugging}
                type="button">
                <img src="/icons/debug.svg" alt="Debug Configurator" className="invert" />
            </button>
        </>
    );
}

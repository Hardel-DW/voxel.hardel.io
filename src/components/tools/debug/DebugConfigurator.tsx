import type { Analysers } from "@/lib/minecraft/core/engine/Analyser.ts";
import { type CompileDatapackResult, getIdentifierFromCompiler } from "@/lib/minecraft/core/engine/Compiler.ts";
import { useConfiguratorStore } from "@/lib/minecraft/core/engine/Store";
import { useState } from "react";
import { createPortal } from "react-dom";
import DebugPanel from "./DebugPanel";

export default function DebugConfigurator() {
    const [isDebugging, setIsDebugging] = useState(false);
    const [datapack, setDatapack] = useState<Record<string, CompileDatapackResult<keyof Analysers>[]>>();
    const [selectedElement, setSelectedElement] = useState<CompileDatapackResult<keyof Analysers>>();
    const [namespaces, setNamespaces] = useState<string[]>([]);

    const groupByRegistry = (
        elements: CompileDatapackResult<keyof Analysers>[]
    ): Record<string, CompileDatapackResult<keyof Analysers>[]> => {
        const groups: Record<string, CompileDatapackResult<keyof Analysers>[]> = {};

        for (const element of elements) {
            const identifier = getIdentifierFromCompiler(element);
            const registry = identifier.registry;
            if (!registry) continue;

            if (!groups[registry]) groups[registry] = [];
            groups[registry].push(element);
        }

        return groups;
    };

    const handleDebugging = () => {
        const store = useConfiguratorStore.getState();
        if (!store.version || !store.configuration) {
            console.error("Version or configuration is missing");
            return;
        }

        const assembleDatapack = store.compile();
        const registries = groupByRegistry(assembleDatapack);
        if (!registries) return;

        setDatapack(registries);
        setIsDebugging((prev) => !prev);
        setSelectedElement(registries[Object.keys(registries)[0]][0]);
        setNamespaces(Array.from(new Set(assembleDatapack.map((element) => getIdentifierFromCompiler(element).namespace))));
    };

    const debugPanel =
        isDebugging && datapack
            ? createPortal(
                  <DebugPanel
                      selectedElement={selectedElement}
                      onElementSelect={setSelectedElement}
                      onClose={handleDebugging}
                      datapack={datapack}
                      namespaces={namespaces}
                  />,
                  document.getElementById("portal") as HTMLElement
              )
            : null;

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

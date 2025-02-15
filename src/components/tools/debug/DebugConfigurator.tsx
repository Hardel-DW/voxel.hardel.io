import DebugPanel from "@/components/tools/debug/DebugPanel";
import { getLabeledIdentifier } from "@voxelio/breeze/core";
import { useConfiguratorStore } from "@/components/tools/Store";
import type { LabeledElement } from "@voxelio/breeze/core";
import { useState } from "react";
import { createPortal } from "react-dom";

export default function DebugConfigurator() {
    const [isDebugging, setIsDebugging] = useState(false);
    const [datapack, setDatapack] = useState<Record<string, LabeledElement[]>>();
    const [selectedElement, setSelectedElement] = useState<LabeledElement>();
    const [namespaces, setNamespaces] = useState<string[]>([]);

    const groupByRegistry = (elements: LabeledElement[]): Record<string, LabeledElement[]> => {
        const groups: Record<string, LabeledElement[]> = {};

        for (const element of elements) {
            const identifier = getLabeledIdentifier(element);
            const registry = identifier.registry;
            if (!registry) continue;

            if (!groups[registry]) groups[registry] = [];
            groups[registry].push(element);
        }

        return groups;
    };

    const handleDebugging = () => {
        const store = useConfiguratorStore.getState();
        if (!store.version || !store.config) {
            console.error("Version or configuration is missing");
            return;
        }

        const assembleDatapack = store.compile();
        const registries = groupByRegistry(assembleDatapack);
        if (!registries) return;

        setDatapack(registries);
        setIsDebugging((prev) => !prev);
        setSelectedElement(registries[Object.keys(registries)[0]][0]);
        setNamespaces(Array.from(new Set(assembleDatapack.map((element) => getLabeledIdentifier(element).namespace))));
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
            <button className="p-2 bottom-36 cursor-pointer right-4 z-50 rounded-xl size-10" onClick={handleDebugging} type="button">
                <img src="/icons/debug.svg" alt="Debug Configurator" className="invert" />
            </button>
        </>
    );
}

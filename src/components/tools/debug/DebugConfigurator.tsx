import type { Analysers, versionedAnalyserCollection } from "@/lib/minecraft/core/engine/Analyser.ts";
import { compileDatapack, getIdentifierFromCompiler, type CompileDatapackResult } from "@/lib/minecraft/core/engine/Compiler.ts";
import { useState } from "react";
import { createPortal } from "react-dom";
import { useConfiguratorStore } from "@/lib/store/configuratorStore";
import { RegistrySection } from "@/components/tools/debug/RegistrySection";
import { CodeSection } from "@/components/tools/debug/CodeSection";

export default function DebugConfigurator() {
    const [isDebugging, setIsDebugging] = useState(false);
    const [datapack, setDatapack] = useState<Record<string, CompileDatapackResult<keyof Analysers>[]>>();
    const [selectedElement, setSelectedElement] = useState<CompileDatapackResult<keyof Analysers>>();
    const [namespaces, setNamespaces] = useState<string[]>([]);

    const store = useConfiguratorStore();
    const configuration = store.configuration;
    const version = store.version;
    const elements = store.elements;
    const files = store.files;
    const name = store.name;

    const groupByRegistry = (
        elements: CompileDatapackResult<keyof Analysers>[]
    ): Record<string, CompileDatapackResult<keyof Analysers>[]> => {
        const groups: Record<string, CompileDatapackResult<keyof Analysers>[]> = {};

        for (const element of elements) {
            const identifier = getIdentifierFromCompiler(element);
            const registry = identifier.getRegistry();
            if (!registry) continue;

            if (!groups[registry]) groups[registry] = [];
            groups[registry].push(element);
        }

        return groups;
    };

    const handleDebugging = () => {
        if (!version || !configuration) {
            console.error("Version or configuration is missing");
            return;
        }

        const assembleDatapack = compileDatapack({
            elements,
            version,
            files,
            identifiers: store.identifiers,
            tool: configuration.analyser.id as keyof typeof versionedAnalyserCollection
        });

        const registries = groupByRegistry(assembleDatapack);
        if (!registries) return;

        setDatapack(registries);
        setIsDebugging(!isDebugging);
        setSelectedElement(registries[Object.keys(registries)[0]][0]);
        setNamespaces(Array.from(new Set(assembleDatapack.map((element) => getIdentifierFromCompiler(element).getNamespace()))));
    };

    if (isDebugging && datapack) {
        return createPortal(
            <div className="fixed border-zinc-800 border-t border-l bg-header-cloudy rounded-2xl shadow-black inset-4 p-8 z-200">
                <div className="absolute bottom-0 right-0 size-96 rounded-full bg-linear-to-bl from-rose-400 to-rose-700 opacity-50 blur-[20rem]" />
                <div className="absolute top-0 left-0 size-72 rounded-full bg-linear-to-bl from-blue-400 to-blue-700 opacity-50 blur-[20rem]" />

                <div className="grid grid-cols-2 gap-8 h-full">
                    <div className="flex flex-col gap-2 gap-y-16 h-full overflow-y-auto">
                        {Object.entries(datapack).map(([registry, elements]) => (
                            <RegistrySection
                                key={registry}
                                registry={registry}
                                elements={elements}
                                namespaces={namespaces}
                                selectedElement={selectedElement}
                                onElementSelect={setSelectedElement}
                            />
                        ))}
                    </div>
                    <CodeSection code={selectedElement} name={name} version={version} onClose={handleDebugging} />
                </div>
            </div>,
            document.getElementById("portal") as HTMLElement
        );
    }

    return (
        <button
            className="p-2 bottom-36 cursor-pointer right-4 z-50 rounded-xl size-10"
            onClick={handleDebugging}
            onKeyDown={handleDebugging}
            type="button">
            <img src="/icons/debug.svg" alt="Debug Configurator" className="invert" />
        </button>
    );
}

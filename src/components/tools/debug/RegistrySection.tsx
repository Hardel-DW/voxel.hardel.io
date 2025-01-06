import type { Analysers } from "@/lib/minecraft/core/engine/Analyser";
import type { CompileDatapackResult } from "@/lib/minecraft/core/engine/Compiler";
import { NamespaceElement } from "./NamespaceElement";

interface RegistryListProps {
    registry: string;
    elements: CompileDatapackResult<keyof Analysers>[];
    namespaces: string[];
    selectedElement: CompileDatapackResult<keyof Analysers> | undefined;
    onElementSelect: (element: CompileDatapackResult<keyof Analysers>) => void;
}

export function RegistrySection({ registry, elements, namespaces, selectedElement, onElementSelect }: RegistryListProps) {
    return (
        <>
            <div key={registry}>
                <div className="pb-4">
                    <h3 className="text-2xl font-semibold">{registry.replace(/\//g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}</h3>
                    <hr className="border-zinc-800" />
                </div>
                {namespaces.map((namespace) => (
                    <NamespaceElement
                        key={namespace}
                        elements={elements}
                        namespace={namespace}
                        selectedElement={selectedElement}
                        onElementSelect={onElementSelect}
                    />
                ))}
            </div>
        </>
    );
}

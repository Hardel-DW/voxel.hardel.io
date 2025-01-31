import { RegistryElement } from "@/components/tools/debug/RegistryElement";
import type { Analysers } from "@/lib/minecraft/core/engine/Analyser";
import type { CompileDatapackResult } from "@/lib/minecraft/core/engine/Compiler";
import { getIdentifierFromCompiler } from "@/lib/minecraft/core/engine/Compiler";
import { identifierToFilePath } from "@/lib/minecraft/core/Identifier";

interface NamespaceElementProps {
    namespace: string;
    elements: CompileDatapackResult<keyof Analysers>[];
    selectedElement: CompileDatapackResult<keyof Analysers> | undefined;
    onElementSelect: (element: CompileDatapackResult<keyof Analysers>) => void;
}

export function NamespaceElement({ namespace, elements, selectedElement, onElementSelect }: NamespaceElementProps) {
    if (!elements.some((element) => getIdentifierFromCompiler(element).namespace === namespace)) return null;

    return (
        <div key={namespace} className="grid grid-cols-2 gap-4 pr-4 bg-black/30 rounded-2xl p-4 mb-4">
            <div className="py-4 col-span-2">
                <h4 className="w-fit px-2 text-lg font-semibold rounded-2xl bg-zinc-700/50 text-zinc-500">
                    {namespace.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                </h4>
            </div>

            {elements
                .filter((element) => getIdentifierFromCompiler(element).namespace === namespace)
                .map((e) => (
                    <RegistryElement
                        key={identifierToFilePath(getIdentifierFromCompiler(e))}
                        element={e}
                        selectedElement={selectedElement}
                        onElementSelect={onElementSelect}
                    />
                ))}
        </div>
    );
}

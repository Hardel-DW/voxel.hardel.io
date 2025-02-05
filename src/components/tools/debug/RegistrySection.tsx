import type { LabeledElement } from "@/lib/minecraft/core/schema/primitive/label";
import { NamespaceElement } from "@/components/tools/debug/NamespaceElement";

interface RegistryListProps {
    registry: string;
    elements: LabeledElement[];
    namespaces: string[];
    selectedElement: LabeledElement | undefined;
    onElementSelect: (element: LabeledElement) => void;
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

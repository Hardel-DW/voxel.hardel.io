import { CodeSection } from "@/components/tools/debug/CodeSection";
import { RegistrySection } from "@/components/tools/debug/RegistrySection";
import type { LabeledElement } from "@/lib/minecraft/core/schema/primitive/label";

type Props = {
    selectedElement: LabeledElement | undefined;
    onElementSelect: (element: LabeledElement) => void;
    onClose: () => void;
    datapack: Record<string, LabeledElement[]>;
    namespaces: string[];
};

export default function DebugPanel({ selectedElement, onElementSelect, onClose, datapack, namespaces }: Props) {
    return (
        <>
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
                                onElementSelect={onElementSelect}
                            />
                        ))}
                    </div>

                    <CodeSection code={selectedElement} onClose={onClose} />
                </div>
            </div>
        </>
    );
}

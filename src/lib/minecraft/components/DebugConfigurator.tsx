import { useTranslate } from "@/components/TranslateContext.tsx";
import CodeBlock from "@/components/ui/codeblock/CodeBlock.tsx";
import { useConfigurator } from "@/lib/minecraft/components/ConfiguratorContext.tsx";
import type { Analysers, DataDrivenElement, GetAnalyserVoxel } from "@/lib/minecraft/core/engine/Analyser.ts";
import { compileDatapack } from "@/lib/minecraft/core/engine/Compiler.ts";
import type { RegistryElement } from "@/lib/minecraft/mczip.ts";
import { cn } from "@/lib/utils.ts";
import { useState } from "react";
import { createPortal } from "react-dom";

export default function DebugConfigurator<T extends keyof Analysers>() {
    const [isDebugging, setIsDebugging] = useState(false);
    const [datapack, setDatapack] = useState<Record<string, RegistryElement<DataDrivenElement>[]>>();
    const [code, setCode] = useState<RegistryElement<DataDrivenElement>>();
    const [namespaces, setNamespaces] = useState<string[]>([]);
    const { translate } = useTranslate();
    const context = useConfigurator<GetAnalyserVoxel<T>>();

    const groupByRegistry = (elements: RegistryElement<DataDrivenElement>[]): Record<string, RegistryElement<DataDrivenElement>[]> => {
        const groups: Record<string, RegistryElement<DataDrivenElement>[]> = {};

        for (const element of elements) {
            const registry = element.identifier.getRegistry();
            if (!registry) continue;

            if (!groups[registry]) groups[registry] = [];
            groups[registry].push(element);
        }

        return groups;
    };

    const handleDebugging = () => {
        const assembleDatapack = compileDatapack(context);
        const registries = groupByRegistry(assembleDatapack);
        if (!registries) return;

        setDatapack(registries);
        setIsDebugging(!isDebugging);
        setCode(registries[Object.keys(registries)[0]][0]);
        setNamespaces(Array.from(new Set(assembleDatapack.map((element) => element.identifier.getNamespace()))));
    };

    if (isDebugging && datapack) {
        return createPortal(
            <div className="fixed border-zinc-800 border-t border-l bg-header-cloudy rounded-2xl shadow-black inset-4 p-8 z-[200]">
                <div className="absolute bottom-0 right-0 size-96 rounded-full bg-gradient-to-bl from-rose-400 to-rose-700 opacity-50 blur-[20rem]" />
                <div className="absolute top-0 left-0 size-72 rounded-full bg-gradient-to-bl from-blue-400 to-blue-700 opacity-50 blur-[20rem]" />

                <div className="grid grid-cols-2 gap-8 h-full">
                    <div className="flex flex-col gap-2 gap-y-16 h-full overflow-y-auto">
                        {Object.entries(datapack).map(([registry, element]) => (
                            <div key={registry}>
                                <div className="pb-4">
                                    <h3 className="text-2xl font-semibold">
                                        {registry.replace(/\//g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                                    </h3>
                                    <hr className="border-zinc-800" />
                                </div>
                                {namespaces.map((namespace) => {
                                    if (!element.some((element) => element.identifier.getNamespace() === namespace)) return null;

                                    return (
                                        <div key={namespace} className="grid grid-cols-2 gap-4 pr-4 bg-black/30 rounded-2xl p-4 my-4">
                                            <div className="py-4 col-span-2">
                                                <h4 className="w-fit px-2 text-lg font-semibold rounded-2xl bg-zinc-700/50 text-zinc-500">
                                                    {namespace.replace(/\//g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                                                </h4>
                                            </div>

                                            {element
                                                .filter((element) => element.identifier.getNamespace() === namespace)
                                                .map((element) => (
                                                    <div
                                                        key={element.identifier.filePath()}
                                                        onClick={() => setCode(element)}
                                                        onKeyDown={() => setCode(element)}
                                                        className="border-zinc-800 relative cursor-pointer border-t border-b rounded-lg p-2 bg-zinc-900/10 hover:bg-zinc-800/50 transition-colors"
                                                    >
                                                        <p className="absolute top-2 right-2 px-2 rounded-2xl bg-zinc-700/50 text-[0.65rem] text-zinc-500">
                                                            {element.identifier.renderNamespace()}
                                                        </p>
                                                        <div
                                                            className={cn("text-white", {
                                                                "text-rose-500": code && element.identifier.equals(code?.identifier)
                                                            })}
                                                        >
                                                            {element.identifier.renderResource()}
                                                        </div>
                                                        <small className="text-xs text-gray-400">{element.identifier.toString()}</small>
                                                    </div>
                                                ))}
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                    <div className="overflow-hidden h-full pt-8 relative">
                        <p className="absolute -top-2 left-0 rounded-xl text-zinc-500 px-2 py-1">{context.name}</p>
                        <button
                            className="absolute -top-2 right-0 rounded-xl text-zinc-500 hover:text-zinc-200 transition-colors bg-zinc-950/10 px-2 py-1 border-zinc-950"
                            onClick={handleDebugging}
                            onKeyDown={handleDebugging}
                            type="button"
                        >
                            {translate["tools.debug.quit"]}
                        </button>
                        <CodeBlock language="json" title={code?.identifier.render()}>
                            {JSON.stringify(code?.data, null, 4)}
                        </CodeBlock>
                    </div>
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
            type="button"
        >
            <img src="/icons/debug.svg" alt="Debug Configurator" className="invert" />
        </button>
    );
}

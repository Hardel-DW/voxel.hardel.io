import { useConfiguratorStore } from "@/lib/store/configuratorStore";
import { Identifier } from "@/lib/minecraft/core/Identifier";
import { compileDatapack, getIdentifierFromCompiler } from "@/lib/minecraft/core/engine/Compiler";
import { isTag } from "@/lib/minecraft/core/Tag";
import { useComputedTag } from "@/lib/minecraft/net/api/ComputedTag";
import { useMemo } from "react";

export default function ToolTagViewer(props: {
    field?: string;
    registry: string;
    include?: {
        namespace: string;
        registry: string;
        path: string;
        nested: boolean;
    };
}) {
    // Hooks toujours en premier
    const { data, isLoading } = useComputedTag(props.include?.registry || "", props.include?.path || "", {
        namespace: props.include?.namespace,
        nested: props.include?.nested
    });

    const store = useConfiguratorStore();
    const configuration = store.configuration;
    const currentElement = store.getCurrentElement();

    // Calcul des valeurs initiales
    const initialValues = useMemo(() => {
        if (!configuration || !currentElement || !store.version) return [];

        const fieldValue = currentElement.data?.[props.field as keyof typeof currentElement.data];
        if (typeof fieldValue !== "string") return [];

        const assembleDatapack = compileDatapack({
            elements: store.elements,
            version: store.version,
            identifiers: store.identifiers,
            files: store.files,
            tool: configuration.analyser.id
        });

        const tagIdentifier = Identifier.fromString(fieldValue, props.registry);
        const tagData = assembleDatapack.find((element) => getIdentifierFromCompiler(element).equals(tagIdentifier));

        const rawData = tagData?.type !== "deleted" ? tagData?.element : undefined;
        if (!rawData) return null;

        return isTag(rawData) ? rawData.data.values.map((v) => (typeof v === "string" ? v : v.id)) : [];
    }, [configuration, currentElement, store, props.field, props.registry]);

    // Combinaison des valeurs
    const combinedValues = useMemo(() => {
        const values = [];

        if (initialValues) values.push(...initialValues);
        if (data) {
            if (!configuration || !currentElement || !store.version) return [];

            const fieldValue = currentElement.data?.[props.field as keyof typeof currentElement.data];
            if (typeof fieldValue !== "string") return [];

            const tagIdentifier = Identifier.fromString(fieldValue, props.registry);

            const additionalValues = data?.[tagIdentifier.toString()];
            if (additionalValues) values.push(...additionalValues);
        }

        return [...new Set(values)];
    }, [initialValues, data, configuration, currentElement, store, props.field, props.registry]);

    if (!configuration || !currentElement) return null;

    return (
        <div className="border-zinc-800 border bg-header-cloudy rounded-2xl shadow-black p-4 w-96">
            <div className="space-y-2">
                {isLoading ? (
                    <div className="flex justify-center py-8">
                        <div className="w-full h-full bg-zinc-800 rounded-xl animate-pulse" />
                    </div>
                ) : combinedValues.length === 0 ? (
                    <div className="text-center py-6 text-zinc-500 text-sm">Aucune entrée trouvée</div>
                ) : (
                    combinedValues.map((value) => (
                        <div key={value} className="bg-blue-50/5 ring-0 ring-zinc-700 transition-all hover:ring-1 px-6 py-4 rounded-xl">
                            <div className="flex items-center justify-between w-full">
                                <div className="flex flex-col">
                                    <span className="text-white">{Identifier.fromString(value).renderResourceName()}</span>
                                </div>
                                <span className="text-xs text-zinc-400 px-2 py-1 rounded-full bg-zinc-800">
                                    {Identifier.fromString(value).renderNamespace()}
                                </span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

import { TagLoader } from "@/components/tools/elements/schema/tags/TagLoader";
import { ToolTagCard } from "@/components/tools/elements/schema/tags/ToolTagCard";
import { Identifier } from "@/lib/minecraft/core/Identifier";
import { isTag } from "@/lib/minecraft/core/Tag";
import type { Analysers } from "@/lib/minecraft/core/engine/Analyser";
import { compileDatapack, getIdentifierFromCompiler } from "@/lib/minecraft/core/engine/Compiler";
import type { ToolTagViewerType } from "@/lib/minecraft/core/schema/primitive/component";
import { useConfiguratorStore } from "@/lib/store/configuratorStore";
import { useElementValue } from "@/lib/store/hooks";

export default function ToolTagViewer<T extends keyof Analysers>({
    component
}: {
    component: ToolTagViewerType;
}) {
    const fieldValue = component.field ? useElementValue<T, string>({ type: "from_field", field: component.field }) : null;

    const configuration = useConfiguratorStore((state) => state.configuration);
    const version = useConfiguratorStore((state) => state.version);
    const elements = useConfiguratorStore((state) => state.elements);
    const identifiers = useConfiguratorStore((state) => state.identifiers);
    const files = useConfiguratorStore((state) => state.files);

    if (!configuration || !version || (component.field && !fieldValue)) return null;
    if (typeof fieldValue !== "string") return null;

    const assembleDatapack = compileDatapack({
        elements: elements,
        version: version,
        identifiers: identifiers,
        files: files,
        tool: configuration.analyser.id
    });

    const tagIdentifier = Identifier.fromString(fieldValue, component.registry);
    const tagData = assembleDatapack.find((element) => getIdentifierFromCompiler(element).equals(tagIdentifier));
    const rawData = tagData?.type !== "deleted" ? tagData?.element : undefined;

    const initialValues = rawData && isTag(rawData) ? rawData.data.values.map((v) => (typeof v === "string" ? v : v.id)) : [];

    return (
        <div className="border-zinc-800 border bg-header-cloudy rounded-2xl shadow-black p-4 w-96">
            <div className="space-y-2">
                {initialValues.map((value) => (
                    <ToolTagCard key={value} value={value} />
                ))}

                {component.include && tagIdentifier.getNamespace() === "minecraft" && (
                    <TagLoader
                        registry={component.include.registry}
                        path={component.include.path}
                        fileName={tagIdentifier.getFileName()}
                        namespace={component.include.namespace}
                    />
                )}
            </div>
        </div>
    );
}

import { TagLoader } from "@/components/tools/elements/schema/tags/TagLoader";
import { ToolTagCard } from "@/components/tools/elements/schema/tags/ToolTagCard";
import { Identifier } from "@/lib/minecraft/core/Identifier";
import { isTag } from "@/lib/minecraft/core/Tag";
import { compileDatapack, getIdentifierFromCompiler } from "@/lib/minecraft/core/engine/Compiler";
import type { TagViewerInclude } from "@/lib/minecraft/core/schema/primitive/component";
import { useConfiguratorStore } from "@/lib/store/configuratorStore";

export default function ToolTagViewer(props: {
    field?: string;
    registry: string;
    include?: TagViewerInclude;
}) {
    const store = useConfiguratorStore();
    const configuration = store.configuration;
    const version = store.version;
    const currentElement = store.getCurrentElement();

    if (!configuration || !currentElement || !version) return null;

    const fieldValue = currentElement.data?.[props.field as keyof typeof currentElement.data];
    if (typeof fieldValue !== "string") return null;

    const assembleDatapack = compileDatapack({
        elements: store.elements,
        version: version,
        identifiers: store.identifiers,
        files: store.files,
        tool: configuration.analyser.id
    });

    const tagIdentifier = Identifier.fromString(fieldValue, props.registry);
    const tagData = assembleDatapack.find((element) => getIdentifierFromCompiler(element).equals(tagIdentifier));
    const rawData = tagData?.type !== "deleted" ? tagData?.element : undefined;

    const initialValues = rawData && isTag(rawData) ? rawData.data.values.map((v) => (typeof v === "string" ? v : v.id)) : [];

    return (
        <div className="border-zinc-800 border bg-header-cloudy rounded-2xl shadow-black p-4 w-96">
            <div className="space-y-2">
                {initialValues.map((value) => (
                    <ToolTagCard key={value} value={value} />
                ))}

                {props.include && tagIdentifier.getNamespace() === "minecraft" && (
                    <TagLoader
                        registry={props.include.registry}
                        path={props.include.path}
                        fileName={tagIdentifier.getFileName()}
                        namespace={props.include.namespace}
                    />
                )}
            </div>
        </div>
    );
}

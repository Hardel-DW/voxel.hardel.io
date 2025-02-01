import { TagLoader } from "@/components/tools/elements/schema/tags/TagLoader";
import { ToolTagCard } from "@/components/tools/elements/schema/tags/ToolTagCard";
import { Identifier } from "@/lib/minecraft/core/Identifier";
import { isTag } from "@/lib/minecraft/core/Tag";
import { getIdentifierFromCompiler } from "@/lib/minecraft/core/engine/Compiler";
import type { ToolTagViewerType } from "@/lib/minecraft/core/schema/primitive/component";
import { useConfiguratorStore } from "@/lib/minecraft/core/engine/Store";
import { useElementValue } from "@/lib/minecraft/core/engine/utils/hooks";

export default function ToolTagViewer({
    component
}: {
    component: ToolTagViewerType;
}) {
    const fieldValue = component.properties ? useElementValue<string>(component.properties) : null;
    const configuration = useConfiguratorStore((state) => state.configuration);
    const version = useConfiguratorStore((state) => state.version);
    const compile = useConfiguratorStore((state) => state.compile);

    if (!configuration || !version || !fieldValue) return null;

    const assembleDatapack = compile();
    const tagIdentifier = Identifier.of(fieldValue, component.registry);
    const tagData = assembleDatapack.find((element) => new Identifier(getIdentifierFromCompiler(element)).equals(tagIdentifier));
    const rawData = tagData?.type !== "deleted" ? tagData?.element : undefined;

    const initialValues = rawData && isTag(rawData) ? rawData.data.values.map((v) => (typeof v === "string" ? v : v.id)) : [];

    return (
        <div className="border-zinc-800 border bg-header-cloudy rounded-2xl shadow-black p-4 w-96">
            <div className="space-y-2">
                {initialValues.map((value) => (
                    <ToolTagCard key={value} value={value} registry={component.registry} />
                ))}

                {component.include && tagIdentifier.namespace === "minecraft" && (
                    <TagLoader
                        registry={component.include.registry}
                        path={component.include.path}
                        fileName={new Identifier(tagIdentifier).toFileName()}
                        namespace={component.include.namespace}
                    />
                )}
            </div>
        </div>
    );
}

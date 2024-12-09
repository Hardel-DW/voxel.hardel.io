import { useConfigurator } from "@/components/tools/ConfiguratorContext";
import { Identifier } from "@/lib/minecraft/core/Identifier";
import type { Analysers, GetAnalyserVoxel } from "@/lib/minecraft/core/engine/Analyser";
import { compileDatapack } from "@/lib/minecraft/core/engine/Compiler";
import type { RegistryElement } from "@/lib/minecraft/mczip";
import type { TagType } from "@voxel/definitions";

export type ToolTagViewerType = {
    type: "TagViewer";
    field?: string;
    registry: string;
    additional?: Record<string, string[]>;
};

export default function TagViewer<T extends keyof Analysers>(props: {
    field?: string;
    registry: string;
    additional?: Record<string, string[]>;
}) {
    const context = useConfigurator<GetAnalyserVoxel<T>>();
    const values: string[] = [];

    // Get the field value from the given field
    const fieldValue = context.currentElement?.data?.[props.field as keyof typeof context.currentElement.data];
    if (!fieldValue) return null;

    // Compile the datapack and get the tag by its identifier
    const assembleDatapack = compileDatapack(context);
    if (typeof fieldValue !== "string") return null;

    const tagIdentifier = Identifier.fromString(fieldValue, props.registry);
    const tagData = assembleDatapack.find((element) => element.identifier.equals(tagIdentifier)) as RegistryElement<TagType> | undefined;
    if (tagData) values.push(...tagData.data.values.map((value) => (typeof value === "string" ? value : value.id)));

    // Find the related additional tag, and add its values to the tag data
    const additionalValues = props.additional?.[tagIdentifier.toString()];
    if (additionalValues) values.push(...additionalValues);

    return (
        <div className="border-zinc-800 border bg-header-cloudy rounded-2xl shadow-black p-4 w-96">
            <div className="space-y-2">
                {Array.from(new Set(values)).map((value) => {
                    const identifier = Identifier.fromString(value);

                    return (
                        <div key={value} className="bg-blue-50/5 ring-0 ring-zinc-700 transition-all hover:ring-1 px-6 py-4 rounded-xl">
                            <div className="flex items-center justify-between w-full">
                                <div className="flex flex-col">
                                    <span className="text-white">{identifier.renderResourceName()}</span>
                                </div>
                                <span className="text-xs text-zinc-400 px-2 py-1 rounded-full bg-zinc-800">
                                    {identifier.renderNamespace()}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

import Datapack from "@/lib/minecraft/core/Datapack";
import type { DataDrivenElement, VoxelElement } from "@/lib/minecraft/core/Element";
import type { DataDrivenRegistryElement } from "@/lib/minecraft/core/Element";
import type { IdentifierObject } from "@/lib/minecraft/core/Identifier";
import { type Analysers, type GetAnalyserVoxel, getAnalyserForVersion } from "@/lib/minecraft/core/engine/Analyser";

export type Compiler<T extends VoxelElement = VoxelElement, K extends DataDrivenElement = DataDrivenElement> = (
    element: T,
    config: keyof Analysers,
    original?: K
) => {
    element: DataDrivenRegistryElement<K>;
    tags: IdentifierObject[];
};

export type CompileDatapackResult = NewOrUpdated | Deleted;

interface NewOrUpdated {
    type: "new" | "updated";
    element: DataDrivenRegistryElement<DataDrivenElement>;
}

interface Deleted {
    type: "deleted";
    identifier: IdentifierObject;
}

export function getIdentifierFromCompiler(comp: CompileDatapackResult): IdentifierObject {
    return comp.type === "deleted" ? comp.identifier : comp.element.identifier;
}

export function compileDatapack({
    elements,
    version,
    files,
    tool
}: {
    elements: GetAnalyserVoxel<keyof Analysers>[];
    version: number;
    files: Record<string, Uint8Array>;
    tool: keyof Analysers;
}): Array<CompileDatapackResult> {
    const datapack = new Datapack(files);
    const analyser = getAnalyserForVersion(tool, version).analyser;
    const compiledElements = elements.map((element) => analyser.compiler(element, tool, datapack.readFile(element.identifier)));
    const compiledTags = datapack.getCompiledTags(compiledElements);

    return datapack.labelElements(tool, [...compiledElements.map((element) => element.element), ...compiledTags]);
}

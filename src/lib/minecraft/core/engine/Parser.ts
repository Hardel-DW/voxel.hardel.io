import type { ConfiguratorContextType } from "@/lib/minecraft/components/ConfiguratorContext.tsx";
import { Identifier } from "@/lib/minecraft/core/Identifier.ts";
import { isPresentInTag } from "@/lib/minecraft/core/Tag.ts";
import {
    type Analysers,
    type DataDrivenElement,
    type GetAnalyserMinecraft,
    type GetAnalyserVoxel,
    type VoxelElement,
    getAnalyserForVersion
} from "@/lib/minecraft/core/engine/Analyser.ts";
import { calculateInitialToggleSection } from "@/lib/minecraft/core/engine/managers/InitialToggle.ts";
import { type RegistryElement, getRegistry, parseZip } from "@/lib/minecraft/mczip.ts";
import type { TagType } from "@/lib/minecraft/schema/tag/TagType.ts";

interface PackMcmeta {
    pack: {
        pack_format: number;
        description: string;
    };
}

export type Parser<T extends VoxelElement, K extends DataDrivenElement, UseTags extends boolean = false> = UseTags extends true
    ? (element: RegistryElement<K>, tags: string[]) => RegistryElement<T>
    : (element: RegistryElement<K>) => RegistryElement<T>;

export function parseDatapackElement<T>(files: Record<string, Uint8Array>, config: string): RegistryElement<T>[] {
    return getRegistry<T>(files, config);
}

/**
 * Parses a datapack and returns the elements.
 * @param context
 * @param file
 */
export async function parseDatapack<T extends keyof Analysers>(
    context: ConfiguratorContextType<GetAnalyserVoxel<T>>,
    file: FileList
): Promise<string | null> {
    const isJar = file[0].name.endsWith(".jar");
    const files = await parseZip(file[0]);

    const packMcmetaFile = files["pack.mcmeta"];
    if (!packMcmetaFile) return "tools.enchantments.warning.invalid_datapack";
    const packMcmeta: PackMcmeta = JSON.parse(new TextDecoder().decode(packMcmetaFile));
    const packFormat = packMcmeta.pack.pack_format;

    const analyserResult = getAnalyserForVersion(context.tool, packFormat);
    if (!analyserResult) return "tools.enchantments.warning.no_analyser";

    const { analyser, config } = analyserResult;
    if (!config) return "tools.enchantments.warning.no_config";
    const initialToggle = calculateInitialToggleSection(config);

    const mainRegistry = parseDatapackElement<GetAnalyserMinecraft<T>>(files, config.parser.registries.main);
    const tagsRegistry = config.parser.registries.tags ? parseDatapackElement<TagType>(files, config.parser.registries.tags) : [];

    const compiled = mainRegistry.map((element) => {
        const tags = tagsRegistry
            .filter((tag) => isPresentInTag(tag, element.identifier.toString()))
            .map((tag) => tag.identifier.toString());

        return analyser.parser(element, tags);
    });

    if (compiled.length === 0) return "tools.enchantments.warning.no_elements";
    context.setName(file[0].name);
    context.setFiles(files);
    context.setElements(compiled);
    context.setVersion(packFormat);
    context.setToggleSection(initialToggle);
    context.setCurrentElementId(Identifier.sortRegistry(compiled)[0].identifier);
    context.setIsJar(isJar);
    context.setConfiguration(config);
    return null;
}

import type { Compiler } from "@/lib/minecraft/core/engine/Compiler.ts";
import type { Parser } from "@/lib/minecraft/core/engine/Parser.ts";
import type { Unresolved } from "@/lib/minecraft/core/engine/resolver/field/type.ts";
import {
    DataDrivenToVoxelFormat,
    enchantmentProperties,
    type EnchantmentProps,
    VoxelToDataDriven
} from "@/lib/minecraft/core/schema/enchant/EnchantmentProps.ts";
import { ENCHANT_TOOL_CONFIG } from "@/lib/minecraft/core/schema/enchant";
import type { ToolConfiguration } from "@/lib/minecraft/core/schema/primitive";
import type { Enchantment } from "@voxel/definitions";
import type { ConfiguratorConfigFromDatapack } from "@/lib/minecraft/core/Configurator.ts";
import type { FieldProperties } from "@/lib/minecraft/core/schema/primitive/properties";

export type DataDrivenElement = Record<string, unknown>;
export interface VoxelElement extends Record<string, unknown> {
    override?: ConfiguratorConfigFromDatapack;
}

export type GetAnalyserVoxel<T extends keyof Analysers> = Analysers[T]["voxel"];
export type GetAnalyserMinecraft<T extends keyof Analysers> = Analysers[T]["minecraft"];

export type Analysers = {
    enchantment: {
        voxel: EnchantmentProps;
        minecraft: Enchantment;
    };
};

export interface Analyser<T extends VoxelElement, K extends DataDrivenElement, UseTags extends boolean = false> {
    compiler: Compiler<T, K>;
    parser: Parser<T, K>;
    properties: (lang: string) => FieldProperties;
    useTags: UseTags;
}

export type VersionedAnalyser<T extends VoxelElement, K extends DataDrivenElement, UseTags extends boolean = false> = {
    analyser: Analyser<T, K, UseTags>;
    range: VersionRange;
    config: Unresolved<ToolConfiguration>;
};

export type VersionedAnalysers = {
    [Q in keyof Analysers]: Array<VersionedAnalyser<Analysers[Q]["voxel"], Analysers[Q]["minecraft"], boolean>>;
};

export type VersionRange = {
    min: number;
    max: number;
};

export const versionedAnalyserCollection: VersionedAnalysers = {
    enchantment: [
        {
            analyser: {
                compiler: VoxelToDataDriven,
                parser: DataDrivenToVoxelFormat,
                properties: enchantmentProperties,
                useTags: true
            },
            range: { min: 48, max: Number.POSITIVE_INFINITY },
            config: ENCHANT_TOOL_CONFIG
        }
    ]
};

export function getAnalyserForVersion<T extends keyof Analysers>(
    type: T,
    version: number
):
    | {
          analyser: Analyser<Analysers[T]["voxel"], Analysers[T]["minecraft"], boolean>;
          config: Unresolved<ToolConfiguration>;
      }
    | undefined {
    const versionedAnalysers = versionedAnalyserCollection[type];
    if (!versionedAnalysers) return undefined;

    for (const entry of versionedAnalysers) {
        if (version >= entry.range.min && version <= entry.range.max) {
            return { analyser: entry.analyser, config: entry.config };
        }
    }

    return undefined;
}

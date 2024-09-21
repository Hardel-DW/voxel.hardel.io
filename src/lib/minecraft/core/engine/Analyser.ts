import type { Compiler } from "@/lib/minecraft/core/engine/Compiler.ts";
import type { Parser } from "@/lib/minecraft/core/engine/Parser.ts";
import type { ToolConfiguration } from "@/lib/minecraft/core/engine/index.ts";
import { DataDrivenToVoxelFormat, type EnchantmentProps, VoxelToDataDriven } from "@/lib/minecraft/core/schema/enchant/EnchantmentProps.ts";
import { ENCHANT_TOOL_CONFIG } from "@/lib/minecraft/core/schema/enchant/config";
import type { Enchantment } from "@/lib/minecraft/schema/enchantment/Enchantment.ts";

export type DataDrivenElement = {};
export type VoxelElement = {};
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
    parser: Parser<T, K, UseTags>;
    useTags: UseTags;
}

export type VersionedAnalyser<T extends VoxelElement, K extends DataDrivenElement, UseTags extends boolean = false> = {
    analyser: Analyser<T, K, UseTags>;
    range: VersionRange;
    config: ToolConfiguration;
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
): { analyser: Analyser<Analysers[T]["voxel"], Analysers[T]["minecraft"], boolean>; config: ToolConfiguration } | undefined {
    const versionedAnalysers = versionedAnalyserCollection[type];
    if (!versionedAnalysers) return undefined;

    for (const entry of versionedAnalysers) {
        if (version >= entry.range.min && version <= entry.range.max) {
            return { analyser: entry.analyser, config: entry.config };
        }
    }

    return undefined;
}

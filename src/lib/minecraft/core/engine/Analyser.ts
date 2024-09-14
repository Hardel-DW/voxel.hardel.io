import type { Compiler } from "@/lib/minecraft/core/engine/Compiler.ts";
import type { Parser } from "@/lib/minecraft/core/engine/Parser.ts";
import { DataDrivenToVoxelFormat, type EnchantmentProps, VoxelToDataDriven } from "@/lib/minecraft/core/engine/schema/EnchantmentProps.ts";
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

export const analyserCollection: {
    [Q in keyof Analysers]: Analyser<Analysers[Q]["voxel"], Analysers[Q]["minecraft"], boolean>;
} = {
    enchantment: {
        compiler: VoxelToDataDriven,
        parser: DataDrivenToVoxelFormat,
        useTags: true
    }
};

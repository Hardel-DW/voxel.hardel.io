import type { ConfiguratorConfigFromDatapack } from "@/lib/minecraft/core/Configurator.ts";
import type { Compiler } from "@/lib/minecraft/core/engine/Compiler.ts";
import type { Parser } from "@/lib/minecraft/core/engine/Parser.ts";
import { ENCHANT_TOOL_CONFIG } from "@/lib/minecraft/core/schema/enchant";
import {
    DataDrivenToVoxelFormat,
    type EnchantmentProps,
    VoxelToDataDriven,
    enchantmentProperties
} from "@/lib/minecraft/core/schema/enchant/EnchantmentProps.ts";
import type { ToolConfiguration } from "@/lib/minecraft/core/schema/primitive";
import type { FieldProperties } from "@/lib/minecraft/core/schema/primitive/properties";
import type { Enchantment } from "@voxel/definitions";
import type { IdentifierObject } from "@/lib/minecraft/core/Identifier.ts";
import type { VoxelRegistryElement } from "../Registry";

export type DataDrivenElement = Record<string, unknown>;
export interface VoxelElement extends Record<string, unknown> {
    override?: ConfiguratorConfigFromDatapack;
    identifier: IdentifierObject;
}

export function isRegistryVoxelElement<T extends keyof Analysers>(element: any): element is VoxelRegistryElement<GetAnalyserVoxel<T>> {
    return "identifier" in element && "data" in element && typeof element.identifier === "string";
}

export function isVoxelElement<T extends keyof Analysers>(element: any): element is GetAnalyserVoxel<T> {
    return "identifier" in element;
}

export type GetAnalyserVoxel<T extends keyof Analysers> = Analysers[T]["voxel"];
export type GetAnalyserMinecraft<T extends keyof Analysers> = Analysers[T]["minecraft"];

export type Analysers = {
    enchantment: {
        voxel: EnchantmentProps;
        minecraft: Enchantment;
    };
};

export interface Analyser<T extends VoxelElement, K extends DataDrivenElement> {
    compiler: Compiler<T, K>;
    parser: Parser<T, K>;
    properties: (lang: string) => FieldProperties;
}

export type VersionedAnalyser<T extends VoxelElement, K extends DataDrivenElement> = {
    analyser: Analyser<T, K>;
    range: VersionRange;
    config: ToolConfiguration;
};

export type VersionedAnalysers = {
    [Q in keyof Analysers]: Array<VersionedAnalyser<Analysers[Q]["voxel"], Analysers[Q]["minecraft"]>>;
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
                properties: enchantmentProperties
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
          analyser: Analyser<Analysers[T]["voxel"], Analysers[T]["minecraft"]>;
          config: ToolConfiguration;
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

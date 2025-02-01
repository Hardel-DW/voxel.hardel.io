import { voxelDatapacks } from "@/lib/minecraft/voxel/VoxelDatapack.ts";
import JSZip from "jszip";
import type { Analysers } from "./core/engine/Analyser";
import type { CompileDatapackResult } from "./core/engine/Compiler";
import type { Logger } from "./core/engine/migrations/logger";
import { Identifier, type IdentifierObject } from "./core/Identifier";
import type { ConfiguratorConfigFromDatapack } from "./core/Element";

/**
 * Get the Voxel configuration file, if it exists, il est localisés au même endroit que l'identifier mais pas dans le dossier data mais dans le dosssier voxel.
 * @param identifier - The identifier to get the configuration file for
 * @returns The configuration file, if it exists
 */
export function getVoxelConfig(
    files: Record<string, Uint8Array>,
    identifier: IdentifierObject
): ConfiguratorConfigFromDatapack | undefined {
    const file = `${new Identifier(identifier).toFilePath("voxel")}.json`;
    if (!(file in files)) return undefined;
    return JSON.parse(new TextDecoder().decode(files[file]));
}

export async function parseZip(zipData: Uint8Array): Promise<Record<string, Uint8Array>> {
    const JSZip = (await import("jszip")).default;
    const zip = await new JSZip().loadAsync(zipData);
    const files: Record<string, Uint8Array> = {};

    await Promise.all(
        Object.keys(zip.files).map(async (path) => {
            if (!zip.files[path].dir) {
                files[path] = new Uint8Array(await zip.files[path].async("arraybuffer"));
            }
        })
    );

    return files;
}

export function readDatapackFile<T>(datapack: Record<string, Uint8Array>, identifier: IdentifierObject): T | undefined {
    const file = `${new Identifier(identifier).toFilePath()}.json`;
    if (!(file in datapack)) return undefined;
    return JSON.parse(new TextDecoder().decode(datapack[file]));
}

export async function generateZip(
    files: Record<string, Uint8Array>,
    content: CompileDatapackResult<keyof Analysers>[],
    params: {
        minify: boolean;
        logger?: Logger;
        includeVoxel: boolean;
    }
): Promise<Uint8Array> {
    const { minify, logger, includeVoxel } = params;
    const zip = new JSZip();
    const filesToDelete = new Set<string>();

    for (const file of content) {
        if (file.type === "deleted") {
            filesToDelete.add(`${new Identifier(file.identifier).toFilePath()}.json`);
        }
    }

    for (const [path, data] of Object.entries(files)) {
        if (!filesToDelete.has(path)) {
            zip.file(path, data);
        }
    }

    if (includeVoxel) {
        for (const file of voxelDatapacks) {
            zip.file(`${new Identifier(file.identifier).toFilePath()}.json`, JSON.stringify(file.data, null, minify ? 0 : 4));
        }
    }

    for (const file of content) {
        if (file.type === "deleted") continue;
        zip.file(`${new Identifier(file.element.identifier).toFilePath()}.json`, JSON.stringify(file.element.data, null, minify ? 0 : 4));
    }

    if (logger) {
        const logs = logger.getLogs();
        const updatedLogs = {
            ...logs,
            isMinified: minify
        };

        const logsJson = JSON.stringify(updatedLogs, null, minify ? 0 : 4);
        zip.file("voxel/logs.json", logsJson);
    }

    return zip.generateAsync({ type: "uint8array" });
}

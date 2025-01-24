import { Identifier } from "@/lib/minecraft/core/Identifier.ts";
import { voxelDatapacks } from "@/lib/minecraft/voxel/VoxelDatapack.ts";
import JSZip from "jszip";
import type { Logger } from "./core/engine/migrations/logger";
import type { ConfiguratorConfigFromDatapack } from "./core/Configurator";
import type { CompileDatapackResult } from "./core/engine/Compiler";
import type { Analysers } from "./core/engine/Analyser";

export type RegistryElement<RegistryType> = {
    data: RegistryType;
    identifier: Identifier;
};

/**
 * Searches for registries in the given files and returns them. For example, if the given registry is "advancements", this function will return all advancements in the given files.
 * @param files - The files to search for the registry in
 * @param registry - The registry to search for in the files, E.g. "advancements"
 */
export function getRegistry<T>(files: Record<string, Uint8Array>, registry: string): RegistryElement<T>[] {
    const registries: RegistryElement<T>[] = [];

    for (const file of Object.keys(files)) {
        const fileParts = file.split("/");
        if (!file.endsWith(".json")) continue;
        if (fileParts.length < 3) continue;
        if (fileParts[0] !== "data") continue;

        const namespace = fileParts[1];
        const compressedPath = file.split("/").slice(2).join("/").replace(".json", "");

        if (!compressedPath.startsWith(`${registry}/`) && compressedPath !== registry) continue;

        const resource = compressedPath.slice(registry.length + 1);
        if (!resource) continue;

        const content = new TextDecoder().decode(files[file]);

        try {
            const data = JSON.parse(content);
            registries.push({
                identifier: new Identifier(namespace, registry, resource),
                data
            });
        } catch (error) {
            console.error(`Failed to parse JSON for file: ${file}`, error);
        }
    }

    return registries;
}

/**
 * Get the Voxel configuration file, if it exists, il est localisés au même endroit que l'identifier mais pas dans le dossier data mais dans le dosssier voxel.
 * @param identifier - The identifier to get the configuration file for
 * @returns The configuration file, if it exists
 */
export function getVoxelConfig(files: Record<string, Uint8Array>, identifier: Identifier): ConfiguratorConfigFromDatapack | undefined {
    const file = `${identifier.voxelFilePath()}.json`;
    if (!(file in files)) return undefined;
    return JSON.parse(new TextDecoder().decode(files[file]));
}

export async function parseZip(file: File): Promise<Record<string, Uint8Array>> {
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
        reader.onload = async () => {
            const buffer = reader.result as ArrayBuffer;
            const array = new Uint8Array(buffer);
            const zip = new JSZip();
            const files: Record<string, Uint8Array> = {};

            try {
                const loadedZip = await zip.loadAsync(array);
                const filePromises = Object.keys(loadedZip.files).map(async (path) => {
                    const file = loadedZip.files[path];
                    if (!file.dir) {
                        files[path] = await file.async("uint8array");
                    }
                });

                await Promise.all(filePromises);
                resolve(files);
            } catch (error) {
                reject(error);
            }
        };

        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
    });
}

export function readDatapackFile<T>(datapack: Record<string, Uint8Array>, identifier: Identifier): T | undefined {
    const file = `${identifier.filePath()}.json`;
    if (!(file in datapack)) return undefined;
    return JSON.parse(new TextDecoder().decode(datapack[file]));
}

export async function generateZip(
    files: Record<string, Uint8Array>,
    content: CompileDatapackResult<keyof Analysers>[],
    minify: boolean,
    logger?: Logger
): Promise<Uint8Array> {
    const zip = new JSZip();
    const filesToDelete = new Set<string>();

    for (const file of content) {
        if (file.type === "deleted") {
            filesToDelete.add(`${file.identifier.filePath()}.json`);
        }
    }

    for (const [path, data] of Object.entries(files)) {
        if (!filesToDelete.has(path)) {
            zip.file(path, data);
        }
    }

    for (const file of voxelDatapacks) {
        zip.file(`${file.identifier.filePath()}.json`, JSON.stringify(file.data, null, minify ? 0 : 4));
    }

    for (const file of content) {
        if (file.type === "deleted") continue;
        zip.file(`${file.element.identifier.filePath()}.json`, JSON.stringify(file.element.data, null, minify ? 0 : 4));
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

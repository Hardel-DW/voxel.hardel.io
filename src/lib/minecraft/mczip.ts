import { Identifier } from "@/lib/minecraft/core/Identifier.ts";
import type { VoxelElement } from "@/lib/minecraft/core/engine/Analyser.ts";
import { voxelDatapacks } from "@/lib/minecraft/voxel/VoxelDatapack.ts";
import JSZip from "jszip";

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
        const compressedPath = file
            .split("/")
            .slice(2)
            .map((part, index, arr) => (index === arr.length - 1 ? part.split(".")[0] : part))
            .join("/");
        const resource = compressedPath.startsWith(registry) ? compressedPath.slice(registry.length + 1) : null;
        if (!resource) continue;

        const startWithRegistry = compressedPath.startsWith(registry);
        if (!startWithRegistry) continue;

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

export async function generateZip(files: Record<string, Uint8Array>, content: RegistryElement<VoxelElement>[]): Promise<Uint8Array> {
    const zip = new JSZip();

    for (const file of Object.keys(files)) {
        zip.file(file, files[file]);
    }

    for (const file of voxelDatapacks) {
        zip.file(`${file.identifier.filePath()}.json`, JSON.stringify(file.data));
    }

    for (const file of content) {
        zip.file(`${file.identifier.filePath()}.json`, JSON.stringify(file.data));
    }

    return zip.generateAsync({ type: "uint8array" });
}

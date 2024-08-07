import type { RegistryElement } from "@/lib/minecraft/mcschema.ts";
import type { Enchantment } from "@/lib/minecraft/schema/enchantment/Enchantment.ts";
import JSZip from "jszip";

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

export async function compileDataPack(
    files: Record<string, Uint8Array>,
    content: RegistryElement<Enchantment | TagType>[]
): Promise<Uint8Array> {
    const zip = new JSZip();

    for (const file of Object.keys(files)) {
        zip.file(file, files[file]);
    }

    for (const file of content) {
        zip.file(`${file.identifier.filePath()}.json`, JSON.stringify(file.data));
    }

    return zip.generateAsync({ type: "uint8array" });
}

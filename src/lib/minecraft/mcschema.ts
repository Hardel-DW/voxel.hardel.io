import { Identifier } from "@/lib/minecraft/core/Identifier.ts";

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

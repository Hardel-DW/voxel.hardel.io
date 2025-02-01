import type { DataDrivenElement, VoxelElement } from "@/lib/minecraft/core/Element";
import type { IdentifierObject } from "@/lib/minecraft/core/Identifier";

export type VoxelRegistryElement<T extends VoxelElement> = {
    identifier: string;
    data: T;
};

export type DataDrivenRegistryElement<T extends DataDrivenElement> = {
    identifier: IdentifierObject;
    data: T;
};

/**
 * Searches for registries in the given files and returns them. For example, if the given registry is "advancements", this function will return all advancements in the given files.
 * @param files - The files to search for the registry in
 * @param registry - The registry to search for in the files, E.g. "advancements"
 */
export function getRegistry<T extends DataDrivenElement>(
    files: Record<string, Uint8Array>,
    registry: string
): DataDrivenRegistryElement<T>[] {
    const registries: DataDrivenRegistryElement<T>[] = [];

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
                identifier: { namespace, registry, resource },
                data
            });
        } catch (error) {
            console.error(`Failed to parse JSON for file: ${file}`, error);
        }
    }

    return registries;
}

/**
 * Sorts registry elements by resource name
 * @param elements - Array of registry elements to sort
 * @returns Sorted array
 * @example
 * const sorted = sortRegistry([element1, element2]);
 */
export function sortRegistry<T extends VoxelElement>(elements: VoxelRegistryElement<T>[]) {
    return elements.sort((a, b) =>
        (a.data.identifier.resource.split("/").pop() ?? "").localeCompare(b.data.identifier.resource.split("/").pop() ?? "")
    );
}

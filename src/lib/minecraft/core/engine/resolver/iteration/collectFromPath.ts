import type { VoxelElement } from "@/lib/minecraft/core/engine/Analyser";
import type { RegistryElement } from "@/lib/minecraft/mczip";
import { getRegistry } from "@/lib/minecraft/mczip";

export function collectFromPath<T extends VoxelElement>(
    registry: string,
    files: Record<string, Uint8Array>,
    path: string,
    exclude_namespace?: string[]
): RegistryElement<T>[] {
    const content = getRegistry<T>(files, registry);
    return content.filter((element) => {
        const matchesPath = element.identifier.getResource().startsWith(path);
        if (!matchesPath) return false;

        if (exclude_namespace && exclude_namespace.length > 0) {
            return !exclude_namespace.includes(element.identifier.getNamespace());
        }

        return true;
    });
}

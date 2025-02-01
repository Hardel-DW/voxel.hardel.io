import type { DataDrivenElement } from "@/lib/minecraft/core/Element";
import { getRegistry, type DataDrivenRegistryElement } from "@/lib/minecraft/core/Registry";

export function collectFromPath<T extends DataDrivenElement>(
    registry: string,
    files: Record<string, Uint8Array>,
    path: string,
    exclude_namespace?: string[]
): DataDrivenRegistryElement<T>[] {
    const content = getRegistry<T>(files, registry);
    return content.filter((element) => {
        const matchesPath = element.identifier.resource.startsWith(path);
        if (!matchesPath) return false;

        if (exclude_namespace && exclude_namespace.length > 0) {
            return !exclude_namespace.includes(element.identifier.namespace);
        }

        return true;
    });
}

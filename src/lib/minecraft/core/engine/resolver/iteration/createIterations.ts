import { collectFromPath } from "./collectFromPath";
import { getRegistry } from "@/lib/minecraft/mczip";
import type { IterationResult, IterationValue } from "./type";

export function createIterations(valueSet: IterationValue, files: Record<string, Uint8Array>): IterationResult[] {
    if (valueSet.type === "collect_from_path" || valueSet.type === "get_registry_elements") {
        const elements =
            valueSet.type === "collect_from_path"
                ? collectFromPath(valueSet.registry, files, valueSet.path, valueSet.exclude_namespace)
                : getRegistry(files, valueSet.registry);

        return elements.map((file) => ({
            key: file.identifier.toString(),
            context: {
                filename: file.identifier.renderFilename(),
                resource: file.identifier.renderResource(),
                namespace: file.identifier.getNamespace(),
                identifier: file.identifier.toString()
            }
        }));
    }

    if (valueSet.type === "static") {
        return valueSet.values.map((value) => ({
            key: value,
            context: {
                current_iteration: value
            }
        }));
    }

    if (valueSet.type === "object") {
        return valueSet.values.map((objectData, index) => ({
            key: `object_${index}`,
            context: {
                object_data: objectData
            }
        }));
    }

    return [];
}

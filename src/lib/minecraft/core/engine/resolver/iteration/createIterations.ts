import { collectFromPath } from "./collectFromPath";
import type { IterationResult, IterationValue } from "@/lib/minecraft/core/engine/resolver/iteration/type";
import { identifierToResourceName, identifierToResourcePath, identifierToString } from "@/lib/minecraft/core/Identifier";
import { getRegistry } from "@/lib/minecraft/core/Registry";

export function createIterations(valueSet: IterationValue, files: Record<string, Uint8Array>): IterationResult[] {
    if (valueSet.type === "collect_from_path" || valueSet.type === "get_registry_elements") {
        const elements =
            valueSet.type === "collect_from_path"
                ? collectFromPath(valueSet.registry, files, valueSet.path, valueSet.exclude_namespace)
                : getRegistry(files, valueSet.registry);

        return elements.map((file) => ({
            key: identifierToString(file.identifier),
            context: {
                filename: identifierToResourceName(file.identifier.resource),
                resource: identifierToResourcePath(file.identifier.resource),
                namespace: file.identifier.namespace,
                identifier: identifierToString(file.identifier)
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

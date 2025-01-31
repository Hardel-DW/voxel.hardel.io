import type { VoxelElement } from "./engine/Analyser";
import type { VoxelRegistryElement } from "./Registry";

/**
 * Represents a Minecraft identifier object structure
 */
export type IdentifierObject = {
    namespace: string;
    registry: string;
    resource: string;
};

/**
 * Creates an IdentifierObject from a string representation
 * @param identifier - The identifier string (e.g. "minecraft:stone" or "#minecraft:wool")
 * @param registry - The registry type (e.g. "block", "item")
 * @returns Created IdentifierObject
 * @example
 * const blockId = createIdentifierFromString("minecraft:stone", "block");
 */
export function createIdentifierFromString(identifier: string, registry: string): IdentifierObject {
    const [namespace, resource] = (identifier.startsWith("#") ? identifier.slice(1) : identifier).split(":");
    return { namespace, registry, resource };
}

/**
 * Converts an IdentifierObject to standard string representation
 * @param identifier - The identifier to convert
 * @returns String representation
 * @example
 * const str = toString({ namespace: "minecraft", registry: "tags/block", resource: "stone" });
 * // Returns "#minecraft:stone"
 */
export function identifierToString(identifier: IdentifierObject): string {
    if (identifier.registry?.startsWith("tags/")) {
        return `#${identifier.namespace}:${identifier.resource}`;
    }
    return `${identifier.namespace}:${identifier.resource}`;
}

/**
 * Compares two identifiers for equality
 * @param a - First identifier
 * @param b - Second identifier
 * @returns True if identifiers are identical
 * @example
 * const isSame = equals(id1, id2);
 */
export function identifierEquals(a: IdentifierObject, b: IdentifierObject | undefined): boolean {
    if (!b) return false;
    return a.namespace === b.namespace && a.registry === b.registry && a.resource === b.resource;
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

/**
 * Sorts identifiers by namespace and resource
 * @param elements - Array of identifiers to sort
 * @returns Sorted array
 * @example
 * const sortedIds = sortIdentifiers([id1, id2, id3]);
 */
export function sortIdentifiers(elements: IdentifierObject[]) {
    return elements.sort((a, b) => {
        const namespaceComparison = a.namespace.localeCompare(b.namespace);
        if (namespaceComparison === 0) {
            return (a.resource.split("/").pop() ?? "").localeCompare(b.resource.split("/").pop() ?? "");
        }
        return namespaceComparison;
    });
}

/**
 * Sorts voxel elements by identifier
 * @param elements - Map of voxel elements
 * @returns Sorted array of main identifiers
 */
export function sortVoxelElements(elements: Map<string, VoxelElement>): string[] {
    return Array.from(elements.entries())
        .sort((a, b) => {
            const resourceA = a[1].identifier.resource.split("/").pop() ?? "";
            const resourceB = b[1].identifier.resource.split("/").pop() ?? "";
            return resourceA.localeCompare(resourceB);
        })
        .map(([key]) => key);
}

/**
 * Generates a file path for the identifier
 * @param identifier - Target identifier
 * @param basePath - Base path (default: "data")
 * @returns Full file path
 * @example
 * const path = identifierToFilePath(id); // "data/minecraft/block/stone"
 * const modPath = identifierToFilePath(id, "mod"); // "mod/minecraft/block/stone"
 */
export function identifierToFilePath(identifier: IdentifierObject, basePath = "data"): string {
    return `${basePath}/${identifier.namespace}/${identifier.registry}/${identifier.resource}`;
}

/**
 * Generates a filename for the identifier
 * @param identifier - Target identifier
 * @param extension - Add .json extension (default: false)
 * @returns Filename
 * @example
 * const name = identifierToFileName(id); // "stone"
 * const fullName = identifierToFileName(id, true); // "stone.json"
 */
export function identifierToFileName(resource: string, extension = false): string {
    const filename = resource.split("/").pop() ?? resource;
    return extension ? `${filename}.json` : filename;
}

/**
 * Renders namespace for display
 * @param identifier - Target identifier
 * @returns Formatted namespace
 * @example
 * identifierToNamespace({ namespace: "minecraft" }); // "Minecraft"
 */
export function identifierToNamespace(namespace: string): string {
    return namespace.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
}

/**
 * Renders resource name from path
 * @param identifier - Target identifier
 * @returns Formatted resource name
 * @example
 * identifierToResourceName({ resource: "items/weapons/sword" }); // "Sword"
 * @example
 * identifierToResourceName({ resource: "items/weapons/fire_sword" }); // "Fire Sword"
 */
export function identifierToResourceName(resource: string): string {
    return resource
        .split("/")
        .reduce((_, current) => current)
        .replace(/_/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase());
}

/**
 * Renders full resource path for display
 * @param identifier - Target identifier
 * @returns Formatted resource path
 * @example
 * identifierToResourcePath({ resource: "items/wooden_sword" }); // "Items - Wooden Sword"
 */
export function identifierToResourcePath(resource: string): string {
    return resource
        .replace(/\//g, " - ")
        .replace(/_/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase());
}

/**
 * Renders string identifier for display
 * @param string - The identifier string
 * @returns Formatted text
 * @example
 * stringIdentifierToDisplay("minecraft:stone"); // "Stone"
 */
export function stringIdentifierToDisplay(identifier: string): string {
    const { resource } = createIdentifierFromString(identifier, "block");
    return identifierToResourceName(resource);
}

export function isIdentifier(value: any): value is IdentifierObject {
    if (!value || typeof value !== "object") return false;

    return (
        "registry" in value &&
        "namespace" in value &&
        "resource" in value &&
        typeof value.registry === "string" &&
        typeof value.namespace === "string" &&
        typeof value.resource === "string"
    );
}

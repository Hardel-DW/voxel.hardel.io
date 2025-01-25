import type { ModMetadata } from "@/lib/minecraft/converter";

/**
 * Generates Fabric mod JSON content from common metadata
 * @param commonData - Metadata to include in configuration
 * @returns Formatted JSON for fabric.mod.json
 */
export function generateFabricMod(commonData: ModMetadata) {
    return JSON.stringify(
        {
            schemaVersion: 1,
            id: commonData.id,
            version: commonData.version,
            name: commonData.name,
            description: commonData.description,
            authors: commonData.authors,
            contact: {
                homepage: commonData.homepage,
                sources: commonData.sources,
                issues: commonData.issues
            },
            license: "LicenseRef-Datapack",
            icon: commonData.icon,
            environment: "*",
            depends: {
                "fabric-resource-loader-v0": "*"
            }
        },
        null,
        2
    );
}

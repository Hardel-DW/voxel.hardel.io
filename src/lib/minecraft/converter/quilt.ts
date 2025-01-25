import type { ModMetadata } from "@/lib/minecraft/converter";

/**
 * Generates Quilt mod JSON content from common metadata
 * @param commonData - Metadata to include in configuration
 * @returns Formatted JSON for quilt.mod.json
 */
export function generateQuiltMod(commonData: ModMetadata) {
    return JSON.stringify(
        {
            schema_version: 1,
            quilt_loader: {
                group: "com.modrinth",
                id: commonData.id,
                version: commonData.version,
                metadata: {
                    name: commonData.name,
                    description: commonData.description,
                    contributors: Object.fromEntries(commonData.authors.map((author) => [author, "Author"])),
                    contact: {
                        homepage: commonData.homepage,
                        sources: commonData.sources,
                        issues: commonData.issues
                    },
                    icon: commonData.icon
                },
                intermediate_mappings: "net.fabricmc:intermediary",
                depends: [
                    {
                        id: "quilt_resource_loader",
                        versions: "*",
                        unless: "fabric-resource-loader-v0"
                    }
                ]
            }
        },
        null,
        2
    );
}

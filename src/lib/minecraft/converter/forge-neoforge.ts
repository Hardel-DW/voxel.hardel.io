import type { ModMetadata } from "@/lib/minecraft/converter";
import { ModPlatforms, DEFAULT_MOD_METADATA } from "@/lib/minecraft/converter";

/**
 * Generates TOML content for Forge/NeoForge mods
 * @param commonData - Common mod metadata
 * @param platforms - Target platforms (affects loader generation)
 * @returns Formatted TOML content for mods.toml
 */
export function generateForgeMods(commonData: ModMetadata, platforms: ModPlatforms[]) {
    const baseConfig = [
        `modLoader = '${platforms.includes(ModPlatforms.NEOFORGE) ? "javafml" : "lowcodefml"}'`,
        `loaderVersion = '[${platforms.includes(ModPlatforms.NEOFORGE) ? "1,)" : "40,)"}]'`,
        "license = 'LicenseRef-Datapack'",
        "showAsResourcePack = false",
        "mods = [",
        "  {",
        `    modId = '${commonData.id}',`,
        `    version = '${commonData.version}',`,
        `    displayName = '${commonData.name}',`,
        `    description = "${commonData.description.replace(/"/g, '\\"')}"`
    ];

    // Add optional fields only if they exist and aren't default values
    if (commonData.icon) {
        baseConfig.push(`    logoFile = '${commonData.icon}',`);
    }
    if (commonData.homepage && commonData.homepage !== DEFAULT_MOD_METADATA.homepage) {
        baseConfig.push(`    updateJSONURL = '${commonData.homepage}/updates.json',`);
        baseConfig.push(`    displayURL = '${commonData.homepage}'`);
    }
    if (commonData.authors.length > 0) {
        baseConfig.push(`    authors = '${commonData.authors.join(", ")}'`);
    }

    baseConfig.push("  }");
    baseConfig.push("]");

    if (commonData.issues && commonData.issues !== DEFAULT_MOD_METADATA.issues) {
        baseConfig.push(`issueTrackerURL = '${commonData.issues}'`);
    }

    return baseConfig.join("\n");
}

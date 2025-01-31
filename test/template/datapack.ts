import { identifierToFilePath } from "@/lib/minecraft/core/Identifier";
import { enchantplusTags, vanillaTags } from "test/template/tags";
import { DATA_DRIVEN_TEMPLATE_ENCHANTMENT } from "test/template/daata_driven";
import { voxelDatapacks } from "@/lib/minecraft/voxel/VoxelDatapack";

const enchantmentFiles = DATA_DRIVEN_TEMPLATE_ENCHANTMENT.reduce(
    (files, enchant) => {
        const filePath = `${identifierToFilePath(enchant.identifier)}.json`;
        files[filePath] = new TextEncoder().encode(JSON.stringify(enchant.data, null, 2));
        return files;
    },
    {} as Record<string, Uint8Array>
);

// Generate tag files from all sources
const tagFiles = [...voxelDatapacks, ...enchantplusTags, ...vanillaTags].reduce(
    (files, tag) => {
        const filePath = `${identifierToFilePath(tag.identifier)}.json`;
        files[filePath] = new TextEncoder().encode(JSON.stringify(tag.data, null, 2));
        return files;
    },
    {} as Record<string, Uint8Array>
);

// Combine with existing mock files
export const mockFiles = {
    "pack.mcmeta": new TextEncoder().encode(JSON.stringify({ pack: { pack_format: 61, description: "lorem ipsum" } }, null, 2)),
    ...enchantmentFiles,
    ...tagFiles
};

import { generateZip } from "@/lib/minecraft/mczip";
import { parseZip } from "@/lib/minecraft/mczip";
import { generateFabricMod } from "@/lib/minecraft/converter/fabric";
import { generateForgeMods } from "@/lib/minecraft/converter/forge-neoforge";
import { generateQuiltMod } from "@/lib/minecraft/converter/quilt";

/**
 * Plateformes de mods Minecraft supportées par le convertisseur
 */
export enum ModPlatforms {
    FORGE = "forge",
    NEOFORGE = "neoforge",
    FABRIC = "fabric",
    QUILT = "quilt"
}

/**
 * Métadonnées communes pour la génération des mods
 * @interface
 * @property {string} id - Identifiant unique du mod
 * @property {string} version - Version du mod
 * @property {string} name - Nom d'affichage du mod
 * @property {string} description - Description du mod
 * @property {string[]} authors - Liste des auteurs
 * @property {string} [icon] - Chemin vers l'icône du mod (optionnel)
 * @property {string} [homepage] - URL de la page d'accueil (optionnel)
 * @property {string} [issues] - URL du suivi des problèmes (optionnel)
 * @property {string} [sources] - URL des sources (optionnel)
 */
export interface ModMetadata {
    id: string;
    version: string;
    name: string;
    description: string;
    authors: string[];
    icon?: string;
    homepage?: string;
    issues?: string;
    sources?: string;
}

/**
 * Métadonnées par défaut utilisées quand les informations sont manquantes
 */
export const DEFAULT_MOD_METADATA: ModMetadata = {
    id: "datapack",
    name: "Converted Datapack",
    description: "Converted Datapack",
    authors: ["Unknown"],
    version: "1.0.0",
    homepage: "https://modrinth.com/datapack",
    issues: "https://github.com/example/issues",
    sources: "https://github.com/example"
};

/**
 * Convertit un datapack ZIP en mod(s) pour les plateformes spécifiées
 * @param datapackZip - Fichier ZIP du datapack à convertir
 * @param platforms - Plateformes cibles pour la conversion
 * @returns Promise résolue avec le ZIP résultant sous forme d'Uint8Array
 */
export async function convertDatapack(datapackZip: File, platforms: ModPlatforms[]): Promise<Uint8Array> {
    const files = await parseZip(datapackZip);
    const metadata = extractMetadata(files);
    const modFiles = generateModFiles(metadata, platforms);

    const allFiles = {
        ...files,
        ...Object.fromEntries(Object.entries(modFiles).map(([path, content]) => [path, new TextEncoder().encode(content)]))
    };

    return generateZip(allFiles, [], { minify: true, includeVoxel: false });
}

function generateModFiles(metadata: ModMetadata, platforms: ModPlatforms[]) {
    const files: Record<string, string> = {};
    const modId = metadata.id.toLowerCase().replace(/\s+/g, "_");
    const commonData = { ...metadata, id: modId };

    if (platforms.includes(ModPlatforms.FABRIC)) {
        files["fabric.mod.json"] = generateFabricMod(commonData);
    }

    if (platforms.includes(ModPlatforms.QUILT)) {
        files["quilt.mod.json"] = generateQuiltMod(commonData);
    }

    if (platforms.includes(ModPlatforms.FORGE) || platforms.includes(ModPlatforms.NEOFORGE)) {
        const modsToml = generateForgeMods(commonData, platforms);
        files["META-INF/mods.toml"] = modsToml;

        if (platforms.includes(ModPlatforms.NEOFORGE)) {
            files["META-INF/neoforge.mods.toml"] = modsToml.replace(/updateJSONURL = '(.*?)'/, "updateJSONURL = '$1?neoforge=only'");
        }
    }

    return files;
}

/**
 * Extrait les métadonnées du datapack depuis pack.mcmeta et l'icône
 * @param files - Fichiers du datapack (clés = chemins, valeurs = contenu)
 * @returns Métadonnées extraites combinées avec les valeurs par défaut
 */
function extractMetadata(files: Record<string, Uint8Array>): ModMetadata {
    const packMeta = files["pack.mcmeta"];
    let metadata: Partial<ModMetadata> = {};

    if (packMeta) {
        try {
            const { pack } = JSON.parse(new TextDecoder().decode(packMeta));
            metadata = {
                description: pack.description || "",
                version: pack.pack_format?.toString() || "1.0.0"
            };
        } catch (error) {
            console.error("Error parsing pack.mcmeta", error);
        }
    }

    const iconEntry = Object.keys(files).find((path) => path.match(/^[^/]+\.png$/i));

    return {
        ...DEFAULT_MOD_METADATA,
        ...metadata,
        id: metadata.id || "datapack",
        name: metadata.name || "Converted Datapack",
        authors: metadata.authors || DEFAULT_MOD_METADATA.authors,
        icon: iconEntry?.split("/").pop()
    };
}

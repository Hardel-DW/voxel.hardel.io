import type { APIRoute } from "astro";
import JSZip from "jszip";
import { getTagsFromRegistry } from "@/lib/minecraft/core/Tag";
import type { TagType } from "@voxel/definitions";

export const GET: APIRoute = async ({ request }) => {
    try {
        const url = new URL(request.url);
        const registry = url.searchParams.get("registry");
        const path = url.searchParams.get("path");
        const fileName = url.searchParams.get("fileName");
        if (!registry || !path || !fileName) {
            return new Response("Missing registry, path or fileName parameters", { status: 400 });
        }

        // Récupérer le fichier ZIP contenant les tags
        const response = await fetch("https://uy64vwmxhf.ufs.sh/f/llTsukoqRt5Q0pEurfTfxVudAjNlKhbDQFRSw9rXzeJ6P4qC");
        const arrayBuffer = await response.arrayBuffer();
        const zip = await JSZip.loadAsync(arrayBuffer);

        // Construire le chemin du fichier dans le ZIP
        const filePath = `tags/${registry}/${path}/${fileName}.json`;

        // Récupérer et traiter le fichier
        const file = zip.file(filePath);
        if (!file) {
            return new Response("Tag not found", { status: 404 });
        }

        const content = await file.async("string");
        const data = JSON.parse(content) as TagType;

        // Retourner directement le tableau de valeurs du tag
        return new Response(JSON.stringify(getTagsFromRegistry(data)), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "public, max-age=86400"
            }
        });
    } catch (error) {
        console.error(error);
        return new Response("Internal Server Error", { status: 500 });
    }
};

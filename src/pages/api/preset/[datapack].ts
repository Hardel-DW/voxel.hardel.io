import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ params }) => {
    try {
        const version = params.datapack;
        if (!version || !/^\d+$/.test(version)) {
            return new Response(JSON.stringify({ error: "Version invalide" }), {
                status: 400,
                headers: {
                    "Content-Type": "application/json"
                }
            });
        }

        const fileName = `enchantment-${version}.zip`;
        const githubUrl = `https://raw.githubusercontent.com/Hardel-DW/voxel-datapack-preset/main/${fileName}`;

        const response = await fetch(githubUrl);
        if (!response.ok) {
            return new Response(JSON.stringify({ error: "Datapack non trouvé" }), {
                status: 404,
                headers: {
                    "Content-Type": "application/json"
                }
            });
        }

        // Récupération du contenu binaire
        const zipContent = await response.arrayBuffer();

        // Retourne le fichier ZIP
        return new Response(zipContent, {
            status: 200,
            headers: {
                "Content-Type": "application/zip",
                "Content-Disposition": `attachment; filename="${fileName}"`,
                "Cache-Control": "public, max-age=31536000"
            }
        });
    } catch (error) {
        console.error("Server error:", error);
        return new Response(JSON.stringify({ error: "Erreur serveur" }), {
            status: 500,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
};

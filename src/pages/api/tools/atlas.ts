import type { APIRoute } from "astro";

const MCMETA = "https://raw.githubusercontent.com/misode/mcmeta/summary";

export const GET: APIRoute = async () => {
    try {
        const response = await fetch(`${MCMETA}/atlas/all/atlas.png`);

        if (!response.ok) {
            return new Response(JSON.stringify({ error: "Atlas not found" }), {
                status: 404
            });
        }

        const imageBuffer = await response.arrayBuffer();

        return new Response(imageBuffer, {
            status: 200,
            headers: {
                "Content-Type": "image/png",
                "Access-Control-Allow-Origin": "*"
            }
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Internal server error" }), {
            status: 500
        });
    }
};

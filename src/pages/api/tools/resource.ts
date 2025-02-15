import type { APIRoute } from "astro";

const MCMETA = "https://raw.githubusercontent.com/misode/mcmeta/summary";

export const GET: APIRoute = async ({ url }) => {
    try {
        const resource = url.searchParams.get("resource");

        if (!resource) {
            return new Response(JSON.stringify({ error: "Resource parameter is required" }), {
                status: 400
            });
        }

        const response = await fetch(`${MCMETA}/${resource}/data.min.json`);

        if (!response.ok) {
            return new Response(JSON.stringify({ error: "Resource not found" }), {
                status: 404
            });
        }

        const data = await response.json();

        return new Response(JSON.stringify(data), {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Internal server error" }), {
            status: 500
        });
    }
};

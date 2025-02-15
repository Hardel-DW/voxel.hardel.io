import type { APIRoute } from "astro";

const MCMETA = "https://raw.githubusercontent.com/misode/mcmeta/summary";

export const GET: APIRoute = async ({ url }) => {
    try {
        const resources = url.searchParams.get("resources")?.split(",");

        if (!resources?.length) {
            return new Response(JSON.stringify({ error: "Resources parameter is required" }), {
                status: 400
            });
        }

        const responses = await Promise.all(
            resources.map(async (resource) => {
                const response = await fetch(`${MCMETA}/${resource}/data.min.json`);
                if (!response.ok) return null;
                return {
                    resource,
                    data: await response.json()
                };
            })
        );

        const data = Object.fromEntries(
            responses.filter((r): r is { resource: string; data: any } => r !== null).map(({ resource, data }) => [resource, data])
        );

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

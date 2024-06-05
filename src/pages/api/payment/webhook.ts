import type { APIRoute } from "astro";

export const POST: APIRoute = async () => {
    return Response.json({ message: "Webhook received" });
};

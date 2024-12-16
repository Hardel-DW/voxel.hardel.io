import { saveMigrationLog } from "@/database/db";
import type { APIRoute } from "astro";

export const prerender = false;
export const POST: APIRoute = async ({ request }) => {
    if (request.headers.get("Content-Type") === "application/json") {
        const body = await request.json();
        const logs = body.logs;

        await saveMigrationLog(logs);

        return new Response(
            JSON.stringify({
                message: logs
            }),
            {
                status: 200
            }
        );
    }
    return new Response(null, { status: 400 });
};

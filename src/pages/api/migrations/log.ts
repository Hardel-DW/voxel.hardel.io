import type { APIRoute } from "astro";
import { saveMigrationLog } from "@/database/db";
import type { Log } from "@/lib/minecraft/core/engine/migrations/types";

export const prerender = false;
export const POST: APIRoute = async ({ request }) => {
    try {
        const log = (await request.json()) as Log;
        console.log("Received log data:", JSON.stringify(log, null, 2));

        // Validation plus complète
        if (
            !log.id ||
            !log.date ||
            !log.datapack ||
            !log.logs ||
            !log.datapack.name ||
            !log.datapack.description ||
            !log.datapack.namespaces ||
            typeof log.isMinified !== "boolean" ||
            typeof log.isModded !== "boolean" ||
            typeof log.version !== "number"
        ) {
            console.log("Validation failed. Missing fields:", {
                id: !log.id,
                date: !log.date,
                datapack: !log.datapack,
                logs: !log.logs,
                name: log.datapack && !log.datapack.name,
                description: log.datapack && !log.datapack.description,
                namespaces: log.datapack && !log.datapack.namespaces,
                isMinified: typeof log.isMinified !== "boolean",
                isModded: typeof log.isModded !== "boolean",
                version: typeof log.version !== "number"
            });

            return new Response(
                JSON.stringify({
                    error: "Invalid log format",
                    details: "Missing required fields",
                    receivedData: log
                }),
                {
                    status: 400,
                    headers: { "Content-Type": "application/json" }
                }
            );
        }

        try {
            const logId = await saveMigrationLog(log);
            return new Response(
                JSON.stringify({
                    success: true,
                    id: logId
                }),
                {
                    status: 201,
                    headers: { "Content-Type": "application/json" }
                }
            );
        } catch (dbError) {
            console.error("Database error:", dbError);
            throw dbError;
        }
    } catch (error) {
        console.error("Error processing request:", error);
        return new Response(
            JSON.stringify({
                error: "Internal server error",
                details: error instanceof Error ? error.message : "Unknown error",
                stack: error instanceof Error ? error.stack : undefined
            }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" }
            }
        );
    }
};

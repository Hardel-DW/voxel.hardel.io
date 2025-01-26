import type { APIRoute } from "astro";
import { db } from "@/database/db";
import { telemetry } from "@/database/schema";
import { eq, sql } from "drizzle-orm";
import generateUUID from "@/lib/utils/uuid";

export const POST: APIRoute = async ({ request }) => {
    try {
        const { event } = await request.json();

        if (!event || typeof event !== "string") {
            return new Response("Invalid event", { status: 400 });
        }

        const [existingEvent] = await db.select().from(telemetry).where(eq(telemetry.event, event));

        if (existingEvent) {
            await db
                .update(telemetry)
                .set({
                    count: sql`${telemetry.count} + 1`
                })
                .where(eq(telemetry.event, event));
        } else {
            await db.insert(telemetry).values({
                id: generateUUID(),
                event,
                count: 1
            });
        }

        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        });
    } catch (error) {
        console.error("Error in telemetry endpoint:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), {
            status: 500,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
};

export const GET: APIRoute = async () => {
    try {
        const data = await db.select().from(telemetry).limit(100);

        return new Response(JSON.stringify({ data }), {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        });
    } catch (error) {
        return new Response(
            JSON.stringify({
                error: "Failed to fetch telemetry data"
            }),
            {
                status: 500,
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
    }
};

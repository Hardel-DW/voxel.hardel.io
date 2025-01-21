import { db } from "@/database/db";
import { migrationNamespace } from "@/database/schema";
import { sql } from "drizzle-orm";
import type { APIRoute } from "astro";

export type ResponseNamespaceStats = {
    namespace: string;
    occurence: number;
    proportion: number;
};

export const GET: APIRoute = async () => {
    try {
        const stats = await db.execute<ResponseNamespaceStats>(sql`
            WITH total_datapacks AS (
                SELECT COUNT(DISTINCT migration_id) as total
                FROM ${migrationNamespace}
            )
            SELECT 
                namespace,
                CAST(COUNT(*) AS INTEGER) as occurence,
                ROUND(CAST(COUNT(*) AS DECIMAL) / CAST((SELECT total FROM total_datapacks) AS DECIMAL) * 100, 2) as proportion
            FROM ${migrationNamespace}
            GROUP BY namespace
            ORDER BY occurence DESC
        `);

        return new Response(JSON.stringify(stats.rows), {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        });
    } catch (error) {
        console.error("Error fetching namespace stats:", {
            error,
            message: error instanceof Error ? error.message : "Unknown error",
            stack: error instanceof Error ? error.stack : undefined
        });

        return new Response(JSON.stringify({ error: "Internal Server Error" }), {
            status: 500,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
};

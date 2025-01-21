import { db } from "@/database/db";
import { migrationLog } from "@/database/schema";
import { sql } from "drizzle-orm";
import type { APIRoute } from "astro";

export type ResponseMigrationsByDays = {
    date: string;
    value: number;
};

export const GET: APIRoute = async () => {
    try {
        const stats = await db.execute<ResponseMigrationsByDays>(sql`
            WITH days AS (
                SELECT generate_series(
                    date_trunc('day', NOW() - INTERVAL '365 days'),
                    date_trunc('day', NOW()),
                    '1 day'::interval
                ) as day
            )
            SELECT 
                to_char(days.day, 'YYYY-MM-DD') as date,
                COUNT(ml.id) as value
            FROM days
            LEFT JOIN ${migrationLog} ml ON date_trunc('day', ml.date) = days.day
            GROUP BY days.day
            ORDER BY days.day ASC
        `);

        return new Response(JSON.stringify(stats.rows), {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        });
    } catch (error) {
        console.error("Error fetching migration stats:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), {
            status: 500,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
};

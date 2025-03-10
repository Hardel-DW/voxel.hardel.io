import { db } from "@/database/db";
import { migrationLog, migrationNamespace } from "@/database/schema";
import type { APIRoute } from "astro";
import { sql } from "drizzle-orm";

export type NamespaceStats = {
    namespace: string;
    occurence: number;
    proportion: number;
};

export type MonthlyNamespaceStats = {
    month: string;
    namespace: string;
    occurence: number;
};

export type ResponseNamespaceStats = {
    namespace: string;
    occurence: number;
    proportion: number;
} & {
    summaries: NamespaceStats[];
    per_month: Record<string, NamespaceStats[]>;
};

export const GET: APIRoute = async () => {
    try {
        // Get overall namespace stats
        const overallStats = await db.execute<NamespaceStats>(sql`
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

        // Get monthly namespace stats
        const monthlyStats = await db.execute<MonthlyNamespaceStats>(sql`
            WITH months_namespaces AS (
                SELECT 
                    TO_CHAR(ml.date, 'YYYY-MM') as month,
                    mn.namespace,
                    COUNT(*) as count
                FROM ${migrationNamespace} mn
                JOIN ${migrationLog} ml ON mn.migration_id = ml.id
                GROUP BY TO_CHAR(ml.date, 'YYYY-MM'), mn.namespace
                ORDER BY month DESC, count DESC
            ),
            monthly_totals AS (
                SELECT 
                    month,
                    SUM(count) as total
                FROM months_namespaces
                GROUP BY month
            )
            SELECT 
                mn.month,
                mn.namespace,
                CAST(mn.count AS INTEGER) as occurence
            FROM months_namespaces mn
            JOIN monthly_totals mt ON mn.month = mt.month
            ORDER BY mn.month DESC, mn.count DESC
        `);

        // Group monthly stats by month
        const per_month: Record<string, NamespaceStats[]> = {};

        for (const { month, namespace, occurence } of monthlyStats.rows) {
            if (!per_month[month]) {
                per_month[month] = [];
            }

            // Calculate proportion for each namespace within the month
            const monthTotal = monthlyStats.rows
                .filter((stat) => stat.month === month)
                .reduce((sum, stat) => sum + Number(stat.occurence), 0);

            const proportion = (Number(occurence) / monthTotal) * 100;

            per_month[month].push({
                namespace,
                occurence: Number(occurence),
                proportion: Number(proportion.toFixed(2))
            });

            // Sort by occurence descending
            per_month[month].sort((a, b) => b.occurence - a.occurence);
        }

        // Prepare response
        const response = {
            summaries: overallStats.rows.map((stat) => ({
                ...stat,
                occurence: Number(stat.occurence),
                proportion: Number(stat.proportion)
            })),
            per_month
        };

        return new Response(JSON.stringify(response), {
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

import { db } from "@/database/db";
import { migrationLog } from "@/database/schema";
import { getDescription } from "@/lib/minecraft/core/Version";
import type { APIRoute } from "astro";
import { sql } from "drizzle-orm";

type MonthlyStats = {
    month: string;
    version: number;
    count: number;
};

export type ResponseVersionsStats = {
    summaries: {
        version: number;
        minecraft_version: string;
        count: number;
    }[];
    per_month: Record<string, { version: number; minecraft_version: string; count: number }[]>;
};

export const GET: APIRoute = async () => {
    try {
        const result = await db.execute<MonthlyStats>(sql`
            SELECT 
                TO_CHAR(date, 'YYYY-MM') as month,
                version,
                CAST(COUNT(*) AS INTEGER) as count
            FROM ${migrationLog}
            GROUP BY TO_CHAR(date, 'YYYY-MM'), version
            ORDER BY month DESC, version DESC
        `);

        if (!result?.rows) {
            throw new Error("No rows returned from database");
        }

        const monthlyStats = result.rows;

        const globalStats = monthlyStats.reduce((acc: Record<number, number>, { version, count }) => {
            acc[version] = (acc[version] || 0) + Number(count);
            return acc;
        }, {});

        const summaries = Object.entries(globalStats)
            .map(([version, count]) => {
                try {
                    return {
                        version: Number.parseInt(version),
                        minecraft_version: getDescription(Number.parseInt(version)),
                        count: Number(count)
                    };
                } catch (e) {
                    console.error(`Error processing version ${version}:`, e);
                    return {
                        version: Number.parseInt(version),
                        minecraft_version: "Unknown",
                        count: Number(count)
                    };
                }
            })
            .sort((a, b) => b.version - a.version);

        const per_month = monthlyStats.reduce(
            (acc: Record<string, { version: number; minecraft_version: string; count: number }[]>, { month, version, count }) => {
                if (!acc[month]) {
                    acc[month] = [];
                }
                try {
                    acc[month].push({
                        version,
                        minecraft_version: getDescription(version),
                        count: Number(count)
                    });
                } catch (e) {
                    console.error(`Error processing month ${month} version ${version}:`, e);
                    acc[month].push({
                        version,
                        minecraft_version: "Unknown",
                        count: Number(count)
                    });
                }
                return acc;
            },
            {}
        );

        return new Response(
            JSON.stringify({
                summaries,
                per_month
            }),
            {
                status: 200,
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
    } catch (error) {
        console.error("Detailed error in version stats:", {
            error,
            message: error instanceof Error ? error.message : "Unknown error",
            stack: error instanceof Error ? error.stack : undefined
        });

        return new Response(
            JSON.stringify({
                error: "Failed to fetch version statistics",
                details: error instanceof Error ? error.message : "Unknown error"
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

import type { APIContext } from "astro";
import { db } from "@/database/db";
import { migrationLog } from "@/database/schema";
import { sql } from "drizzle-orm";
import type { FileLog, Log } from "@voxelio/breeze";

/**
 * Fetches enchantment logs from the database
 * Filters logs to only include entries with enchantment registry
 */
export async function GET(_: APIContext): Promise<Response> {
    try {
        const logs = await db
            .select({
                id: migrationLog.id,
                date: migrationLog.date,
                version: migrationLog.version,
                isModded: migrationLog.isModded,
                isMinified: migrationLog.isMinified,
                name: migrationLog.name,
                description: migrationLog.description,
                logs: migrationLog.logs
            })
            .from(migrationLog)
            .orderBy(sql`${migrationLog.date} DESC`)
            .limit(10000);

        const enchantmentLogs: Log[] = logs
            .map((log) => {
                const enchantmentFileEntries = log.logs.filter((entry: FileLog) => entry.registry === "enchantment");

                const namespaces = new Set<string>();
                for (const entry of enchantmentFileEntries) {
                    const [namespace] = entry.identifier.split(":");
                    namespaces.add(namespace);
                }

                return {
                    id: log.id,
                    date: log.date.toISOString(),
                    version: log.version,
                    isModded: log.isModded,
                    datapack: {
                        name: log.name,
                        description: log.description,
                        namespaces: Array.from(namespaces)
                    },
                    isMinified: log.isMinified,
                    logs: enchantmentFileEntries
                };
            })
            .filter((log) => log.logs.length > 0);

        return new Response(JSON.stringify(enchantmentLogs), {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        });
    } catch (error) {
        console.error("Error fetching enchantment logs:", error);
        return new Response(JSON.stringify({ error: "Failed to fetch enchantment logs" }), {
            status: 500,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
}

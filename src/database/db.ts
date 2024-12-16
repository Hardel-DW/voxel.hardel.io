import { purchase, migrationLog, migrationNamespace } from "@/database/schema";
import { neon } from "@neondatabase/serverless";
import { and, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";
import type { Log } from "@/lib/minecraft/core/engine/migrations/types";
import { randomUUID } from "node:crypto";

export const database_url = import.meta.env.DATABASE_URL;
const sql = neon(database_url);

export const db = drizzle(sql);

export const checkPurchase = async (userId: string, productId: string) => {
    const result = await db
        .select()
        .from(purchase)
        .where(and(eq(purchase.userId, userId), eq(purchase.productId, productId)));

    return result.length > 0;
};

export const saveMigrationLog = async (log: Log) => {
    // Transaction pour assurer l'intégrité des données
    await db.transaction(async (tx) => {
        // Insertion du log principal
        await tx.insert(migrationLog).values({
            id: log.id,
            date: new Date(log.date),
            version: log.version,
            isModded: log.isModded,
            isMinified: log.isMinified,
            name: log.datapack.name,
            description: log.datapack.description,
            logs: log.logs
        });

        // Insertion des namespaces
        const namespaceValues = log.datapack.namespaces.map((namespace) => ({
            id: randomUUID(),
            migrationId: log.id,
            namespace
        }));

        await tx.insert(migrationNamespace).values(namespaceValues);
    });

    return log.id;
};

import { purchase } from "@/database/schema.ts";
import { neon } from "@neondatabase/serverless";
import { and, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";

export const database_url = process.env.DATABASE_URL ?? import.meta.env?.DATABASE_URL;
const sql = neon(database_url);

export const db = drizzle(sql);

export const checkPurchase = async (userId: string, productId: string) => {
    const result = await db
        .select()
        .from(purchase)
        .where(and(eq(purchase.userId, userId), eq(purchase.productId, productId)));

    return result.length > 0;
};

import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

export const database_url = process.env.DATABASE_URL ?? import.meta.env?.DATABASE_URL;
const sql = neon(database_url);

export const db = drizzle(sql);

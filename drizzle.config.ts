import type {Config} from "drizzle-kit";
import {database_url} from "@/database/db.ts";

export default {
    out: "./src/database/migrations",
    schema: "./src/database/schema.ts",
    driver: "pg",
    dbCredentials: {
        connectionString: database_url
    }
} satisfies Config;

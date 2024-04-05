import { db } from "@/database/db.ts";
import { sessionTable, userTable } from "@/database/schema.ts";
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { Google } from "arctic";
import { Lucia } from "lucia";

const baseUrl = import.meta.env.VERCEL_URL ? `https://${import.meta.env.VERCEL_URL}` : "http://localhost:4321";
export const adapter = new DrizzlePostgreSQLAdapter(db, sessionTable, userTable);

export const lucia = new Lucia(adapter, {
    sessionCookie: {
        attributes: {
            secure: import.meta.env.PROD
        }
    },
    getUserAttributes: (attributes) => {
        return {
            firstName: attributes.firstName,
            lastName: attributes.lastName,
            email: attributes.email,
            googleId: attributes.googleId,
            picture: attributes.picture
        };
    }
});

export const google = new Google(
    import.meta.env.GOOGLE_CLIENT_ID,
    import.meta.env.GOOGLE_CLIENT_SECRET,
    `${baseUrl}/login/google/callback`
);

declare module "lucia" {
    interface Register {
        Lucia: typeof lucia;
        DatabaseUserAttributes: {
            firstName: string;
            lastName: string;
            email: string;
            googleId: number;
            picture: string;
        };
    }
}

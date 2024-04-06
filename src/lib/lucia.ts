import { db } from "@/database/db.ts";
import { sessionTable, userTable } from "@/database/schema.ts";
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { Google } from "arctic";
import { Lucia } from "lucia";

const env = process.env.ENVIRONMENT ?? import.meta.env.ENVIRONMENT;
const uris = {
    production: "voxel.hardel.io",
    development: "devvoxel.hardel.io",
    staging: "stagingvoxel.hardel.io",
    local: "localhost:4321"
};
const uri = uris[env as keyof typeof uris] || uris.local;
const redirect = `https://${uri}/auth/google/callback`;

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

const googleid = process.env.GOOGLE_CLIENT_ID ?? import.meta.env.GOOGLE_CLIENT_ID;
const googlesecret = process.env.GOOGLE_CLIENT_SECRET ?? import.meta.env.GOOGLE_CLIENT_SECRET;

export const google = new Google(googleid, googlesecret, redirect);

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

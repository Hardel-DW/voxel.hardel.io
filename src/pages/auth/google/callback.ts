import { db } from "@/database/db.ts";
import { userTable } from "@/database/schema.ts";
import { google, lucia } from "@/lib/lucia.ts";
import { OAuth2RequestError } from "arctic";
import type { APIContext } from "astro";
import { and, eq } from "drizzle-orm";
import { generateId } from "lucia";

export async function GET(context: APIContext): Promise<Response> {
    const code = context.url.searchParams.get("code");
    const state = context.url.searchParams.get("state");
    const storedState = context.cookies.get("state")?.value ?? null;
    const codeVerifier = context.cookies.get("code_verifier")?.value ?? null;
    const redirection = context.cookies.get("callback_auth")?.value ?? null;

    if (!code || !codeVerifier || !state || !storedState || state !== storedState) {
        return new Response(null, {
            status: 400
        });
    }

    let redirectUrl = "/";
    if (redirection) {
        redirectUrl = new URL(redirection).pathname;
    }

    try {
        const tokens = await google.validateAuthorizationCode(code, codeVerifier);
        const googleUserResponse = await fetch("https://www.googleapis.com/oauth2/v3/userinfo?alt=json", {
            headers: {
                Authorization: `Bearer ${tokens.accessToken}`
            }
        });
        const googleUser: GoogleUser = await googleUserResponse.json();

        const existingUser = await db
            .select()
            .from(userTable)
            .where(and(eq(userTable.provider, "google"), eq(userTable.providerId, googleUser.sub)))
            .limit(1)
            .execute();

        if (existingUser[0]) {
            const session = await lucia.createSession(existingUser[0].id, {});
            const sessionCookie = lucia.createSessionCookie(session.id);
            context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
            return context.redirect(redirectUrl);
        }

        const userId = generateId(40);
        await db.insert(userTable).values({
            id: userId,
            provider: "google",
            providerId: googleUser.sub,
            email: googleUser.email,
            name: googleUser.name,
            picture: googleUser.picture
        });

        const session = await lucia.createSession(userId, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
        return context.redirect(redirectUrl);
    } catch (e) {
        if (e instanceof OAuth2RequestError && e.message === "bad_verification_code") {
            return new Response(null, {
                status: 400
            });
        }

        return new Response(null, {
            status: 500
        });
    }
}

interface GoogleUser {
    sub: string;
    name: string;
    given_name: string;
    family_name: string;
    picture: string;
    email: string;
    email_verified: boolean;
    locale: string;
}

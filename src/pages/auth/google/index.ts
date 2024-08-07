import { google } from "@/lib/lucia.ts";
import { generateCodeVerifier, generateState } from "arctic";
import type { APIContext, AstroCookieSetOptions } from "astro";

export async function GET(context: APIContext): Promise<Response> {
    const state = generateState();
    const codeVerifier = generateCodeVerifier();
    const originalUrl = context.url.searchParams.get("redirect") ?? import.meta.env.SITE;
    const url = await google.createAuthorizationURL(state, codeVerifier, {
        scopes: ["profile", "email"]
    });

    // store state verifier as cookie
    context.cookies.set("state", state, {
        path: "/",
        secure: import.meta.env.PROD,
        sameSite: "lax",
        httpOnly: true,
        maxAge: 60 * 10 // 10 min
    } as AstroCookieSetOptions);

    // store code verifier as cookie
    context.cookies.set("code_verifier", codeVerifier, {
        secure: import.meta.env.PROD,
        sameSite: "lax",
        path: "/",
        httpOnly: true,
        maxAge: 60 * 10 // 10 min
    } as AstroCookieSetOptions);

    context.cookies.set("callback_auth", originalUrl, {
        secure: import.meta.env.PROD,
        sameSite: "lax",
        path: "/",
        httpOnly: true,
        maxAge: 60 * 10 // 10 min
    } as AstroCookieSetOptions);

    return context.redirect(url.toString());
}

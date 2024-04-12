import { lucia } from "@/lib/lucia.ts";
import type { APIContext, AstroCookieSetOptions } from "astro";

export async function POST(context: APIContext): Promise<Response> {
    if (!context.locals.session) {
        return new Response(null, {
            status: 401
        });
    }

    await lucia.invalidateSession(context.locals.session.id);

    const sessionCookie = lucia.createBlankSessionCookie();
    context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes as AstroCookieSetOptions);
    const redirection = context.cookies.get("callback_auth")?.value ?? null;
    let redirectUrl = "/";
    if (redirection) {
        redirectUrl = new URL(redirection).pathname;
    }

    return context.redirect(redirectUrl);
}

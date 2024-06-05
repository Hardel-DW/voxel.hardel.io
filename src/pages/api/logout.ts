import { lucia } from "@/lib/lucia.ts";
import type { APIRoute, AstroCookieSetOptions } from "astro";

export const POST: APIRoute = async (context) => {
    if (!context.locals.session) {
        return new Response(null, {
            status: 401
        });
    }

    await lucia.invalidateSession(context.locals.session.id);

    const sessionCookie = lucia.createBlankSessionCookie();
    context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes as AstroCookieSetOptions);

    const originalUrl = context.url.searchParams.get("redirect") ?? import.meta.env.SITE;
    return context.redirect(originalUrl);
};

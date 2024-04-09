import { defineMiddleware } from "astro:middleware";
import { lucia } from "@/lib/lucia.ts";
import { verifyRequestOrigin } from "lucia";

/**
 * These pages are pre-rendered and cause warnings when the middleware is applied to them.
 */
export const onRequest = defineMiddleware(async (context, next) => {
    const excludedPaths = ["/", "guide", "contact", "terms", "privacy", "404"];
    const url = new URL(context.request.url);
    if (excludedPaths.includes(url.pathname)) {
        return next();
    }

    if (context.request.method !== "GET") {
        const originHeader = context.request.headers.get("Origin");
        const hostHeader = context.request.headers.get("Host");
        if (!originHeader || !hostHeader || !verifyRequestOrigin(originHeader, [hostHeader])) {
            return new Response(null, {
                status: 403
            });
        }
    }

    const sessionId = context.cookies.get(lucia.sessionCookieName)?.value ?? null;
    if (!sessionId) {
        context.locals.user = null;
        context.locals.session = null;
        return next();
    }

    const { session, user } = await lucia.validateSession(sessionId);
    if (session?.fresh) {
        const sessionCookie = lucia.createSessionCookie(session.id);
        context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    }

    if (!session) {
        const sessionCookie = lucia.createBlankSessionCookie();
        context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    }

    context.locals.session = session;
    context.locals.user = user;
    return next();
});

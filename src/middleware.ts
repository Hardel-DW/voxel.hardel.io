import { defineMiddleware } from "astro:middleware";

/**
 * These pages are pre-rendered and cause warnings when the middleware is applied to them.
 */
export const onRequest = defineMiddleware(async (context, next) => {
    return next();
});

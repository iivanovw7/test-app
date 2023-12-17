import { defineMiddleware } from "astro/middleware";

export const validation = defineMiddleware(async (context, next) => {
    return next();
});

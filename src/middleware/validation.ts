import { defineMiddleware } from "astro/middleware";
import { AuthValidation } from "@/shared/api";
import { apiRoutes } from "@/shared/routes";

export const validation = defineMiddleware(async (context, next) => {
    let { pathname } = context.url;

    // eslint-disable-next-line sonarjs/no-small-switch
    switch (pathname) {
        case apiRoutes.login.path: {
            return AuthValidation.login(context, next);
        }
        default: {
            return next();
        }
    }
});

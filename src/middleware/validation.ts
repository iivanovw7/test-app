import { defineMiddleware } from "astro/middleware";
import { AuthValidation } from "@/shared/api";
import { apiRoutes } from "@/shared/routes";

export const validation = defineMiddleware(async (context, next) => {
    let { pathname } = context.url;

    switch (pathname) {
        case apiRoutes.login.path: {
            return AuthValidation.login(context, next);
        }
        case apiRoutes.signup.path: {
            return AuthValidation.signup(context, next);
        }
        default: {
            return next();
        }
    }
});

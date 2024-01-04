import { AuthValidation, RequestsValidation } from "@/shared/api";
import { apiRoutes } from "@/shared/routes";
import { defineMiddleware } from "astro/middleware";

export const validation = defineMiddleware(async (context, next) => {
    let { pathname } = context.url;

    switch (pathname) {
        case apiRoutes.login.path: {
            return AuthValidation.login(context, next);
        }
        case apiRoutes.signup.path: {
            return AuthValidation.signup(context, next);
        }
        case apiRoutes.updateMe.path: {
            return AuthValidation.updateMe(context, next);
        }
        case apiRoutes.createRequest.path: {
            return RequestsValidation.create(context, next);
        }
        default: {
            return next();
        }
    }
});

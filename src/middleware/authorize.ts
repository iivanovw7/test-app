import { ACCESS_TOKEN_SECRET, ACCESS_TOKEN_KEY, Result } from "@/shared/api";
import { publicPaths, apiPaths, routes } from "@/shared/routes";
import { defineMiddleware } from "astro/middleware";
import { HttpStatus } from "#/http";
import { ErrorCode } from "#/api";
import { jwtVerify } from "jose";

const { API_URL } = import.meta.env;

const VerifyResult = {
    UNAUTHORIZED: "UNAUTHORIZED",
    AUTHORIZED: "AUTHORIZED",
    ERROR: "ERROR",
} as const;

type VerifyResult = (typeof VerifyResult)[keyof typeof VerifyResult];

const verifyAuth = async (accessToken?: MaybeValue<string>) => {
    if (!accessToken) {
        return VerifyResult.UNAUTHORIZED;
    }

    try {
        await jwtVerify(accessToken, ACCESS_TOKEN_SECRET);

        return VerifyResult.AUTHORIZED;
    } catch (error) {
        return VerifyResult.ERROR;
    }
};

export const authorize = defineMiddleware(async (context, next) => {
    let { pathname, origin } = context.url;
    let { headers } = context.request;

    if (apiPaths.includes(pathname) && origin !== API_URL) {
        return Response.redirect(new URL(routes.home.path, context.url));
    }

    let accessToken = context.cookies.get(ACCESS_TOKEN_KEY)?.value || headers.get(ACCESS_TOKEN_KEY);

    if (accessToken && routes.login.path === pathname) {
        return Response.redirect(new URL(routes.home.path, context.url));
    }

    if (publicPaths.includes(pathname)) {
        return next();
    }

    let validationResult = await verifyAuth(accessToken);

    switch (validationResult) {
        case VerifyResult.AUTHORIZED: {
            return next();
        }
        case VerifyResult.ERROR:
        case VerifyResult.UNAUTHORIZED: {
            if (pathname.startsWith("/api/")) {
                return Result.errorResponse(HttpStatus.UNAUTHORIZED, { code: ErrorCode.UNAUTHORIZED });
            }

            return Response.redirect(new URL(routes.home.path, context.url));
        }
        default: {
            return Response.redirect(new URL(routes.home.path, context.url));
        }
    }
});

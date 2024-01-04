import { ACCESS_TOKEN_KEY, ACCESS_TOKEN_SECRET, Result } from "@/shared/api";
import { apiPaths, publicPaths, routes } from "@/shared/routes";
import { ErrorCode } from "#/api";
import { HttpStatus } from "#/http";
import { defineMiddleware } from "astro/middleware";
import { jwtVerify } from "jose";

const { API_URL } = import.meta.env;

const VerifyResult = {
    AUTHORIZED: "AUTHORIZED",
    ERROR: "ERROR",
    UNAUTHORIZED: "UNAUTHORIZED",
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
    let { origin, pathname } = context.url;
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

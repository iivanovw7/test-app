import type { QueryUserModel } from "#/api";
import type { APIRoute } from "astro";

import { jwtVerify, SignJWT } from "jose";
import { HttpStatus } from "#/http";
import { ErrorCode } from "#/api";

import {
    REFRESH_TOKEN_MAX_AGE,
    REFRESH_TOKEN_SECRET,
    ACCESS_TOKEN_MAX_AGE,
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_KEY,
    ACCESS_TOKEN_KEY,
    cleanTokens,
    DB_NAME,
    Result,
} from "../utils";
import clientPromise from "../mongodb";

export class AuthService {
    public login: APIRoute = async ({ request, cookies }) => {
        try {
            let body = await request.json();
            let client = await clientPromise;
            let collection = client.db(DB_NAME).collection("users");

            let user = await collection.findOne<QueryUserModel>(
                { email: body.email },
                { projection: { emailVerified: 0, _id: 0 } },
            );

            if (!user) {
                return Result.errorResponse(HttpStatus.NOT_FOUND, {
                    code: ErrorCode.USER_NOT_FOUND,
                    message: "User not found",
                });
            }

            if (user.password === body.password) {
                let accessToken = await new SignJWT({ email: user.email })
                    .setProtectedHeader({ alg: "HS256" })
                    .setIssuedAt()
                    .setExpirationTime("20m")
                    .sign(ACCESS_TOKEN_SECRET);

                let refreshToken = await new SignJWT({ email: user.email })
                    .setProtectedHeader({ alg: "HS256" })
                    .setIssuedAt()
                    .setExpirationTime("1d")
                    .sign(REFRESH_TOKEN_SECRET);

                cookies.set(REFRESH_TOKEN_KEY, refreshToken, {
                    maxAge: REFRESH_TOKEN_MAX_AGE,
                    sameSite: "none",
                    httpOnly: true,
                    secure: true,
                    path: "/",
                });

                cookies.set(ACCESS_TOKEN_KEY, accessToken, {
                    maxAge: ACCESS_TOKEN_MAX_AGE,
                    sameSite: "none",
                    httpOnly: true,
                    secure: true,
                    path: "/",
                });

                let { password, _id, ...restUser } = user;

                return Result.successResponse({
                    data: { user: { id: _id, ...restUser } },
                });
            }

            return Result.errorResponse(HttpStatus.UNAUTHORIZED, {
                code: ErrorCode.WRONG_PASSWORD,
                message: "Wrong password",
            });
        } catch (error) {
            return Result.errorResponse(HttpStatus.INTERNAL_SERVER_ERROR, {
                code: ErrorCode.INTERNAL_SERVER_ERROR,
                message: error.message,
                error,
            });
        }
    };

    public refresh: APIRoute = async ({ request, cookies }) => {
        let refreshToken = cookies.get(REFRESH_TOKEN_KEY)?.value || request.headers.get(REFRESH_TOKEN_KEY);

        if (!refreshToken) {
            cleanTokens(cookies);

            return Result.errorResponse(HttpStatus.UNAUTHORIZED, {
                code: ErrorCode.UNAUTHORIZED,
                message: "Unauthorized",
            });
        }

        try {
            let result = (await jwtVerify(refreshToken, REFRESH_TOKEN_SECRET)) as AnyObject;

            let accessToken = await new SignJWT({ email: result.payload.email })
                .setProtectedHeader({ alg: "HS256" })
                .setIssuedAt()
                .setExpirationTime("20m")
                .sign(ACCESS_TOKEN_SECRET);

            cookies.set(ACCESS_TOKEN_KEY, accessToken, {
                maxAge: ACCESS_TOKEN_MAX_AGE,
                sameSite: "none",
                httpOnly: true,
                secure: true,
                path: "/",
            });

            return Result.successResponse({ message: "Token refreshed" });
        } catch (error) {
            return Result.errorResponse(HttpStatus.UNAUTHORIZED, {
                code: ErrorCode.INVALID_REFRESH_TOKEN,
                message: error.message,
                error,
            });
        }
    };

    public logout: APIRoute = async ({ cookies }) => {
        cleanTokens(cookies);

        return Result.successResponse({ message: "Logged out" });
    };
}

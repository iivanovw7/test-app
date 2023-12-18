import type { QueryUserModel } from "#/api";
import type { APIRoute } from "astro";

import { HttpStatus } from "#/http";
import { ErrorCode } from "#/api";
import { jwtVerify } from "jose";

import {
    REFRESH_TOKEN_SECRET,
    REFRESH_TOKEN_KEY,
    issueRefreshToken,
    issueAccessToken,
    cleanTokens,
    DB_NAME,
    Result,
} from "../utils";
import clientPromise from "../mongodb";

export class AuthService {
    public signup: APIRoute = async ({ request, cookies }) => {
        try {
            let body = await request.json();
            let client = await clientPromise;
            let collection = client.db(DB_NAME).collection("users");

            let user = await collection.findOne<QueryUserModel>(
                { email: body.email },
                { projection: { emailVerified: 0, _id: 0 } },
            );

            if (user) {
                return Result.errorResponse(HttpStatus.NOT_FOUND, {
                    code: ErrorCode.USER_EXISTS,
                    message: "User exists",
                });
            }

            let { insertedId } = await collection.insertOne({
                firstName: body.firstName,
                lastName: body.lastName,
                password: body.password,
                email: body.email,
            });

            let newUser = await collection.findOne<QueryUserModel>({ _id: insertedId });

            if (newUser) {
                await issueAccessToken(cookies, newUser.email);
                await issueRefreshToken(cookies, newUser.email);

                let { password, _id, ...restUser } = newUser;

                return Result.successResponse({
                    data: { user: { id: _id, ...restUser } },
                });
            }

            return Result.errorResponse(HttpStatus.INTERNAL_SERVER_ERROR, {
                code: ErrorCode.INTERNAL_SERVER_ERROR,
                message: "Error creating user",
            });
        } catch (error) {
            return Result.errorResponse(HttpStatus.INTERNAL_SERVER_ERROR, {
                code: ErrorCode.INTERNAL_SERVER_ERROR,
                message: error.message,
                error,
            });
        }
    };

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
                await issueAccessToken(cookies, user.email);
                await issueRefreshToken(cookies, user.email);

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

            await issueAccessToken(cookies, result.payload.email);

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

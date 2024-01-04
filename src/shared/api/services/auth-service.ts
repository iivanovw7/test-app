import type { QueryUserModel } from "#/api";

import { ErrorCode, UserRole } from "#/api";
import { HttpStatus } from "#/http";
import dayjs from "dayjs";
import { jwtVerify } from "jose";

import clientPromise from "../mongodb";
import {
    cleanTokens,
    DB_NAME,
    issueAccessToken,
    issueRefreshToken,
    REFRESH_TOKEN_KEY,
    REFRESH_TOKEN_SECRET,
    Result,
} from "../utils";

export const AuthService = {
    login: async ({ cookies, request }) => {
        try {
            let body = await request.json();
            let client = await clientPromise;
            let collection = client.db(DB_NAME).collection("users");

            let user = await collection.findOne<QueryUserModel>(
                { email: body.email },
                { projection: { emailVerified: 0 } },
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

                let { _id, password, ...restUser } = user;

                return Result.successResponse({
                    data: { id: _id, ...restUser },
                });
            }

            return Result.errorResponse(HttpStatus.UNAUTHORIZED, {
                code: ErrorCode.WRONG_PASSWORD,
                message: "Wrong password",
            });
        } catch (error) {
            return Result.errorResponse(HttpStatus.INTERNAL_SERVER_ERROR, {
                code: ErrorCode.INTERNAL_SERVER_ERROR,
                error,
                message: error.message,
            });
        }
    },
    logout: async ({ cookies }) => {
        cleanTokens(cookies);

        return Result.successResponse({ message: "Logged out" });
    },
    refresh: async ({ cookies, request }) => {
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
                error,
                message: error.message,
            });
        }
    },
    signup: async ({ cookies, request }) => {
        try {
            let body = await request.json();
            let client = await clientPromise;
            let collection = client.db(DB_NAME).collection("users");

            let user = await collection.findOne<QueryUserModel>(
                { email: body.email },
                { projection: { emailVerified: 0 } },
            );

            if (user) {
                return Result.errorResponse(HttpStatus.NOT_FOUND, {
                    code: ErrorCode.USER_EXISTS,
                    message: "User exists",
                });
            }

            let { insertedId } = await collection.insertOne({
                address: {
                    apartment: body.apartment,
                    building: body.building,
                    city: body.city,
                    country: body.country,
                    postalCode: body.postalCode,
                    street: body.street,
                },
                contacts: {
                    phone: body.phone,
                    telegram: "",
                    whatsapp: "",
                },
                createdAt: dayjs().valueOf(),
                email: body.email,
                firstName: body.firstName,
                lastName: body.lastName,
                password: body.password,
                role: UserRole.USER,
                updatedAt: dayjs().valueOf(),
            });

            let newUser = await collection.findOne<QueryUserModel>({ _id: insertedId });

            if (newUser) {
                await issueAccessToken(cookies, newUser.email);
                await issueRefreshToken(cookies, newUser.email);

                let { _id, password, ...restUser } = newUser;

                return Result.successResponse({
                    data: { id: _id, ...restUser },
                });
            }

            return Result.errorResponse(HttpStatus.INTERNAL_SERVER_ERROR, {
                code: ErrorCode.INTERNAL_SERVER_ERROR,
                message: "Error creating user",
            });
        } catch (error) {
            return Result.errorResponse(HttpStatus.INTERNAL_SERVER_ERROR, {
                code: ErrorCode.INTERNAL_SERVER_ERROR,
                error,
                message: error.message,
            });
        }
    },
};

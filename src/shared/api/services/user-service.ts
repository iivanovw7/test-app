import type { QueryUserCount, QueryUserModel, TBasicApiResult } from "#/api";

import { ErrorCode } from "#/api";
import { HttpStatus } from "#/http";
import dayjs from "dayjs";
import { jwtVerify } from "jose";

import clientPromise from "../mongodb";
import {
    ACCESS_TOKEN_KEY,
    ACCESS_TOKEN_SECRET,
    cleanTokens,
    DB_NAME,
    issueAccessToken,
    issueRefreshToken,
    Result,
} from "../utils";

export type TQueryUserCountResult = TBasicApiResult<QueryUserCount>;

export const UserService = {
    count: async () => {
        try {
            let client = await clientPromise;
            let collection = client.db(DB_NAME).collection("users");
            let count: number = await collection.countDocuments();

            return Result.successResponse({
                data: count,
            });
        } catch (error) {
            return Result.errorResponse(HttpStatus.INTERNAL_SERVER_ERROR, {
                code: ErrorCode.INTERNAL_SERVER_ERROR,
                error,
                message: error.message,
            });
        }
    },
    getMe: async ({ cookies, request }) => {
        let accessToken = request.headers.get(ACCESS_TOKEN_KEY) || cookies.get(ACCESS_TOKEN_KEY)?.value;

        if (!accessToken) {
            cleanTokens(cookies);

            return Result.errorResponse(HttpStatus.UNAUTHORIZED, {
                code: ErrorCode.UNAUTHORIZED,
                message: "Unauthorized",
            });
        }

        try {
            let result = (await jwtVerify(accessToken, ACCESS_TOKEN_SECRET)) as AnyObject;
            let client = await clientPromise;
            let collection = client.db(DB_NAME).collection("users");

            let user = await collection.findOne<QueryUserModel>({ email: result.payload.email });

            if (!user) {
                cleanTokens(cookies);

                return Result.errorResponse(HttpStatus.NOT_FOUND, {
                    code: ErrorCode.USER_NOT_FOUND,
                    message: "User not found",
                });
            }

            let { _id, password, ...restUser } = user;

            return Result.successResponse({
                data: { id: _id.toString(), ...restUser },
            });
        } catch (error) {
            cleanTokens(cookies);

            return Result.errorResponse(HttpStatus.UNAUTHORIZED, {
                code: ErrorCode.UNAUTHORIZED,
                error,
                message: "Unauthorized",
            });
        }
    },
    updateMe: async ({ cookies, request }) => {
        let accessToken = request.headers.get(ACCESS_TOKEN_KEY) || cookies.get(ACCESS_TOKEN_KEY)?.value;

        if (!accessToken) {
            cleanTokens(cookies);

            return Result.errorResponse(HttpStatus.UNAUTHORIZED, {
                code: ErrorCode.UNAUTHORIZED,
                message: "Unauthorized",
            });
        }

        try {
            let body = await request.json();
            let result = (await jwtVerify(accessToken, ACCESS_TOKEN_SECRET)) as AnyObject;
            let client = await clientPromise;
            let collection = client.db(DB_NAME).collection("users");

            let user = await collection.findOne<QueryUserModel>({ email: result.payload.email });

            if (!user) {
                cleanTokens(cookies);

                return Result.errorResponse(HttpStatus.NOT_FOUND, {
                    code: ErrorCode.USER_NOT_FOUND,
                    message: "User not found",
                });
            }

            let { modifiedCount } = await collection.updateOne(
                { _id: user._id },
                {
                    $set: {
                        address: {
                            apartment: body.apartment || user.address.apartment,
                            building: body.building || user.address.building,
                            city: body.city || user.address.city,
                            country: body.country || user.address.country,
                            postalCode: body.postalCode || user.address.postalCode,
                            street: body.street || user.address.street,
                        },
                        contacts: {
                            phone: body.phone || user.contacts.phone,
                            telegram: body.telegram || user.contacts.telegram,
                            whatsapp: body.whatsapp || user.contacts.whatsapp,
                        },
                        createdAt: user.createdAt,
                        email: body.email || user.email,
                        firstName: body.firstName || user.firstName,
                        lastName: body.lastName || user.lastName,
                        password: user.password,
                        updatedAt: dayjs().valueOf(),
                    },
                },
                { upsert: false },
            );

            if (modifiedCount === 0) {
                return Result.errorResponse(HttpStatus.INTERNAL_SERVER_ERROR, {
                    code: ErrorCode.USER_NOT_FOUND,
                    message: `User ${user._id.toString()} was not found`,
                });
            }

            let updatedUser = await collection.findOne<QueryUserModel>({ _id: user._id });

            if (updatedUser) {
                await issueAccessToken(cookies, updatedUser.email);
                await issueRefreshToken(cookies, updatedUser.email);

                let { _id, password, ...restUser } = updatedUser;

                return Result.successResponse({
                    data: { id: _id.toString(), ...restUser },
                });
            }

            return Result.errorResponse(HttpStatus.INTERNAL_SERVER_ERROR, {
                code: ErrorCode.INTERNAL_SERVER_ERROR,
                message: "Error editing user",
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

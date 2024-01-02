import type { TBasicApiResult, QueryUserCount, QueryUserModel } from "#/api";

import { HttpStatus } from "#/http";
import { ErrorCode } from "#/api";
import { jwtVerify } from "jose";
import dayjs from "dayjs";

import {
    ACCESS_TOKEN_SECRET,
    issueRefreshToken,
    ACCESS_TOKEN_KEY,
    issueAccessToken,
    cleanTokens,
    DB_NAME,
    Result,
} from "../utils";
import clientPromise from "../mongodb";

export type TQueryUserCountResult = TBasicApiResult<QueryUserCount>;

export const UserService = {
    updateMe: async ({ request, cookies }) => {
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
                            postalCode: body.postalCode || user.address.postalCode,
                            apartment: body.apartment || user.address.apartment,
                            building: body.building || user.address.building,
                            country: body.country || user.address.country,
                            street: body.street || user.address.street,
                            city: body.city || user.address.city,
                        },
                        contacts: {
                            telegram: body.telegram || user.contacts.telegram,
                            whatsapp: body.whatsapp || user.contacts.whatsapp,
                            phone: body.phone || user.contacts.phone,
                        },
                        firstName: body.firstName || user.firstName,
                        lastName: body.lastName || user.lastName,
                        email: body.email || user.email,
                        updatedAt: dayjs().valueOf(),
                        createdAt: user.createdAt,
                        password: user.password,
                    },
                },
                { upsert: false },
            );

            if (modifiedCount === 0) {
                return Result.errorResponse(HttpStatus.INTERNAL_SERVER_ERROR, {
                    message: `User ${user._id.toString()} was not found`,
                    code: ErrorCode.USER_NOT_FOUND,
                });
            }

            let updatedUser = await collection.findOne<QueryUserModel>({ _id: user._id });

            if (updatedUser) {
                await issueAccessToken(cookies, updatedUser.email);
                await issueRefreshToken(cookies, updatedUser.email);

                let { password, _id, ...restUser } = updatedUser;

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
                message: error.message,
                error,
            });
        }
    },
    getMe: async ({ request, cookies }) => {
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

            let { password, _id, ...restUser } = user;

            return Result.successResponse({
                data: { id: _id.toString(), ...restUser },
            });
        } catch (error) {
            cleanTokens(cookies);

            return Result.errorResponse(HttpStatus.UNAUTHORIZED, {
                code: ErrorCode.UNAUTHORIZED,
                message: "Unauthorized",
                error,
            });
        }
    },
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
                message: error.message,
                error,
            });
        }
    },
};

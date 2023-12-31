import type { QueryRequestModel, QueryUserModel } from "#/api";

import { ErrorCode } from "#/api";
import { HttpStatus } from "#/http";
import dayjs from "dayjs";
import { jwtVerify } from "jose";
import { ObjectId } from "mongodb";

import clientPromise from "../mongodb";
import { cleanTokens, DB_NAME, REFRESH_TOKEN_KEY, REFRESH_TOKEN_SECRET, Result } from "../utils";

export const RequestService = {
    count: async () => {
        try {
            let client = await clientPromise;
            let collection = client.db(DB_NAME).collection("requests");
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
    create: async ({ cookies, request }) => {
        try {
            let body = await request.json();
            let client = await clientPromise;
            let usersCollection = client.db(DB_NAME).collection("users");
            let requestsCollection = client.db(DB_NAME).collection("requests");
            let refreshToken = cookies.get(REFRESH_TOKEN_KEY)?.value || request.headers.get(REFRESH_TOKEN_KEY);

            if (!refreshToken) {
                cleanTokens(cookies);

                return Result.errorResponse(HttpStatus.UNAUTHORIZED, {
                    code: ErrorCode.UNAUTHORIZED,
                    message: "Unauthorized",
                });
            }

            let verifyResult = (await jwtVerify(refreshToken, REFRESH_TOKEN_SECRET)) as AnyObject;

            let user = await usersCollection.findOne<QueryUserModel>(
                { email: verifyResult.payload.email },
                { projection: { emailVerified: 0 } },
            );

            if (!user) {
                return Result.errorResponse(HttpStatus.NOT_FOUND, {
                    code: ErrorCode.USER_NOT_FOUND,
                    message: "Author not found",
                });
            }

            let { insertedId } = await requestsCollection.insertOne({
                author: user,
                avatarUrl: body.avatarUrl,
                createdAt: dayjs().valueOf(),
                description: body.description,
                endsAt: dayjs(body.endsAt).valueOf(),
                isHidden: body.isHidden,
                startsAt: dayjs(body.startsAt).valueOf(),
                title: body.title,
            });

            let newRequest = await requestsCollection.findOne<QueryRequestModel>({ _id: insertedId });

            if (newRequest) {
                let { _id, ...restRequest } = newRequest;

                return Result.successResponse({
                    data: { id: _id, ...restRequest },
                });
            }

            return Result.errorResponse(HttpStatus.INTERNAL_SERVER_ERROR, {
                code: ErrorCode.INTERNAL_SERVER_ERROR,
                message: "Error creating request",
            });
        } catch (error) {
            return Result.errorResponse(HttpStatus.INTERNAL_SERVER_ERROR, {
                code: ErrorCode.INTERNAL_SERVER_ERROR,
                error,
                message: error.message,
            });
        }
    },
    delete: async ({ cookies, params, request }) => {
        try {
            let { id } = params;

            if (!id) {
                return Result.errorResponse(HttpStatus.NOT_FOUND, {
                    code: ErrorCode.USER_NOT_FOUND,
                    message: "User ID not found",
                });
            }

            let client = await clientPromise;
            let usersCollection = client.db(DB_NAME).collection("users");
            let requestsCollection = client.db(DB_NAME).collection("requests");
            let refreshToken = cookies.get(REFRESH_TOKEN_KEY)?.value || request.headers.get(REFRESH_TOKEN_KEY);

            if (!refreshToken) {
                cleanTokens(cookies);

                return Result.errorResponse(HttpStatus.UNAUTHORIZED, {
                    code: ErrorCode.UNAUTHORIZED,
                    message: "Unauthorized",
                });
            }

            let verifyResult = (await jwtVerify(refreshToken, REFRESH_TOKEN_SECRET)) as AnyObject;

            let user = await usersCollection.findOne<QueryUserModel>(
                { email: verifyResult.payload.email },
                { projection: { emailVerified: 0 } },
            );

            if (!user) {
                return Result.errorResponse(HttpStatus.NOT_FOUND, {
                    code: ErrorCode.USER_NOT_FOUND,
                    message: "Author not found",
                });
            }

            let { deletedCount } = await requestsCollection.deleteOne({
                _id: new ObjectId(id),
            });

            if (deletedCount > 0) {
                return Result.successResponse();
            }

            return Result.errorResponse(HttpStatus.INTERNAL_SERVER_ERROR, {
                code: ErrorCode.INTERNAL_SERVER_ERROR,
                message: "Error deleting request",
            });
        } catch (error) {
            return Result.errorResponse(HttpStatus.INTERNAL_SERVER_ERROR, {
                code: ErrorCode.INTERNAL_SERVER_ERROR,
                error,
                message: error.message,
            });
        }
    },
    requests: async ({ request }) => {
        try {
            let authorId = new URL(request.url).searchParams.get("authorId");
            let client = await clientPromise;
            let requestsCollection = client.db(DB_NAME).collection("requests");

            let requests = await requestsCollection
                .aggregate([
                    ...(authorId ? [{ $match: { "author._id": new ObjectId(authorId) } }] : []),
                    {
                        $addFields: {
                            "author.id": "$author._id",
                            id: "$_id",
                        },
                    },
                ])
                .project({ _id: 0, "author._id": 0 })
                .toArray();

            return Result.successResponse({
                data: {
                    count: requests.length,
                    data: requests,
                },
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

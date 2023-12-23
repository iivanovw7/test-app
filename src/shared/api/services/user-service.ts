import type { TBasicApiResult, QueryUserCount, QueryUserModel } from "#/api";
import type { APIRoute } from "astro";

import { HttpStatus } from "#/http";
import { ErrorCode } from "#/api";
import { jwtVerify } from "jose";

import { ACCESS_TOKEN_SECRET, ACCESS_TOKEN_KEY, cleanTokens, DB_NAME, Result } from "../utils";
import clientPromise from "../mongodb";

export type TQueryUserCountResult = TBasicApiResult<QueryUserCount>;

export class UserService {
    public getMe: APIRoute = async ({ request, cookies }) => {
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
                data: { id: _id, ...restUser },
            });
        } catch (error) {
            cleanTokens(cookies);

            return Result.errorResponse(HttpStatus.UNAUTHORIZED, {
                code: ErrorCode.UNAUTHORIZED,
                message: "Unauthorized",
                error,
            });
        }
    };

    public count: APIRoute = async () => {
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
    };
}

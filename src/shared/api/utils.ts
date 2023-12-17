import type { TBasicApiResult, TBasicApiError } from "#/api";
import type { AstroCookies } from "astro";

import { HttpStatus } from "#/http";
import { ErrorCode } from "#/api";

import { SECONDS_IN_MINUTE, SECONDS_IN_DAY } from "../utils";

export const resultSuccess = <T>(fields?: TSuccessFields<T>): TBasicApiResult<T> => ({
    message: "Ok",
    success: true,
    data: null,
    ...fields,
});

export const resultError = (fields?: TErrorFields) => ({
    code: ErrorCode.INTERNAL_SERVER_ERROR,
    message: "Server error",
    success: false,
    data: null,
    ...fields,
});

export type TSuccessFields<T> = Partial<Pick<TBasicApiResult<T>, "message" | "data">>;
export type TErrorFields = Partial<Pick<TBasicApiError, "message" | "error" | "code">>;

/**
 *  Represents data constructor.
 */
export const Result = {
    /**
     * Success server http response.
     * @returns {Response} response - http response.
     */
    successResponse: <Data>(fields?: TSuccessFields<Data>) => {
        return new Response(JSON.stringify(Result.success(fields)), {
            status: HttpStatus.OK,
        });
    },

    /**
     * Error server http response.
     * @returns {Response} response - http response.
     */
    errorResponse: (status: HttpStatus, fields?: TErrorFields) => {
        return new Response(JSON.stringify(Result.error(fields)), { status });
    },

    /**
     * Successful server response result.
     * @returns {Object} response - response data.
     */
    success: <Data>(fields?: TSuccessFields<Data>): TBasicApiResult<Data> => {
        return resultSuccess(fields);
    },

    /**
     * Server error.
     * @returns {Object} response - response data.
     */
    error: (fields?: TErrorFields): TBasicApiError => {
        return resultError(fields);
    },
};

export const cleanTokens = (cookies: AstroCookies) => {
    cookies.set(ACCESS_TOKEN_KEY, "", {
        sameSite: "none",
        httpOnly: true,
        secure: true,
        maxAge: 0,
        path: "/",
    });

    cookies.set(REFRESH_TOKEN_KEY, "", {
        sameSite: "none",
        httpOnly: true,
        secure: true,
        maxAge: 0,
        path: "/",
    });
};

export const DB_NAME = import.meta.env.DB_NAME as string;

export const ACCESS_TOKEN_KEY = "Bearer";
export const REFRESH_TOKEN_KEY = "Authorization";

export const ACCESS_TOKEN_SECRET = new TextEncoder().encode(import.meta.env.ACCESS_TOKEN_SECRET as string);
export const REFRESH_TOKEN_SECRET = new TextEncoder().encode(import.meta.env.REFRESH_TOKEN_SECRET as string);

export const REFRESH_TOKEN_MAX_AGE: Seconds = SECONDS_IN_DAY;
export const ACCESS_TOKEN_MAX_AGE: Seconds = SECONDS_IN_MINUTE * 20;

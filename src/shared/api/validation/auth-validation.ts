import type { APIContext, MiddlewareNext } from "astro";

import { clone, hasValues, validateLoginData, validateSignupData } from "@/shared/utils";
import { ErrorCode } from "#/api";
import { HttpStatus } from "#/http";

import { Result } from "../utils";

export const AuthValidation = {
    login: async (context: APIContext, next: MiddlewareNext) => {
        let { request } = context;

        if (request.method === "POST") {
            try {
                let body = await clone(context.request).json();
                let validationResult = validateLoginData(body);

                if (hasValues(validationResult)) {
                    return Result.errorResponse(HttpStatus.BAD_REQUEST, {
                        code: ErrorCode.VALIDATION_ERROR,
                        error: validationResult,
                        message: "Validation error",
                    });
                }
            } catch (error) {
                return Result.errorResponse(HttpStatus.BAD_REQUEST, {
                    code: ErrorCode.VALIDATION_ERROR,
                    error,
                    message: "Validation error",
                });
            }
        }

        return next();
    },
    signup: async (context: APIContext, next: MiddlewareNext) => {
        let { request } = context;

        if (request.method === "POST") {
            try {
                let body = await clone(context.request).json();
                let validationResult = validateSignupData(body);

                if (hasValues(validationResult)) {
                    return Result.errorResponse(HttpStatus.BAD_REQUEST, {
                        code: ErrorCode.VALIDATION_ERROR,
                        error: validationResult,
                        message: "Validation error",
                    });
                }
            } catch (error) {
                return Result.errorResponse(HttpStatus.BAD_REQUEST, {
                    code: ErrorCode.VALIDATION_ERROR,
                    error,
                    message: "Validation error",
                });
            }
        }

        return next();
    },
    updateMe: async (context: APIContext, next: MiddlewareNext) => {
        let { request } = context;

        if (request.method === "PATCH") {
            try {
                let body = await clone(context.request).json();
                let validationResult = validateSignupData(body);

                if (hasValues(validationResult)) {
                    return Result.errorResponse(HttpStatus.BAD_REQUEST, {
                        code: ErrorCode.VALIDATION_ERROR,
                        error: validationResult,
                        message: "Validation error",
                    });
                }
            } catch (error) {
                return Result.errorResponse(HttpStatus.BAD_REQUEST, {
                    code: ErrorCode.VALIDATION_ERROR,
                    error,
                    message: "Validation error",
                });
            }
        }

        return next();
    },
};

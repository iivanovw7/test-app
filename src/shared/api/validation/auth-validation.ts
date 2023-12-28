import type { MiddlewareNext, APIContext } from "astro";

import { validateSignupData, validateLoginData, hasValues, clone } from "@/shared/utils";
import { HttpStatus } from "#/http";
import { ErrorCode } from "#/api";

import { Result } from "../utils";

export const AuthValidation = {
    signup: async (context: APIContext, next: MiddlewareNext) => {
        let { request } = context;

        if (request.method === "POST") {
            try {
                let body = await clone(context.request).json();
                let validationResult = validateSignupData(body);

                if (hasValues(validationResult)) {
                    return Result.errorResponse(HttpStatus.BAD_REQUEST, {
                        code: ErrorCode.VALIDATION_ERROR,
                        message: "Validation error",
                        error: validationResult,
                    });
                }
            } catch (error) {
                return Result.errorResponse(HttpStatus.BAD_REQUEST, {
                    code: ErrorCode.VALIDATION_ERROR,
                    message: "Validation error",
                    error,
                });
            }
        }

        return next();
    },
    login: async (context: APIContext, next: MiddlewareNext) => {
        let { request } = context;

        if (request.method === "POST") {
            try {
                let body = await clone(context.request).json();
                let validationResult = validateLoginData(body);

                if (hasValues(validationResult)) {
                    return Result.errorResponse(HttpStatus.BAD_REQUEST, {
                        code: ErrorCode.VALIDATION_ERROR,
                        message: "Validation error",
                        error: validationResult,
                    });
                }
            } catch (error) {
                return Result.errorResponse(HttpStatus.BAD_REQUEST, {
                    code: ErrorCode.VALIDATION_ERROR,
                    message: "Validation error",
                    error,
                });
            }
        }

        return next();
    },
};

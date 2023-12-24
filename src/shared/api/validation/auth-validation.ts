/* eslint-disable camelcase */
import type { MiddlewareNext, APIContext } from "astro";
import type { LoginData } from "#/api";

import { validateSchema, hasValues, clone, z } from "@/shared/utils";
import { HttpStatus } from "#/http";
import { ErrorCode } from "#/api";

import { Result } from "../utils";

export const loginDataValidationSchema = z.object({
    password: z.string({ required_error: "Password is required" }).min(1, { message: "Password is required" }).trim(),
    email: z.string({ required_error: "Invalid email" }).trim().email({
        message: "Invalid email",
    }),
});

export const validateLoginData = (data: LoginData) => {
    return validateSchema<LoginData, string>(data, loginDataValidationSchema, "Validation error");
};

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

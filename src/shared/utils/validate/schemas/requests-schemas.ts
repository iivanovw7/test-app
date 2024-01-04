/* eslint-disable camelcase */
import type { CreateRequestData } from "#/api";

import { validateField, validateSchema, z } from "../utils";

export const requestDataValidationSchema = z.object({
    avatarUrl: z.string({ required_error: "Invalid avatar URL" }).trim(),
    description: z
        .string({ required_error: "Description is required" })
        .max(180, { message: "Description length must be at most 60 characters long" })
        .trim(),
    endsAt: z.string({ required_error: "End date is required" }).min(1, { message: "End date is required" }),
    startsAt: z.string({ required_error: "Start date is required" }).min(1, { message: "Start date is required" }),
    title: z
        .string({ required_error: "Title is required" })
        .min(4, { message: "Title length must be at least 3 characters long" })
        .max(60, { message: "Title length must be at most 60 characters long" })
        .trim(),
});

export const validateRequestDataField = <Key extends keyof CreateRequestData>(
    key: Key,
    value: CreateRequestData[Key],
) => {
    let schema = requestDataValidationSchema.pick({ [key]: true });

    return validateField({ [key]: value }, schema, "Validation error");
};

export const validateRequestData = (data: CreateRequestData) => {
    return validateSchema<CreateRequestData, string>(data, requestDataValidationSchema, "Validation error");
};

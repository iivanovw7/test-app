/* eslint-disable camelcase */
import type { LoginData, UserSignupData } from "#/api";

import { CountryMap } from "../contry-map";
import { PhoneValidatorPattern, PostalCodeValidatorPattern, validateField, validateSchema, z } from "../utils";

export const loginDataValidationSchema = z.object({
    email: z.string({ required_error: "Invalid email" }).trim().email({
        message: "Invalid email",
    }),
    password: z
        .string({ required_error: "Password is required" })
        .min(4, { message: "Password length must be at least 4 characters long" })
        .max(60, { message: "Password length must be at most 60 characters long" })
        .trim(),
});

export const validateLoginDataField = <Key extends keyof LoginData>(key: Key, value: LoginData[Key]) => {
    let schema = loginDataValidationSchema.pick({ [key]: true });

    return validateField({ [key]: value }, schema, "Validation error");
};

export const validateLoginData = (data: LoginData) => {
    return validateSchema<LoginData, string>(data, loginDataValidationSchema, "Validation error");
};

export const getAddressValidationSchema = (code: CountryMap) => {
    return z.object({
        phone: z
            .string({ required_error: "Phone is required" })
            .regex(PhoneValidatorPattern[code], { message: "Invalid phone" })
            .trim(),
        telegram: z.string({}),
        whatsapp: z.string({}),
    });
};

export const getContactValidationSchema = (code: CountryMap) => {
    return z.object({
        apartment: z
            .string({ required_error: "Apartment is required" })
            .min(1, { message: "Apartment length must be at least 1 character long" })
            .trim(),
        building: z.string({}),
        city: z.string({}),
        country: z.string({}),
        postalCode: z
            .string({ required_error: "Postal code is required" })
            .regex(PostalCodeValidatorPattern[code], { message: "Invalid postal code" })
            .trim(),
        street: z.string({}),
    });
};

export const getSignupDataValidationSchema = (country?: string) => {
    let code = (country && CountryMap[country]) || CountryMap.RUSSIA;

    let userSchema = loginDataValidationSchema.extend({
        firstName: z
            .string({ required_error: "Name is required" })
            .min(2, { message: "Name length must be at least 2 characters long" })
            .max(60, { message: "Name length must be at most 60 characters long" })
            .trim(),
        lastName: z
            .string({ required_error: "Last name must be a string" })
            .max(60, { message: "Name length must be at most 60 characters long" })
            .trim(),
    });

    return userSchema.merge(getAddressValidationSchema(code)).merge(getContactValidationSchema(code));
};

export const validateSignupData = (data: UserSignupData) => {
    return validateSchema<UserSignupData, string>(
        data,
        getSignupDataValidationSchema(data.country),
        "Validation error",
    );
};

export const validateSignupDataField = <Key extends keyof UserSignupData>(
    key: Key,
    value: UserSignupData,
    country?: CountryMap,
) => {
    let code = (country && CountryMap[country]) || CountryMap.RUSSIA;
    let schema = getSignupDataValidationSchema(code).pick({ [key]: true });

    return validateField({ [key]: value }, schema, "Validation error");
};

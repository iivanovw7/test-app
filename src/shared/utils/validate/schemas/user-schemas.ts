/* eslint-disable camelcase */
import type { UserUpdateData } from "#/api";

import { PostalCodeValidatorPattern, PhoneValidatorPattern, validateSchema, validateField, z } from "../utils";
import { CountryMap } from "../contry-map";

export const profileFormSchema = z.object({
    firstName: z
        .string({ required_error: "Name is required" })
        .min(2, { message: "Name length must be at least 2 characters long" })
        .max(60, { message: "Name length must be at most 60 characters long" })
        .trim(),
    lastName: z
        .string({ required_error: "Last name must be a string" })
        .max(60, { message: "Last name length must be at most 60 characters long" })
        .trim(),
});

export const validateProfileData = (data: UserUpdateData) => {
    return validateSchema<UserUpdateData, string>(data, profileFormSchema, "Validation error");
};

export const validateProfileDataField = <Key extends keyof UserUpdateData>(key: Key, value: UserUpdateData) => {
    let schema = profileFormSchema.pick({ [key]: true });

    return validateField({ [key]: value }, schema, "Validation error");
};

export const getProfileContactsValidationSchema = (code: CountryMap) => {
    return z.object({
        postalCode: z
            .string({ required_error: "Postal code is required" })
            .regex(PostalCodeValidatorPattern[code], { message: "Invalid postal code" })
            .trim(),
        apartment: z
            .string({ required_error: "Apartment is required" })
            .min(1, { message: "Apartment length must be at least 1 character long" })
            .trim(),
        phone: z
            .string({ required_error: "Phone is required" })
            .regex(PhoneValidatorPattern[code], { message: "Invalid phone" })
            .trim(),
        telegram: z.string({}),
        whatsapp: z.string({}),
        building: z.string({}),
        country: z.string({}),
        street: z.string({}),
        city: z.string({}),
    });
};

export const validateProfileContactsData = (data: UserUpdateData) => {
    return validateSchema<UserUpdateData, string>(
        data,
        getProfileContactsValidationSchema(data.country || CountryMap.RUSSIA),
        "Validation error",
    );
};

export const validateProfileContactsDataField = <Key extends keyof UserUpdateData>(
    key: Key,
    value: UserUpdateData,
    country?: CountryMap,
) => {
    let code = (country && CountryMap[country]) || CountryMap.RUSSIA;
    let schema = getProfileContactsValidationSchema(code).pick({ [key]: true });

    return validateField({ [key]: value }, schema, "Validation error");
};

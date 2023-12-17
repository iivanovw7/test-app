/* eslint-disable @typescript-eslint/no-explicit-any */

import type { ZodSchema } from "zod";

export { ZodTransformer, ZodSchema, z } from "zod";

export const validateField = <Value = any, Message = string>(
    value: Value,
    schema: ZodSchema,
    fallback: Message,
): Nullable<Message> => {
    try {
        schema.parse(value);

        return null;
    } catch (error) {
        let issue = error?.issues[0];

        return issue?.message || fallback;
    }
};

export type TValidationSchemaResult<Data = AnyObject, Message = string> = Record<keyof Data, Message>;

export const validateSchema = <Data = AnyObject, Message = string>(
    data: Data,
    schema: ZodSchema,
    fallback: Message,
): TValidationSchemaResult<Data, Message> => {
    let keys = Object.keys(data as object);

    let result: TValidationSchemaResult<Data, Message> = keys.reduce(
        (previous, current) => {
            previous[current] = null;

            return previous;
        },
        {} as TValidationSchemaResult<Data, Message>,
    );

    try {
        schema.parse(data);

        return result;
    } catch (error) {
        for (let issue of error.issues) {
            let key = issue?.path?.[0];

            if (key in result) {
                result[key] = (issue.message as Message) || fallback;
            }
        }

        return result;
    }
};

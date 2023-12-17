import type { ValidateField, FieldValue } from "#/forms";
import type { QRL } from "@builder.io/qwik";
import type { ZodType } from "zod";

import { implicit$FirstArg, $ } from "@builder.io/qwik";

import { getParsedZodSchema } from "../utils";

export const zodFieldQrl = <TFieldValue extends FieldValue>(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    schema: QRL<MaybeFunction<ZodType<any, any, TFieldValue>>>,
): QRL<ValidateField<TFieldValue>> => {
    return $(async (value: Maybe<TFieldValue>) => {
        let result = await getParsedZodSchema(schema, value);
        return result.success ? "" : result.error.issues[0].message;
    });
};

/**
 * Creates a validation functions that parses the Zod schema of a field.
 *
 * @param schema A Zod schema.
 *
 * @returns A validation function.
 */
export const zodField$ = implicit$FirstArg(zodFieldQrl);

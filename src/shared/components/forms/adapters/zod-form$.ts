import type { PartialValues, ValidateForm, FieldValues, FormErrors } from "#/forms";
import type { QRL } from "@builder.io/qwik";
import type { ZodType } from "zod";

import { implicit$FirstArg, $ } from "@builder.io/qwik";

import { getParsedZodSchema } from "../utils";

export const zodFormQrl = <TFieldValues extends FieldValues>(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    schema: QRL<MaybeFunction<ZodType<any, any, TFieldValues>>>,
): QRL<ValidateForm<TFieldValues>> => {
    return $(async (values: PartialValues<TFieldValues>) => {
        let result = await getParsedZodSchema(schema, values);

        return result.success
            ? {}
            : // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (result.error.issues.reduce<any>((errors, error) => {
                  let path = error.path.join(".");
                  if (!errors[path]) {
                      errors[path] = error.message;
                  }
                  return errors;
              }, {}) as FormErrors<TFieldValues>);
    }) as QRL<ValidateForm<TFieldValues>>;
};

/**
 * Creates a validation functions that parses the Zod schema of a form.
 *
 * @param schema A Zod schema.
 *
 * @returns A validation function.
 */
export const zodForm$ = implicit$FirstArg(zodFormQrl);

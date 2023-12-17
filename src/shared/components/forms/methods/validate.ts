/* eslint-disable consistent-return */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable jsdoc/require-jsdoc */
import type { FieldArrayPath, ResponseData, FieldValues, FormErrors, FormStore, FieldPath } from "#/forms";

import {
    getFieldArrayStore,
    updateFormInvalid,
    getFilteredNames,
    setErrorResponse,
    getFieldStore,
    getUniqueId,
    getOptions,
} from "../utils";
import { getValues } from "./get";
import { focus } from "./focus";

export type ValidateOptions = Partial<{
    shouldActive: boolean;
    shouldFocus: boolean;
}>;

export async function validate<TFieldValues extends FieldValues, TResponseData extends ResponseData>(
    form: FormStore<TFieldValues, TResponseData>,
    options?: Maybe<ValidateOptions>,
): Promise<boolean>;

export async function validate<TFieldValues extends FieldValues, TResponseData extends ResponseData>(
    form: FormStore<TFieldValues, TResponseData>,
    name: FieldArrayPath<TFieldValues> | FieldPath<TFieldValues>,
    options?: Maybe<ValidateOptions>,
): Promise<boolean>;

export async function validate<TFieldValues extends FieldValues, TResponseData extends ResponseData>(
    form: FormStore<TFieldValues, TResponseData>,
    // eslint-disable-next-line @typescript-eslint/unified-signatures
    names: (FieldArrayPath<TFieldValues> | FieldPath<TFieldValues>)[],
    options?: Maybe<ValidateOptions>,
): Promise<boolean>;

export async function validate<TFieldValues extends FieldValues, TResponseData extends ResponseData>(
    form: FormStore<TFieldValues, TResponseData>,
    argument2?: Maybe<
        | (FieldArrayPath<TFieldValues> | FieldPath<TFieldValues>)[]
        | FieldArrayPath<TFieldValues>
        | FieldPath<TFieldValues>
        | ValidateOptions
    >,
    argument3?: Maybe<ValidateOptions>,
): Promise<boolean> {
    let [fieldNames, fieldArrayNames] = getFilteredNames(form, argument2);
    let { shouldActive = true, shouldFocus = true } = getOptions(argument2, argument3);
    let validator = getUniqueId();
    form.internal.validators.push(validator);
    form.validating = true;

    let formErrors: FormErrors<TFieldValues> = form.internal.validate
        ? await form.internal.validate(getValues(form, { shouldActive }))
        : {};

    let valid = typeof argument2 !== "string" && !Array.isArray(argument2) ? !Object.keys(formErrors).length : true;

    let [errorFields] = await Promise.all([
        Promise.all(
            fieldNames.map(async (name) => {
                let field = getFieldStore(form, name)!;

                if (!shouldActive || field.active) {
                    let localError: undefined | string;

                    for (let validation of field.internal.validate) {
                        localError = await validation(field.value);

                        if (localError) {
                            break;
                        }
                    }

                    let fieldError = localError || formErrors[name] || "";

                    if (fieldError) {
                        valid = false;
                    }

                    field.error = fieldError;

                    return fieldError ? name : null;
                }
            }),
        ),

        Promise.all(
            fieldArrayNames.map(async (name) => {
                let fieldArray = getFieldArrayStore(form, name)!;

                if (!shouldActive || fieldArray.active) {
                    let localError = "";

                    for (let validation of fieldArray.internal.validate) {
                        localError = await validation(fieldArray.items);

                        if (localError) {
                            break;
                        }
                    }

                    let fieldArrayError = localError || formErrors[name] || "";

                    if (fieldArrayError) {
                        valid = false;
                    }

                    fieldArray.error = fieldArrayError;
                }
            }),
        ),
    ]);

    setErrorResponse(form, formErrors, { shouldActive });

    if (shouldFocus) {
        let name = errorFields.find((fieldName) => fieldName);
        if (name) {
            focus(form, name);
        }
    }

    updateFormInvalid(form, !valid);
    form.internal.validators.splice(form.internal.validators.indexOf(validator), 1);

    if (!form.internal.validators.length) {
        form.validating = false;
    }

    return valid;
}

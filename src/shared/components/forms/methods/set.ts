/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable jsdoc/require-jsdoc */
import type {
    FieldArrayPathValue,
    FieldArrayPath,
    FieldPathValue,
    PartialValues,
    ResponseData,
    FormResponse,
    FieldValues,
    FieldPath,
    FormStore,
} from "#/forms";

import {
    initializeFieldArrayStore,
    initializeFieldStore,
    getFieldArrayStore,
    validateIfRequired,
    updateFormInvalid,
    updateFieldDirty,
    getFieldStore,
    getUniqueId,
} from "../utils";
import { validate } from "./validate";
import { focus } from "./focus";

export type SetErrorOptions = Partial<{
    shouldTouched: boolean;
    shouldActive: boolean;
    shouldDirty: boolean;
    shouldFocus: boolean;
}>;

export const setError = <TFieldValues extends FieldValues, TResponseData extends ResponseData>(
    form: FormStore<TFieldValues, TResponseData>,
    name: FieldArrayPath<TFieldValues> | FieldPath<TFieldValues>,
    error: string,
    {
        shouldTouched = false,
        shouldFocus = !!error,
        shouldActive = true,
        shouldDirty = false,
    }: Maybe<SetErrorOptions> = {},
): void => {
    for (let fieldOrFieldArray of [
        getFieldStore(form, name as FieldPath<TFieldValues>),
        getFieldArrayStore(form, name as FieldArrayPath<TFieldValues>),
    ]) {
        if (
            fieldOrFieldArray &&
            (!shouldActive || fieldOrFieldArray.active) &&
            (!shouldTouched || fieldOrFieldArray.touched) &&
            (!shouldDirty || fieldOrFieldArray.dirty)
        ) {
            fieldOrFieldArray.error = error;

            if (error && "value" in fieldOrFieldArray && shouldFocus) {
                focus(form, name as FieldPath<TFieldValues>);
            }
        }
    }

    updateFormInvalid(form, !!error);
};

export type SetResponseOptions = Partial<{
    duration: number;
}>;

export const setResponse = <TFieldValues extends FieldValues, TResponseData extends ResponseData>(
    form: FormStore<TFieldValues, TResponseData>,
    response: FormResponse<TResponseData>,
    { duration }: Maybe<SetResponseOptions> = {},
): void => {
    form.response = response;

    if (duration) {
        setTimeout(() => {
            if (form.response === response) {
                form.response = {};
            }
        }, duration);
    }
};

export type SetValueOptions = Partial<{
    shouldValidate: boolean;
    shouldTouched: boolean;
    shouldDirty: boolean;
    shouldFocus: boolean;
}>;

export const setValue = <
    TFieldValues extends FieldValues,
    TResponseData extends ResponseData,
    TFieldName extends FieldPath<TFieldValues>,
>(
    form: FormStore<TFieldValues, TResponseData>,
    name: TFieldName,
    value: FieldPathValue<TFieldValues, TFieldName>,
    {
        shouldValidate = true,
        shouldTouched = true,
        shouldDirty = true,
        shouldFocus = true,
    }: Maybe<SetValueOptions> = {},
): void => {
    let field = initializeFieldStore(form, name);

    // @ts-ignore
    field.value = value;

    if (shouldTouched) {
        field.touched = true;
        form.touched = true;
    }

    if (shouldDirty) {
        updateFieldDirty(form, field);
    }

    if (shouldValidate) {
        validateIfRequired(form, field, name, {
            on: ["touched", "input"],
            shouldFocus,
        });
    }
};

export type SetValuesOptions = Partial<{
    shouldValidate: boolean;
    shouldTouched: boolean;
    shouldDirty: boolean;
    shouldFocus: boolean;
}>;

export function setValues<TFieldValues extends FieldValues, TResponseData extends ResponseData>(
    form: FormStore<TFieldValues, TResponseData>,
    values: PartialValues<TFieldValues>,
    options?: Maybe<SetValuesOptions>,
): void;

export function setValues<
    TFieldValues extends FieldValues,
    TResponseData extends ResponseData,
    TFieldArrayName extends FieldArrayPath<TFieldValues>,
>(
    form: FormStore<TFieldValues, TResponseData>,
    name: TFieldArrayName,
    values: FieldArrayPathValue<TFieldValues, TFieldArrayName>,
    options?: Maybe<SetValuesOptions>,
): void;

export function setValues<
    TFieldValues extends FieldValues,
    TResponseData extends ResponseData,
    TFieldArrayName extends FieldArrayPath<TFieldValues>,
>(
    form: FormStore<TFieldValues, TResponseData>,
    argument2: PartialValues<TFieldValues> | TFieldArrayName,
    argument3?: Maybe<FieldArrayPathValue<TFieldValues, TFieldArrayName> | SetValuesOptions>,
    argument4?: Maybe<SetValuesOptions>,
): void {
    let isFieldArray = typeof argument2 === "string";
    let values = isFieldArray ? argument3 : argument2;
    let options = ((isFieldArray ? argument4 : argument3) || {}) as SetValuesOptions;
    let { shouldValidate = true, shouldTouched = true, shouldDirty = true, shouldFocus = true } = options;

    // @ts-ignore
    let names: (FieldArrayPath<TFieldValues> | FieldPath<TFieldValues>)[] = isFieldArray ? [argument2] : [];

    let setFieldArrayItems = (name: FieldArrayPath<TFieldValues>, value: any[]) => {
        let fieldArray = initializeFieldArrayStore(form, name);

        fieldArray.items = value.map(() => getUniqueId());

        if (shouldTouched) {
            fieldArray.touched = true;
            form.touched = true;
        }

        if (shouldDirty) {
            fieldArray.dirty = true;
            form.dirty = true;
        }
    };

    let setNestedValues = (data: object, previousPath?: string) =>
        Object.entries(data).forEach(([path, value]) => {
            let compoundPath = previousPath ? `${previousPath}.${path}` : path;

            if (!value || typeof value !== "object" || Array.isArray(value)) {
                setValue(form, compoundPath as FieldPath<TFieldValues>, value, {
                    ...options,
                    shouldValidate: false,
                });

                names.push(compoundPath as FieldArrayPath<TFieldValues> | FieldPath<TFieldValues>);
            }

            if (Array.isArray(value)) {
                setFieldArrayItems(compoundPath as FieldArrayPath<TFieldValues>, value);
            }

            if (value && typeof value === "object") {
                setNestedValues(value, compoundPath);
            }
        });

    if (isFieldArray) {
        setFieldArrayItems(
            argument2 as TFieldArrayName,
            argument3 as FieldArrayPathValue<TFieldValues, TFieldArrayName>,
        );
    }

    // @ts-ignore
    setNestedValues(values, isFieldArray ? argument2 : undefined);

    if (
        shouldValidate &&
        ["touched", "input"].includes(
            form.internal.validateOn === "submit" && form.submitted
                ? form.internal.revalidateOn
                : form.internal.validateOn,
        )
    ) {
        validate(form, names, { shouldFocus });
    }
}

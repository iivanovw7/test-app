import type {
    FieldArrayPathValue,
    FieldArrayPath,
    FieldPathValue,
    PartialValues,
    ResponseData,
    FieldValues,
    FormErrors,
    FieldPath,
    FormStore,
} from "#/forms";

import { getFieldArrayStore, getFilteredNames, getFieldStore, getOptions } from "../utils";

export type GetErrorOptions = Partial<{
    shouldTouched: boolean;
    shouldActive: boolean;
    shouldDirty: boolean;
}>;

export const getError = <TFieldValues extends FieldValues, TResponseData extends ResponseData>(
    form: FormStore<TFieldValues, TResponseData>,
    name: FieldArrayPath<TFieldValues> | FieldPath<TFieldValues>,
    { shouldTouched = false, shouldActive = true, shouldDirty = false }: Maybe<GetErrorOptions> = {},
): undefined | string => {
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
            return fieldOrFieldArray.error;
        }
    }

    return undefined;
};

export type GetErrorsOptions = Partial<{
    shouldTouched: boolean;
    shouldActive: boolean;
    shouldDirty: boolean;
}>;

export function getErrors<TFieldValues extends FieldValues, TResponseData extends ResponseData>(
    form: FormStore<TFieldValues, TResponseData>,
    options?: Maybe<GetErrorsOptions>,
): FormErrors<TFieldValues>;

export function getErrors<
    TFieldValues extends FieldValues,
    TResponseData extends ResponseData,
    TFieldArrayName extends FieldArrayPath<TFieldValues>,
>(
    form: FormStore<TFieldValues, TResponseData>,
    name: TFieldArrayName,
    options?: Maybe<GetErrorsOptions>,
): FormErrors<TFieldValues>;

export function getErrors<TFieldValues extends FieldValues, TResponseData extends ResponseData>(
    form: FormStore<TFieldValues, TResponseData>,
    names: (FieldArrayPath<TFieldValues> | FieldPath<TFieldValues>)[],
    options?: Maybe<GetErrorsOptions>,
): FormErrors<TFieldValues>;

// eslint-disable-next-line jsdoc/require-jsdoc, prefer-arrow/prefer-arrow-functions
export function getErrors<TFieldValues extends FieldValues, TResponseData extends ResponseData>(
    form: FormStore<TFieldValues, TResponseData>,
    argument2?: Maybe<
        (FieldArrayPath<TFieldValues> | FieldPath<TFieldValues>)[] | FieldArrayPath<TFieldValues> | GetErrorsOptions
    >,
    argument3?: Maybe<GetErrorsOptions>,
): FormErrors<TFieldValues> {
    let [fieldNames, fieldArrayNames] = getFilteredNames(form, argument2);

    let { shouldTouched = false, shouldActive = true, shouldDirty = false } = getOptions(argument2, argument3);

    return [
        ...fieldNames.map((name) => [name, getFieldStore(form, name)!] as const),
        ...fieldArrayNames.map((name) => [name, getFieldArrayStore(form, name)!] as const),
    ].reduce<FormErrors<TFieldValues>>((formErrors, [name, fieldOrFieldArray]) => {
        if (
            fieldOrFieldArray.error &&
            (!shouldActive || fieldOrFieldArray.active) &&
            (!shouldTouched || fieldOrFieldArray.touched) &&
            (!shouldDirty || fieldOrFieldArray.dirty)
        ) {
            formErrors[name] = fieldOrFieldArray.error;
        }
        return formErrors;
    }, {});
}

export type GetValueOptions = Partial<{
    shouldTouched: boolean;
    shouldActive: boolean;
    shouldDirty: boolean;
    shouldValid: boolean;
}>;

export const getValue = <
    TFieldValues extends FieldValues,
    TResponseData extends ResponseData,
    TFieldName extends FieldPath<TFieldValues>,
>(
    form: FormStore<TFieldValues, TResponseData>,
    name: TFieldName,
    {
        shouldTouched = false,
        shouldActive = true,
        shouldDirty = false,
        shouldValid = false,
    }: Maybe<GetValueOptions> = {},
): Maybe<FieldPathValue<TFieldValues, TFieldName>> => {
    let field = getFieldStore(form, name);

    if (
        field &&
        (!shouldActive || field.active) &&
        (!shouldTouched || field.touched) &&
        (!shouldDirty || field.dirty) &&
        (!shouldValid || !field.error)
    ) {
        return field.value as Maybe<FieldPathValue<TFieldValues, TFieldName>>;
    }

    return undefined;
};

export type GetValuesOptions = Partial<{
    shouldTouched: boolean;
    shouldActive: boolean;
    shouldDirty: boolean;
    shouldValid: boolean;
}>;

/**
 * Returns the current values of the form fields.
 *
 * @param form The form of the fields.
 * @param options The values options.
 *
 * @returns The form field values.
 */
export function getValues<TFieldValues extends FieldValues, TResponseData extends ResponseData>(
    form: FormStore<TFieldValues, TResponseData>,
    options?: Maybe<GetValuesOptions>,
): PartialValues<TFieldValues>;

/**
 * Returns the values of the specified field array.
 *
 * @param form The form of the field array.
 * @param name The name of the field array.
 * @param options The values options.
 *
 * @returns The field array values.
 */
export function getValues<
    TFieldValues extends FieldValues,
    TResponseData extends ResponseData,
    TFieldArrayName extends FieldArrayPath<TFieldValues>,
>(
    form: FormStore<TFieldValues, TResponseData>,
    name: TFieldArrayName,
    options?: Maybe<GetValuesOptions>,
): PartialValues<FieldArrayPathValue<TFieldValues, TFieldArrayName>>;

export function getValues<TFieldValues extends FieldValues, TResponseData extends ResponseData>(
    form: FormStore<TFieldValues, TResponseData>,
    names: (FieldArrayPath<TFieldValues> | FieldPath<TFieldValues>)[],
    options?: Maybe<GetValuesOptions>,
): PartialValues<TFieldValues>;

// eslint-disable-next-line jsdoc/require-jsdoc, prefer-arrow/prefer-arrow-functions
export function getValues<TFieldValues extends FieldValues, TResponseData extends ResponseData>(
    form: FormStore<TFieldValues, TResponseData>,
    argument2?: Maybe<
        (FieldArrayPath<TFieldValues> | FieldPath<TFieldValues>)[] | FieldArrayPath<TFieldValues> | GetValuesOptions
    >,
    argument3?: Maybe<GetValuesOptions>,
): PartialValues<TFieldValues> {
    let {
        shouldTouched = false,
        shouldActive = true,
        shouldDirty = false,
        shouldValid = false,
    } = getOptions(argument2, argument3);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return getFilteredNames(form, argument2)[0].reduce<any>(
        (values, name) => {
            let field = getFieldStore(form, name)!;

            if (
                (!shouldActive || field.active) &&
                (!shouldTouched || field.touched) &&
                (!shouldDirty || field.dirty) &&
                (!shouldValid || !field.error)
            ) {
                // @ts-ignore
                (typeof argument2 === "string" ? name.replace(`${argument2}.`, "") : name)
                    .split(".")
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    .reduce<any>(
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        (object: { [x: string]: any }, key: string | number, index: number, keys: string | any[]) =>
                            (object[key] =
                                index === keys.length - 1
                                    ? // If it is last key, add value
                                      field.value
                                    : // Otherwise return object or array
                                      (typeof object[key] === "object" && object[key]) ||
                                      (isNaN(+keys[index + 1]) ? {} : [])),
                        values,
                    );
            }

            return values;
        },
        typeof argument2 === "string" ? [] : {},
    );
}

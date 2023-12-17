import type { FieldArrayPath, ResponseData, FieldValues, FieldPath, FormStore } from "#/forms";

import { getFieldArrayStore, getFieldStore } from "../utils";

export type HasFieldOptions = Partial<{
    shouldTouched: boolean;
    shouldActive: boolean;
    shouldDirty: boolean;
    shouldValid: boolean;
}>;

export const hasField = <TFieldValues extends FieldValues, TResponseData extends ResponseData>(
    form: FormStore<TFieldValues, TResponseData>,
    name: FieldPath<TFieldValues>,
    {
        shouldTouched = false,
        shouldActive = true,
        shouldDirty = false,
        shouldValid = false,
    }: Maybe<HasFieldOptions> = {},
): boolean => {
    // Get store of specified field
    let field = getFieldStore(form, name);

    // Return whether field is present and matches filter options
    return (
        !!field &&
        (!shouldActive || field.active) &&
        (!shouldTouched || field.touched) &&
        (!shouldDirty || field.dirty) &&
        (!shouldValid || !field.error)
    );
};

export type HasFieldArrayOptions = Partial<{
    shouldTouched: boolean;
    shouldActive: boolean;
    shouldDirty: boolean;
    shouldValid: boolean;
}>;

export const hasFieldArray = <TFieldValues extends FieldValues, TResponseData extends ResponseData>(
    form: FormStore<TFieldValues, TResponseData>,
    name: FieldArrayPath<TFieldValues>,
    {
        shouldTouched = false,
        shouldActive = true,
        shouldDirty = false,
        shouldValid = false,
    }: Maybe<HasFieldArrayOptions> = {},
): boolean => {
    let fieldArray = getFieldArrayStore(form, name);

    return (
        !!fieldArray &&
        (!shouldActive || fieldArray.active) &&
        (!shouldTouched || fieldArray.touched) &&
        (!shouldDirty || fieldArray.dirty) &&
        (!shouldValid || !fieldArray.error)
    );
};

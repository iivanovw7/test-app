/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable jsdoc/require-jsdoc */
import type {
    FieldArrayPath,
    FieldPathValue,
    InitialValues,
    ResponseData,
    FieldValues,
    FormStore,
    FieldPath,
} from "#/forms";

import {
    getFieldArrayStore,
    getFilteredNames,
    updateFormState,
    getFieldStore,
    getPathValue,
    getUniqueId,
    getOptions,
} from "../utils";

export type ResetOptions<TFieldValues extends FieldValues, TFieldName extends FieldPath<TFieldValues>> = Partial<{
    initialValue: FieldPathValue<TFieldValues, TFieldName>;
    initialValues: InitialValues<TFieldValues>;
    keepSubmitCount: boolean;
    keepDirtyValues: boolean;
    keepDirtyItems: boolean;
    keepSubmitted: boolean;
    keepResponse: boolean;
    keepTouched: boolean;
    keepValues: boolean;
    keepErrors: boolean;
    keepItems: boolean;
    keepDirty: boolean;
}>;

export function reset<TFieldValues extends FieldValues, TResponseData extends ResponseData>(
    form: FormStore<TFieldValues, TResponseData>,
    options?: Maybe<ResetOptions<TFieldValues, FieldPath<TFieldValues>>>,
): void;

export function reset<
    TFieldValues extends FieldValues,
    TResponseData extends ResponseData,
    TFieldName extends FieldPath<TFieldValues>,
>(
    form: FormStore<TFieldValues, TResponseData>,
    name: FieldArrayPath<TFieldValues> | TFieldName,
    options?: Maybe<ResetOptions<TFieldValues, TFieldName>>,
): void;

export function reset<TFieldValues extends FieldValues, TResponseData extends ResponseData>(
    form: FormStore<TFieldValues, TResponseData>,
    names: (FieldArrayPath<TFieldValues> | FieldPath<TFieldValues>)[],
    options?: Maybe<ResetOptions<TFieldValues, FieldPath<TFieldValues>>>,
): void;

export function reset<
    TFieldValues extends FieldValues,
    TResponseData extends ResponseData,
    TFieldName extends FieldPath<TFieldValues>,
>(
    form: FormStore<TFieldValues, TResponseData>,
    argument2?: Maybe<
        | (FieldArrayPath<TFieldValues> | FieldPath<TFieldValues>)[]
        | ResetOptions<TFieldValues, TFieldName>
        | FieldArrayPath<TFieldValues>
        | TFieldName
    >,
    argument3?: Maybe<ResetOptions<TFieldValues, TFieldName>>,
): void {
    let [fieldNames, fieldArrayNames] = getFilteredNames(form, argument2, false);
    let resetSingleField = typeof argument2 === "string" && fieldNames.length === 1;
    let resetEntireForm = !resetSingleField && !Array.isArray(argument2);
    let options = getOptions(argument2, argument3);

    let {
        keepSubmitCount = false,
        keepDirtyValues = false,
        keepDirtyItems = false,
        keepSubmitted = false,
        keepResponse = false,
        keepTouched = false,
        keepValues = false,
        keepErrors = false,
        keepItems = false,
        keepDirty = false,
        initialValues,
        initialValue,
    } = options;

    fieldNames.forEach((name) => {
        let field = getFieldStore(form, name)!;

        if (resetSingleField ? "initialValue" in options : initialValues) {
            // @ts-ignore
            field.internal.initialValue = resetSingleField ? initialValue : getPathValue(name, initialValues);
        }

        let keepDirtyValue = keepDirtyValues && field.dirty;

        if (!keepValues && !keepDirtyValue) {
            field.internal.startValue = field.internal.initialValue;
            field.value = field.internal.initialValue;

            field.internal.elements.forEach((element: { value: string; type: string }) => {
                if (element.type === "file") {
                    element.value = "";
                }
            });
        }

        if (!keepTouched) {
            field.touched = false;
        }

        if (!keepDirty && !keepValues && !keepDirtyValue) {
            field.dirty = false;
        }

        if (!keepErrors) {
            field.error = "";
        }
    });

    fieldArrayNames.forEach((name) => {
        let fieldArray = getFieldArrayStore(form, name)!;
        let keepCurrentDirtyItems = keepDirtyItems && fieldArray.dirty;

        if (!keepItems && !keepCurrentDirtyItems) {
            if (initialValues) {
                fieldArray.internal.initialItems = getPathValue(name, initialValues)?.map(() => getUniqueId()) || [];
            }
            fieldArray.internal.startItems = [...fieldArray.internal.initialItems];
            fieldArray.items = [...fieldArray.internal.initialItems];
        }

        if (!keepTouched) {
            fieldArray.touched = false;
        }

        if (!keepDirty && !keepItems && !keepCurrentDirtyItems) {
            fieldArray.dirty = false;
        }

        if (!keepErrors) {
            fieldArray.error = "";
        }
    });

    if (resetEntireForm) {
        if (!keepResponse) {
            form.response = {};
        }

        if (!keepSubmitCount) {
            form.submitCount = 0;
        }

        if (!keepSubmitted) {
            form.submitted = false;
        }
    }

    updateFormState(form);
}

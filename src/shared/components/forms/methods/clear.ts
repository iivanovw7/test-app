import type { FieldArrayPath, ResponseData, FieldValues, FieldPath, FormStore } from "#/forms";

import type { SetErrorOptions } from "./set";

import { setError } from "./set";

export const clearError = <TFieldValues extends FieldValues, TResponseData extends ResponseData>(
    form: FormStore<TFieldValues, TResponseData>,
    name: FieldArrayPath<TFieldValues> | FieldPath<TFieldValues>,
    options?: Maybe<SetErrorOptions>,
): void => {
    setError(form, name, "", options);
};

export const clearResponse = <TFieldValues extends FieldValues, TResponseData extends ResponseData>(
    form: FormStore<TFieldValues, TResponseData>,
): void => {
    form.response = {};
};

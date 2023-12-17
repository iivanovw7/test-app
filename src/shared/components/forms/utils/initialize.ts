import type {
    FieldArrayStore,
    FieldArrayPath,
    ResponseData,
    FieldValues,
    FieldStore,
    FormStore,
    FieldPath,
} from "#/forms";

import { getInitialFieldArrayStore, getInitialFieldStore, getFieldArrayStore, getFieldStore } from "./get";

export const initializeFieldArrayStore = <
    TFieldValues extends FieldValues,
    TResponseData extends ResponseData,
    TFieldArrayName extends FieldArrayPath<TFieldValues>,
>(
    form: FormStore<TFieldValues, TResponseData>,
    name: TFieldArrayName,
): FieldArrayStore<TFieldValues, TFieldArrayName> => {
    if (!getFieldArrayStore(form, name)) {
        form.internal.fieldArrays[name] = getInitialFieldArrayStore(name);
    }
    return getFieldArrayStore(form, name) as FieldArrayStore<TFieldValues, TFieldArrayName>;
};

export const initializeFieldStore = <
    TFieldValues extends FieldValues,
    TResponseData extends ResponseData,
    TFieldName extends FieldPath<TFieldValues>,
>(
    form: FormStore<TFieldValues, TResponseData>,
    name: TFieldName,
): FieldStore<TFieldValues, TFieldName> => {
    if (!getFieldStore(form, name)) {
        form.internal.fields[name] = getInitialFieldStore(name);
    }
    return getFieldStore(form, name) as FieldStore<TFieldValues, TFieldName>;
};

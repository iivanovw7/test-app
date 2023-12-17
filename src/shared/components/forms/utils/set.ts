/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-shadow */
import type {
    FieldArrayPathValue,
    RawFieldArrayState,
    FieldArrayPath,
    RawFieldState,
    ResponseData,
    FieldValues,
    FormErrors,
    FieldPath,
    FormStore,
} from "#/forms";

import type { SetResponseOptions, SetErrorOptions } from "../methods";

import { initializeFieldArrayStore, initializeFieldStore } from "./initialize";
import { getFieldArrayStore, getFieldStore, getUniqueId } from "./get";
import { setResponse, setError } from "../methods";

type ErrorResponseOptions = SetResponseOptions &
    Partial<{
        shouldActive: boolean;
    }>;

export const setErrorResponse = <TFieldValues extends FieldValues, TResponseData extends ResponseData>(
    form: FormStore<TFieldValues, TResponseData>,
    formErrors: FormErrors<TFieldValues>,
    { shouldActive = true, duration }: ErrorResponseOptions,
): void => {
    let message = Object.entries<Maybe<string>>(formErrors)
        .reduce<string[]>((errors, [name, error]) => {
            if (
                [
                    getFieldStore(form, name as FieldPath<TFieldValues>),
                    getFieldArrayStore(form, name as FieldArrayPath<TFieldValues>),
                ].every((fieldOrFieldArray) => !fieldOrFieldArray || (shouldActive && !fieldOrFieldArray.active))
            ) {
                errors.push(error!);
            }
            return errors;
        }, [])
        .join(" ");

    if (message) {
        setResponse(form, { status: "error", message }, { duration });
    }
};

export const setFieldArrayState = <
    TFieldValues extends FieldValues,
    TResponseData extends ResponseData,
    TFieldArrayName extends FieldArrayPath<TFieldValues>,
>(
    form: FormStore<TFieldValues, TResponseData>,
    name: TFieldArrayName,
    state: RawFieldArrayState,
): void => {
    let fieldArray = initializeFieldArrayStore(form, name);

    fieldArray.internal.startItems = state.startItems;
    fieldArray.items = state.items;
    fieldArray.error = state.error;
    fieldArray.touched = state.touched;
    fieldArray.dirty = state.dirty;
};

export const setFieldState = <
    TFieldValues extends FieldValues,
    TResponseData extends ResponseData,
    TFieldName extends FieldPath<TFieldValues>,
>(
    form: FormStore<TFieldValues, TResponseData>,
    name: TFieldName,
    state: RawFieldState<TFieldValues, TFieldName>,
): void => {
    let field = initializeFieldStore(form, name);

    field.internal.startValue = state.startValue;
    field.value = state.value;
    field.error = state.error;
    field.touched = state.touched;
    field.dirty = state.dirty;
};

type ValueOptions<TFieldValues extends FieldValues, TFieldArrayName extends FieldArrayPath<TFieldValues>> = {
    value: FieldArrayPathValue<TFieldValues, TFieldArrayName>[number];
    at: number;
};

export const setFieldArrayValue = <
    TFieldValues extends FieldValues,
    TResponseData extends ResponseData,
    TFieldArrayName extends FieldArrayPath<TFieldValues>,
>(
    form: FormStore<TFieldValues, TResponseData>,
    name: TFieldArrayName,
    { at: index, value }: ValueOptions<TFieldValues, TFieldArrayName>,
): void => {
    let updateStores = (previousPath: string, data: object) => {
        Object.entries(data).forEach(([path, value]) => {
            let compoundPath = `${previousPath}.${path}`;

            if (form.internal.fieldArrayPaths?.includes(compoundPath.replaceAll(/.\d+./g, ".$.") as any)) {
                let items = value.map(() => getUniqueId());

                setFieldArrayState(form, compoundPath as FieldArrayPath<TFieldValues>, {
                    startItems: [...items],
                    touched: false,
                    dirty: false,
                    error: "",
                    items,
                });
            } else if (
                !value ||
                typeof value !== "object" ||
                Array.isArray(value) ||
                value instanceof Date ||
                value instanceof Blob
            ) {
                setFieldState(form, compoundPath as FieldPath<TFieldValues>, {
                    startValue: value,
                    touched: false,
                    dirty: false,
                    error: "",
                    value,
                });
            }

            if (value && typeof value === "object") {
                updateStores(compoundPath, value);
            }
        });
    };

    updateStores(name, { [index]: value });
};

export const setFieldErrors = <TFieldValues extends FieldValues, TResponseData extends ResponseData>(
    form: FormStore<TFieldValues, TResponseData>,
    errors: FormErrors<TFieldValues>,
    options: SetErrorOptions,
) => {
    (Object.entries(errors) as [FieldArrayPath<TFieldValues> | FieldPath<TFieldValues>, Maybe<string>][]).forEach(
        ([name, error]) => {
            if (error) {
                setError(form, name, error, {
                    ...options,
                    shouldFocus: false,
                });
            }
        },
    );
};

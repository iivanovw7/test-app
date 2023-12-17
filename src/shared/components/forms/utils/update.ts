import type {
    FieldArrayStore,
    FieldArrayPath,
    ResponseData,
    FieldValues,
    FieldStore,
    FieldValue,
    FieldPath,
    FormStore,
} from "#/forms";

import { isFieldDirty } from "./is-field-dirty";
import { getFieldAndArrayStores } from "./get";

export const updateFieldArrayDirty = <TFieldValues extends FieldValues, TResponseData extends ResponseData>(
    form: FormStore<TFieldValues, TResponseData>,
    fieldArray: FieldArrayStore<TFieldValues, FieldArrayPath<TFieldValues>>,
): void => {
    let dirty = fieldArray.internal.startItems.join() !== fieldArray.items.join();

    if (dirty !== fieldArray.dirty) {
        fieldArray.dirty = dirty;

        updateFormDirty(form, dirty);
    }
};

export const updateFieldDirty = <
    TFieldValues extends FieldValues,
    TResponseData extends ResponseData,
    TFielName extends FieldPath<TFieldValues>,
>(
    form: FormStore<TFieldValues, TResponseData>,
    field: FieldStore<TFieldValues, TFielName>,
): void => {
    let dirty = isFieldDirty(field.internal.startValue as Maybe<FieldValue>, field.value as Maybe<FieldValue>);

    if (dirty !== field.dirty) {
        field.dirty = dirty;

        updateFormDirty(form, dirty);
    }
};

export const updateFormDirty = <TFieldValues extends FieldValues, TResponseData extends ResponseData>(
    form: FormStore<TFieldValues, TResponseData>,
    dirty?: Maybe<boolean>,
): void => {
    form.dirty =
        dirty ||
        getFieldAndArrayStores(form).some((fieldOrFieldArray) => fieldOrFieldArray.active && fieldOrFieldArray.dirty);
};

export const updateFormInvalid = <TFieldValues extends FieldValues, TResponseData extends ResponseData>(
    form: FormStore<TFieldValues, TResponseData>,
    invalid?: Maybe<boolean>,
): void => {
    form.invalid =
        invalid ||
        getFieldAndArrayStores(form).some((fieldOrFieldArray) => fieldOrFieldArray.active && fieldOrFieldArray.error);
};

export const updateFormState = <TFieldValues extends FieldValues, TResponseData extends ResponseData>(
    form: FormStore<TFieldValues, TResponseData>,
): void => {
    let touched = false;
    let dirty = false;
    let invalid = false;

    for (let fieldOrFieldArray of getFieldAndArrayStores(form)) {
        if (fieldOrFieldArray.active) {
            if (fieldOrFieldArray.touched) {
                touched = true;
            }
            if (fieldOrFieldArray.dirty) {
                dirty = true;
            }
            if (fieldOrFieldArray.error) {
                invalid = true;
            }
        }

        if (touched && dirty && invalid) {
            break;
        }
    }

    form.touched = touched;
    form.dirty = dirty;
    form.invalid = invalid;
};

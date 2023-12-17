import type { FieldArrayPathValue, FieldArrayPath, ResponseData, FieldValues, FormStore } from "#/forms";

import { getFieldArrayStore, setFieldArrayValue, getUniqueId } from "../utils";

export type ReplaceOptions<TFieldValues extends FieldValues, TFieldArrayName extends FieldArrayPath<TFieldValues>> = {
    value: FieldArrayPathValue<TFieldValues, TFieldArrayName>[number];
    at: number;
};

export const replace = <
    TFieldValues extends FieldValues,
    TResponseData extends ResponseData,
    TFieldArrayName extends FieldArrayPath<TFieldValues>,
>(
    form: FormStore<TFieldValues, TResponseData>,
    name: TFieldArrayName,
    options: ReplaceOptions<TFieldValues, TFieldArrayName>,
): void => {
    let fieldArray = getFieldArrayStore(form, name);

    if (fieldArray) {
        let { at: index } = options;
        let lastIndex = fieldArray.items.length - 1;

        if (index >= 0 && index <= lastIndex) {
            setFieldArrayValue(form, name, options);

            fieldArray.items[index] = getUniqueId();
            fieldArray.touched = true;
            form.touched = true;
            fieldArray.dirty = true;
            form.dirty = true;
        }
    }
};

import type { FieldArrayPath, ResponseData, FieldValues, FormStore } from "#/forms";

import {
    updateFieldArrayDirty,
    getFieldArrayNames,
    getFieldArrayState,
    getFieldArrayStore,
    setFieldArrayState,
    sortArrayPathIndex,
    validateIfRequired,
    getFieldNames,
    getFieldState,
    setFieldState,
    getPathIndex,
} from "../utils";

export type RemoveOptions = {
    at: number;
};

export const remove = <TFieldValues extends FieldValues, TResponseData extends ResponseData>(
    form: FormStore<TFieldValues, TResponseData>,
    name: FieldArrayPath<TFieldValues>,
    { at: index }: RemoveOptions,
): void => {
    let fieldArray = getFieldArrayStore(form, name);

    if (fieldArray) {
        let lastIndex = fieldArray.items.length - 1;

        if (index >= 0 && index <= lastIndex) {
            let filterName = (value: string) => value.startsWith(`${name}.`) && getPathIndex(name, value) > index;

            let getPreviousIndexName = <T extends string>(
                fieldOrFieldArrayName: T,
                fieldOrFieldArrayIndex: number,
            ): T =>
                fieldOrFieldArrayName.replace(
                    `${name}.${fieldOrFieldArrayIndex}`,
                    `${name}.${fieldOrFieldArrayIndex - 1}`,
                ) as T;

            getFieldNames(form)
                .filter(filterName)
                .sort(sortArrayPathIndex(name))
                .forEach((fieldName) => {
                    setFieldState(
                        form,
                        getPreviousIndexName(fieldName, getPathIndex(name, fieldName)),
                        getFieldState(form, fieldName)!,
                    );
                });

            getFieldArrayNames(form)
                .filter(filterName)
                .sort(sortArrayPathIndex(name))
                .forEach((fieldArrayName) => {
                    setFieldArrayState(
                        form,
                        getPreviousIndexName(fieldArrayName, getPathIndex(name, fieldArrayName)),
                        getFieldArrayState(form, fieldArrayName)!,
                    );
                });

            fieldArray.items.splice(index, 1);
            fieldArray.touched = true;
            form.touched = true;

            updateFieldArrayDirty(form, fieldArray);
            validateIfRequired(form, fieldArray, name, {
                on: ["touched", "input"],
            });
        }
    }
};

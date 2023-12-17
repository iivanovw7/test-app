import type { FieldArrayPathValue, FieldArrayPath, ResponseData, FieldValues, FormStore } from "#/forms";

import {
    getFieldArrayNames,
    getFieldArrayState,
    getFieldArrayStore,
    setFieldArrayState,
    setFieldArrayValue,
    sortArrayPathIndex,
    validateIfRequired,
    getFieldNames,
    getFieldState,
    setFieldState,
    getPathIndex,
    getUniqueId,
} from "../utils";

export type InsertOptions<TFieldValues extends FieldValues, TFieldArrayName extends FieldArrayPath<TFieldValues>> = {
    value: FieldArrayPathValue<TFieldValues, TFieldArrayName>[number];
    at?: Maybe<number>;
};

export const insert = <
    TFieldValues extends FieldValues,
    TResponseData extends ResponseData,
    TFieldArrayName extends FieldArrayPath<TFieldValues>,
>(
    form: FormStore<TFieldValues, TResponseData>,
    name: TFieldArrayName,
    options: InsertOptions<TFieldValues, TFieldArrayName>,
): void => {
    let fieldArray = getFieldArrayStore(form, name);

    if (fieldArray) {
        let arrayLength = fieldArray.items.length;
        let { at: index = arrayLength, value } = options;

        if (index >= 0 && index <= arrayLength) {
            if (index < arrayLength) {
                let filterName = (filterValue: string) => {
                    return filterValue.startsWith(`${name}.`) && getPathIndex(name, filterValue) >= index;
                };

                let getNextIndexName = <T extends string>(
                    fieldOrFieldArrayName: T,
                    fieldOrFieldArrayIndex: number,
                ): T =>
                    fieldOrFieldArrayName.replace(
                        `${name}.${fieldOrFieldArrayIndex}`,
                        `${name}.${fieldOrFieldArrayIndex + 1}`,
                    ) as T;

                getFieldNames(form)
                    .filter(filterName)
                    .sort(sortArrayPathIndex(name))
                    .reverse()
                    .forEach((fieldName) => {
                        setFieldState(
                            form,
                            getNextIndexName(fieldName, getPathIndex(name, fieldName)),
                            getFieldState(form, fieldName)!,
                        );
                    });

                getFieldArrayNames(form)
                    .filter(filterName)
                    .sort(sortArrayPathIndex(name))
                    .reverse()
                    .forEach((fieldArrayName) => {
                        setFieldArrayState(
                            form,
                            getNextIndexName(fieldArrayName, getPathIndex(name, fieldArrayName)),
                            getFieldArrayState(form, fieldArrayName)!,
                        );
                    });
            }

            setFieldArrayValue(form, name, { at: index, value });
            fieldArray.items.splice(index, 0, getUniqueId());
            fieldArray.touched = true;
            form.touched = true;
            fieldArray.dirty = true;
            form.dirty = true;

            setTimeout(
                () =>
                    validateIfRequired(form, fieldArray, name, {
                        on: ["touched", "input"],
                    }),
                250,
            );
        }
    }
};

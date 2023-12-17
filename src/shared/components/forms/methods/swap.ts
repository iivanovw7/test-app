import type {
    RawFieldArrayState,
    FieldArrayPath,
    RawFieldState,
    ResponseData,
    FieldValues,
    FieldPath,
    FormStore,
} from "#/forms";

import {
    updateFieldArrayDirty,
    getFieldArrayNames,
    getFieldArrayState,
    getFieldArrayStore,
    setFieldArrayState,
    getFieldNames,
    getFieldState,
    setFieldState,
    getPathIndex,
} from "../utils";

export type SwapOptions = {
    and: number;
    at: number;
};

export const swap = <
    TFieldValues extends FieldValues,
    TResponseData extends ResponseData,
    TFieldArrayName extends FieldArrayPath<TFieldValues>,
>(
    form: FormStore<TFieldValues, TResponseData>,
    name: TFieldArrayName,
    { and: index2, at: index1 }: SwapOptions,
): void => {
    let fieldArray = getFieldArrayStore(form, name);

    if (fieldArray) {
        let lastIndex = fieldArray.items.length - 1;

        if (index1 >= 0 && index1 <= lastIndex && index2 >= 0 && index2 <= lastIndex && index1 !== index2) {
            let index1Prefix = `${name}.${index1}`;
            let index2Prefix = `${name}.${index2}`;
            let fieldStateMap = new Map<
                FieldPath<TFieldValues>,
                RawFieldState<TFieldValues, FieldPath<TFieldValues>>
            >();
            let fieldArrayStateMap = new Map<FieldArrayPath<TFieldValues>, RawFieldArrayState>();

            let filterName = <T extends string>(value: T) =>
                value.startsWith(`${name}.`) && [index1, index2].includes(getPathIndex(name, value));

            let swapIndex = <T extends string>(value: T): T =>
                (value.startsWith(index1Prefix)
                    ? value.replace(index1Prefix, index2Prefix)
                    : value.replace(index2Prefix, index1Prefix)) as T;

            getFieldNames(form)
                .filter(filterName)
                .forEach((fieldName) => fieldStateMap.set(fieldName, getFieldState(form, fieldName)!));

            fieldStateMap.forEach((fieldState, fieldName) => setFieldState(form, swapIndex(fieldName), fieldState));

            getFieldArrayNames(form)
                .filter(filterName)
                .forEach((fieldArrayName) =>
                    fieldArrayStateMap.set(fieldArrayName, getFieldArrayState(form, fieldArrayName)!),
                );

            fieldArrayStateMap.forEach((fieldArrayState, fieldArrayName) =>
                setFieldArrayState(form, swapIndex(fieldArrayName), fieldArrayState),
            );

            let itemIndex1 = fieldArray.items[index1];
            fieldArray.items[index1] = fieldArray.items[index2];
            fieldArray.items[index2] = itemIndex1;

            fieldArray.touched = true;
            form.touched = true;

            updateFieldArrayDirty(form, fieldArray);
        }
    }
};

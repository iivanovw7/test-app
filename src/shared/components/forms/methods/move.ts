/* eslint-disable consistent-return */
/* eslint-disable jsdoc/require-jsdoc */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
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
    sortArrayPathIndex,
    getFieldNames,
    getFieldState,
    setFieldState,
    getPathIndex,
} from "../utils";

export type MoveOptions = {
    from: number;
    to: number;
};

export function move<TFieldValues extends FieldValues, TResponseData extends ResponseData>(
    form: FormStore<TFieldValues, TResponseData>,
    name: FieldArrayPath<TFieldValues>,
    { from: fromIndex, to: toIndex }: MoveOptions,
): void {
    let fieldArray = getFieldArrayStore(form, name);

    if (fieldArray) {
        let lastIndex = fieldArray.items.length - 1;

        if (fromIndex >= 0 && fromIndex <= lastIndex && toIndex >= 0 && toIndex <= lastIndex && fromIndex !== toIndex) {
            let filterName = (value: string) => {
                if (value.startsWith(name)) {
                    let fieldIndex = getPathIndex(name, value);
                    return (
                        (fieldIndex >= fromIndex && fieldIndex <= toIndex) ||
                        (fieldIndex <= fromIndex && fieldIndex >= toIndex)
                    );
                }
            };

            let getPreviousIndexName = <T extends string>(
                fieldOrFieldArrayName: T,
                fieldOrFieldArrayIndex: number,
            ): T =>
                fieldOrFieldArrayName.replace(
                    `${name}.${fieldOrFieldArrayIndex}`,
                    fromIndex < toIndex
                        ? `${name}.${fieldOrFieldArrayIndex - 1}`
                        : `${name}.${fieldOrFieldArrayIndex + 1}`,
                ) as T;

            let getToIndexName = <T extends string>(fieldOrFieldArrayName: T): T =>
                fieldOrFieldArrayName.replace(`${name}.${fromIndex}`, `${name}.${toIndex}`) as T;

            let fieldNames = getFieldNames(form).filter(filterName).sort(sortArrayPathIndex(name));
            let fieldArrayNames = getFieldArrayNames(form).filter(filterName).sort(sortArrayPathIndex(name));

            if (fromIndex > toIndex) {
                fieldNames.reverse();
                fieldArrayNames.reverse();
            }

            let fieldStateMap = new Map<
                FieldPath<TFieldValues>,
                RawFieldState<TFieldValues, FieldPath<TFieldValues>>
            >();
            let fieldArrayStateMap = new Map<FieldArrayPath<TFieldValues>, RawFieldArrayState>();

            fieldNames.forEach((fieldName) => {
                let fieldState = getFieldState(form, fieldName)!;
                let fieldIndex = getPathIndex(name, fieldName);

                if (fieldIndex === fromIndex) {
                    fieldStateMap.set(fieldName, fieldState);
                } else {
                    setFieldState(form, getPreviousIndexName(fieldName, fieldIndex), fieldState);
                }
            });

            fieldStateMap.forEach((fieldState, fieldName) => {
                setFieldState(form, getToIndexName(fieldName), fieldState);
            });

            fieldArrayNames.forEach((fieldArrayName) => {
                let fieldArrayState = getFieldArrayState(form, fieldArrayName)!;
                let fieldArrayIndex = getPathIndex(name, fieldArrayName);

                if (fieldArrayIndex === fromIndex) {
                    fieldArrayStateMap.set(fieldArrayName, fieldArrayState);
                } else {
                    setFieldArrayState(form, getPreviousIndexName(fieldArrayName, fieldArrayIndex), fieldArrayState);
                }
            });

            fieldArrayStateMap.forEach((fieldArrayState, fieldArrayName) => {
                setFieldArrayState(form, getToIndexName(fieldArrayName), fieldArrayState);
            });

            fieldArray.items.splice(toIndex, 0, fieldArray.items.splice(fromIndex, 1)[0]);
            fieldArray.touched = true;
            form.touched = true;

            updateFieldArrayDirty(form, fieldArray);
        }
    }
}

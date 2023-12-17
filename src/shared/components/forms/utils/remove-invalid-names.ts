import type { FieldArrayPath, ResponseData, FieldValues, FieldPath, FormStore } from "#/forms";

import { getFieldArrayStore, getFieldArrayNames, getPathIndex } from "./get";

export const removeInvalidNames = <TFieldValues extends FieldValues, TResponseData extends ResponseData>(
    form: FormStore<TFieldValues, TResponseData>,
    names: (FieldArrayPath<TFieldValues> | FieldPath<TFieldValues>)[],
) => {
    getFieldArrayNames(form, false).forEach((fieldArrayName) => {
        let lastIndex = getFieldArrayStore(form, fieldArrayName)!.items.length - 1;
        names
            // @ts-ignore
            .filter((name) => name.startsWith(`${fieldArrayName}.`) && getPathIndex(fieldArrayName, name) > lastIndex)
            .forEach((name) => {
                names.splice(names.indexOf(name), 1);
            });
    });
};

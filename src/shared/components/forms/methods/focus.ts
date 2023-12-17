import type { ResponseData, FieldValues, FieldPath, FormStore } from "#/forms";

import { getFieldStore } from "../utils";

export const focus = <TFieldValues extends FieldValues, TResponseData extends ResponseData>(
    form: FormStore<TFieldValues, TResponseData>,
    name: FieldPath<TFieldValues>,
): void => {
    getFieldStore(form, name)?.internal.elements[0]?.focus();
};

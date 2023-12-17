import type {
    FieldPathValue,
    ValidationMode,
    FieldElement,
    ResponseData,
    FieldValues,
    FieldEvent,
    FieldStore,
    FieldPath,
    FormStore,
} from "#/forms";

import { validateIfRequired } from "./validate-if-required";
import { updateFieldDirty } from "./update";

export const handleFieldEvent = async <
    TFieldValues extends FieldValues,
    TResponseData extends ResponseData,
    TFieldName extends FieldPath<TFieldValues>,
>(
    form: FormStore<TFieldValues, TResponseData>,
    field: FieldStore<TFieldValues, TFieldName>,
    name: TFieldName,
    event: FieldEvent,
    element: FieldElement,
    validationModes: Exclude<ValidationMode, "submit">[],
    inputValue?: FieldPathValue<TFieldValues, TFieldName>,
) => {
    if (inputValue !== undefined) {
        // @ts-ignore
        field.value = inputValue;
    }

    for (let transformation of field.internal.transform) {
        field.value = await transformation(field.value, event, element);
    }

    field.touched = true;
    form.touched = true;

    updateFieldDirty(form, field);
    validateIfRequired(form, field, name, { on: validationModes });
};

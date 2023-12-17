import type { ResponseData, FieldValues, FormStore } from "#/forms";

export const submit = <TFieldValues extends FieldValues, TResponseData extends ResponseData>(
    form: FormStore<TFieldValues, TResponseData>,
): void => {
    form.element?.requestSubmit();
};

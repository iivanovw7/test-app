import type {
    FieldArrayStore,
    FieldArrayPath,
    ValidationMode,
    ResponseData,
    FieldValues,
    FieldStore,
    FieldPath,
    FormStore,
} from "#/forms";

import { validate } from "../methods";

type ValidateOptions = {
    on: Exclude<ValidationMode, "submit">[];
    shouldFocus?: Maybe<boolean>;
};

export const validateIfRequired = <
    TFieldValues extends FieldValues,
    TResponseData extends ResponseData,
    TFieldName extends FieldPath<TFieldValues>,
    TFieldArrayName extends FieldArrayPath<TFieldValues>,
>(
    form: FormStore<TFieldValues, TResponseData>,
    fieldOrFieldArray: FieldArrayStore<TFieldValues, TFieldArrayName> | FieldStore<TFieldValues, TFieldName>,
    name: TFieldArrayName | TFieldName,
    { shouldFocus = false, on: modes }: ValidateOptions,
): void => {
    if (
        (modes as string[]).includes(
            (form.internal.validateOn === "submit" ? form.submitted : fieldOrFieldArray.error)
                ? form.internal.revalidateOn
                : form.internal.validateOn,
        )
    ) {
        validate(form, name, { shouldFocus });
    }
};

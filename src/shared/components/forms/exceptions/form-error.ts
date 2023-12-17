import type { FieldValues, FormErrors } from "#/forms";

export class FormError<TFieldValues extends FieldValues> extends Error {
    public readonly errors: FormErrors<TFieldValues>;
    public override readonly name = "FormError";

    constructor(argument1: FormErrors<TFieldValues> | string, argument2?: Maybe<FormErrors<TFieldValues>>) {
        super(typeof argument1 === "string" ? argument1 : "");
        this.errors = typeof argument1 === "string" ? argument2 || {} : argument1;
    }

    constructor(message: string, errors?: Maybe<FormErrors<TFieldValues>>);
    // @ts-ignore
    constructor(errors: FormErrors<TFieldValues>);
}

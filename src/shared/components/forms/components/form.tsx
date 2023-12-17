import type { QwikSubmitEvent, CSSProperties, ClassList, Signal } from "@builder.io/qwik";
import type { ResponseData, FieldValues, FormStore } from "#/forms";
import type { JSX } from "@builder.io/qwik/jsx-runtime";

import { setResponse, getValues, validate } from "../methods";
import { setErrorResponse, setFieldErrors } from "../utils";
import { FormError } from "../exceptions";

export type SubmitHandler<TFieldValues extends FieldValues> = (
    values: TFieldValues,
    event: QwikSubmitEvent<HTMLFormElement>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
) => MaybePromise<any>;

export type FormProperties<TFieldValues extends FieldValues, TResponseData extends ResponseData> = {
    encType?: Maybe<"application/x-www-form-urlencoded" | "multipart/form-data">;
    onSubmit$?: Maybe<SubmitHandler<TFieldValues>>;
    class?: Maybe<Signal<ClassList> | ClassList>;
    // Custom props
    of: FormStore<TFieldValues, TResponseData>;
    style?: Maybe<CSSProperties | string>;
    autoComplete?: Maybe<"off" | "on">;
    responseDuration?: Maybe<number>;
    reloadDocument?: Maybe<boolean>;
    shouldTouched?: Maybe<boolean>;

    keepResponse?: Maybe<boolean>;
    shouldActive?: Maybe<boolean>;
    shouldDirty?: Maybe<boolean>;
    shouldFocus?: Maybe<boolean>;
    name?: Maybe<string>;
    // HTML props
    id?: Maybe<string>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: any;
};

export const Form = <TFieldValues extends FieldValues, TResponseData extends ResponseData>({
    responseDuration: duration,
    reloadDocument,
    shouldTouched,
    keepResponse,
    shouldActive,
    shouldDirty,
    shouldFocus,
    onSubmit$,
    of: form,
    children,
    ...formProperties
}: FormProperties<TFieldValues, TResponseData>): JSX.Element => {
    // Create options object
    let options = {
        shouldTouched,
        shouldActive,
        shouldDirty,
        shouldFocus,
        duration,
    };

    return (
        <form
            noValidate
            {...formProperties}
            onSubmit$={async (event: QwikSubmitEvent<HTMLFormElement>) => {
                // Reset response if it is not to be kept
                if (!keepResponse) {
                    form.response = {};
                }

                // Increase submit count and set submitted and submitting to "true"
                form.submitCount++;
                form.submitted = true;
                form.submitting = true;

                // Try to run submit actions if form is valid
                try {
                    if (await validate(form, options)) {
                        // Get current values of form
                        let values = getValues(form, options);

                        // Run submit actions of form
                        let [actionResult] = await Promise.all([
                            // eslint-disable-next-line qwik/valid-lexical-scope
                            onSubmit$?.(values as TFieldValues, event),
                        ]);

                        // Set form action result if necessary
                        if (actionResult?.value) {
                            let { response, errors } = actionResult.value;
                            setFieldErrors(form, errors, { ...options, shouldFocus: false });
                            if (Object.keys(response).length) {
                                setResponse(form, response, options);
                            } else {
                                setErrorResponse(form, errors, options);
                            }
                        }
                    }

                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                } catch (error: any) {
                    if (error instanceof FormError) {
                        setFieldErrors(form, error.errors, {
                            ...options,
                            shouldFocus: false,
                        });
                    }
                    if (!(error instanceof FormError) || error.message) {
                        setResponse(
                            form,
                            {
                                message: error?.message || "An unknown error has occurred.",
                                status: "error",
                            },
                            options,
                        );
                    }

                    // Finally set submitting back to "false"
                } finally {
                    form.submitting = false;
                }
            }}
            ref={(element: Element) => {
                form.element = element as HTMLFormElement;
            }}
            preventdefault:submit={!reloadDocument}
            method="post"
        >
            {children}
        </form>
    );
};

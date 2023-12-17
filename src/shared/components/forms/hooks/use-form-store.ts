import type { ResponseData, FieldValues, FormOptions, FormStore } from "#/forms";

import { useStore } from "@builder.io/qwik";

import { getInitialStores } from "../utils";

/**
 * Creates and returns the store of the form.
 * @param options The form options.
 * @returns The reactive store.
 */
export const useFormStore = <TFieldValues extends FieldValues, TResponseData extends ResponseData = undefined>({
    revalidateOn = "input",
    validateOn = "submit",
    validate,
    ...options
}: FormOptions<TFieldValues, TResponseData>): FormStore<TFieldValues, TResponseData> => {
    return useStore(() => {
        // @ts-ignore
        let [fields, fieldArrays] = getInitialStores(options);

        return {
            internal: {
                fieldArrayPaths: options.fieldArrays,
                validators: [],
                revalidateOn,
                fieldArrays,
                validateOn,
                validate,
                fields,
            },
            element: undefined,
            submitting: false,
            validating: false,
            submitted: false,
            submitCount: 0,
            touched: false,
            invalid: false,
            dirty: false,
            response: {},
        };
    });
};

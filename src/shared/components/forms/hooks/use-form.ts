import type {
    FieldArrayPath,
    FieldPathValue,
    ResponseData,
    FieldValues,
    FormOptions,
    FieldPath,
    FormStore,
} from "#/forms";
import type { JSX } from "@builder.io/qwik/jsx-runtime";

import type { FieldArrayProperties, FieldProperties, FormProperties } from "../components";

import { FieldArray, Field, Form } from "../components";
import { useFormStore } from "./use-form-store";

/**
 * Creates and returns the store of the form as well as a linked Form, Field
 * and FieldArray component.
 * @param options The form options.
 * @returns The store and linked components.
 */
export const useForm = <TFieldValues extends FieldValues, TResponseData extends ResponseData = undefined>(
    options: FormOptions<TFieldValues, TResponseData>,
): [
    FormStore<TFieldValues, TResponseData>,
    {
        Field: <TFieldName extends FieldPath<TFieldValues>>(
            properties: FieldPathValue<TFieldValues, TFieldName> extends MaybeValue<string>
                ? PartialKey<Omit<FieldProperties<TFieldValues, TResponseData, TFieldName>, "of">, "type">
                : Omit<FieldProperties<TFieldValues, TResponseData, TFieldName>, "of">,
        ) => JSX.Element;
        FieldArray: <TFieldArrayName extends FieldArrayPath<TFieldValues>>(
            properties: Omit<FieldArrayProperties<TFieldValues, TResponseData, TFieldArrayName>, "of">,
        ) => JSX.Element;
        Form: (properties: Omit<FormProperties<TFieldValues, TResponseData>, "action" | "of">) => JSX.Element;
    },
] => {
    let form = useFormStore<TFieldValues, TResponseData>(options);

    return [
        form,
        {
            // @ts-ignore
            Field: <TFieldName extends FieldPath<TFieldValues>>(
                properties: FieldPathValue<TFieldValues, TFieldName> extends MaybeValue<string>
                    ? PartialKey<Omit<FieldProperties<TFieldValues, TResponseData, TFieldName>, "of">, "type">
                    : Omit<FieldProperties<TFieldValues, TResponseData, TFieldName>, "of">,
            ) => Field({ of: form, ...properties } as FieldProperties<TFieldValues, TResponseData, TFieldName>),
            FieldArray: <TFieldArrayName extends FieldArrayPath<TFieldValues>>(
                properties: Omit<FieldArrayProperties<TFieldValues, TResponseData, TFieldArrayName>, "of">,
                // @ts-ignore
            ) => FieldArray({ of: form, ...properties }),
            Form: (properties: Omit<FormProperties<TFieldValues, TResponseData>, "action" | "of">) =>
                // @ts-ignore
                Form({ of: form, ...properties }),
        },
    ];
};

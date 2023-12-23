/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
    FieldPathValue,
    TransformField,
    ValidateField,
    FieldElement,
    ResponseData,
    FieldValues,
    FieldStore,
    FieldPath,
    FieldType,
    FormStore,
} from "#/forms";
import type { QwikChangeEvent, QwikFocusEvent, QRL } from "@builder.io/qwik";
import type { JSX } from "@builder.io/qwik/jsx-runtime";

import { isServer } from "@builder.io/qwik/build";
import { $ } from "@builder.io/qwik";

import { handleFieldEvent, getElementInput, getFieldStore } from "../utils";
import { Lifecycle } from "./lifecycle";

export type FieldElementProperties<TFieldValues extends FieldValues, TFieldName extends FieldPath<TFieldValues>> = {
    onChange$: (event: QwikChangeEvent<FieldElement>, element: FieldElement) => void;
    onBlur$: (event: QwikFocusEvent<FieldElement>, element: FieldElement) => void;
    onInput$: (event: Event, element: FieldElement) => void;
    ref: (element: Element) => void;
    autoFocus: boolean;
    name: TFieldName;
};

export type FieldProperties<
    TFieldValues extends FieldValues,
    TResponseData extends ResponseData,
    TFieldName extends FieldPath<TFieldValues>,
> = {
    children: (
        store: FieldStore<TFieldValues, TFieldName>,
        properties: FieldElementProperties<TFieldValues, TFieldName>,
    ) => JSX.Element;
    transform?: Maybe<MaybeArray<QRL<TransformField<FieldPathValue<TFieldValues, TFieldName>>>>>;
    validate?: Maybe<MaybeArray<QRL<ValidateField<FieldPathValue<TFieldValues, TFieldName>>>>>;
    type: FieldType<FieldPathValue<TFieldValues, TFieldName>>;
    of: FormStore<TFieldValues, TResponseData>;
    key?: Maybe<string | number>;
    keepActive?: Maybe<boolean>;
    keepState?: Maybe<boolean>;
    name: TFieldName;
};

export const Field = <
    TFieldValues extends FieldValues,
    TResponseData extends ResponseData,
    TFieldName extends FieldPath<TFieldValues>,
>({
    children,
    name,
    type,
    ...properties
}: FieldPathValue<TFieldValues, TFieldName> extends MaybeValue<string>
    ? PartialKey<FieldProperties<TFieldValues, TResponseData, TFieldName>, "type">
    : FieldProperties<TFieldValues, TResponseData, TFieldName>): JSX.Element => {
    let { of: form } = properties;
    let field = getFieldStore(form, name)!;

    return (
        <Lifecycle store={field} key={name} {...(properties as any)}>
            {children(field, {
                onInput$: $((event: Event, element: FieldElement) => {
                    handleFieldEvent(
                        form,
                        field,
                        name,
                        event,
                        element,
                        ["touched", "input"],
                        getElementInput(element, field, type),
                    );
                }),
                onBlur$: $((event: QwikFocusEvent<FieldElement>, element: FieldElement) => {
                    handleFieldEvent(form, field, name, event, element, ["touched", "blur"]);
                }),
                onChange$: $((event: QwikChangeEvent<FieldElement>, element: FieldElement) => {
                    handleFieldEvent(form, field, name, event, element, ["change"]);
                }),
                ref: $((element: Element) => {
                    field.internal.elements.push(element as FieldElement);
                }),
                autoFocus: isServer && !!field.error,
                name,
            })}
        </Lifecycle>
    );
};

/* eslint-disable no-nested-ternary */
import type {
    ValidateFieldArray,
    FieldArrayStore,
    FieldArrayPath,
    FieldPathValue,
    TransformField,
    ValidateField,
    ResponseData,
    FieldValues,
    FieldStore,
    FieldPath,
    FormStore,
} from "#/forms";
import type { PublicProps, JSXNode, QRL } from "@builder.io/qwik";
import type { JSX } from "@builder.io/qwik/jsx-runtime";

import { useVisibleTask$, component$, Slot } from "@builder.io/qwik";

import { updateFormState, getUniqueId } from "../utils";
import { reset } from "../methods";

type LifecycleProperties<
    TFieldValues extends FieldValues,
    TResponseData extends ResponseData,
    TFieldName extends FieldPath<TFieldValues>,
    TFieldArrayName extends FieldArrayPath<TFieldValues>,
> = {
    validate?: Maybe<
        | MaybeArray<QRL<ValidateField<FieldPathValue<TFieldValues, TFieldName>>>>
        | MaybeArray<QRL<ValidateFieldArray<number[]>>>
    >;
    store: FieldArrayStore<TFieldValues, TFieldArrayName> | FieldStore<TFieldValues, TFieldName>;
    transform?: Maybe<MaybeArray<QRL<TransformField<FieldPathValue<TFieldValues, TFieldName>>>>>;
    of: FormStore<TFieldValues, TResponseData>;
    keepActive?: Maybe<boolean>;
    keepState?: Maybe<boolean>;
    key: string | number;
};

export const Lifecycle: <
    TFieldValues extends FieldValues,
    TResponseData extends ResponseData,
    TFieldName extends FieldPath<TFieldValues>,
    TFieldArrayName extends FieldArrayPath<TFieldValues>,
>(
    properties: PublicProps<LifecycleProperties<TFieldValues, TResponseData, TFieldName, TFieldArrayName>>,
    key: string | null,
    flags: number,
) => JSXNode | null = component$(
    <
        TFieldValues extends FieldValues,
        TResponseData extends ResponseData,
        TFieldName extends FieldPath<TFieldValues>,
        TFieldArrayName extends FieldArrayPath<TFieldValues>,
    >({
        keepActive,
        transform,
        keepState,
        of: form,
        validate,
        store,
    }: LifecycleProperties<TFieldValues, TResponseData, TFieldName, TFieldArrayName>): JSX.Element => {
        useVisibleTask$(({ cleanup }) => {
            // @ts-ignore
            store.internal.validate = validate
                ? Array.isArray(validate)
                    ? validate
                    : ([validate] as
                          | QRL<ValidateField<FieldPathValue<TFieldValues, TFieldName>>>[]
                          | QRL<ValidateFieldArray<number[]>>[])
                : [];

            if ("value" in store) {
                store.internal.transform = transform ? (Array.isArray(transform) ? transform : [transform]) : [];
            }

            let consumer = getUniqueId();

            store.internal.consumers.push(consumer);

            if (!store.active) {
                store.active = true;
                updateFormState(form);
            }

            cleanup(() =>
                setTimeout(() => {
                    store.internal.consumers.splice(store.internal.consumers.indexOf(consumer), 1);

                    if (!keepActive && !store.internal.consumers.length) {
                        store.active = false;

                        if (!keepState) {
                            reset(form, store.name);
                        } else {
                            updateFormState(form);
                        }
                    }

                    if ("value" in store) {
                        store.internal.elements = store.internal.elements.filter((element) => element.isConnected);
                    }
                }, 15),
            );
        });

        return <Slot />;
    },
);

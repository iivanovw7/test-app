import type {
    ValidateFieldArray,
    FieldArrayStore,
    FieldArrayPath,
    ResponseData,
    FieldValues,
    FormStore,
} from "#/forms";
import type { JSX } from "@builder.io/qwik/jsx-runtime";
import type { QRL } from "@builder.io/qwik";

import { getFieldArrayStore } from "../utils";
import { Lifecycle } from "./lifecycle";

export type FieldArrayProperties<
    TFieldValues extends FieldValues,
    TResponseData extends ResponseData,
    TFieldArrayName extends FieldArrayPath<TFieldValues>,
> = {
    children: (store: FieldArrayStore<TFieldValues, TFieldArrayName>) => JSX.Element;
    validate?: Maybe<MaybeArray<QRL<ValidateFieldArray<number[]>>>>;
    of: FormStore<TFieldValues, TResponseData>;
    keepActive?: Maybe<boolean>;
    keepState?: Maybe<boolean>;
    name: TFieldArrayName;
};

export const FieldArray = <
    TFieldValues extends FieldValues,
    TResponseData extends ResponseData,
    TFieldArrayName extends FieldArrayPath<TFieldValues>,
>({
    children,
    name,
    ...properties
}: FieldArrayProperties<TFieldValues, TResponseData, TFieldArrayName>): JSX.Element => {
    let fieldArray = getFieldArrayStore(properties.of, name)!;

    return (
        <Lifecycle store={fieldArray} key={name} {...properties}>
            {children(fieldArray)}
        </Lifecycle>
    );
};

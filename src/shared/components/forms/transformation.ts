import type { TransformField, FieldElement, FieldEvent, FieldValue } from "#/forms";
import type { QRL } from "@builder.io/qwik";

import { implicit$FirstArg, $ } from "@builder.io/qwik";

export type TransformMode = "change" | "input" | "blur";

export type TransformOptions = {
    on: TransformMode;
};

export const toCustomQrl = <TFieldValue extends FieldValue>(
    action: QRL<TransformField<TFieldValue>>,
    { on: mode }: TransformOptions,
): QRL<TransformField<TFieldValue>> => {
    return $((value: Maybe<TFieldValue>, event: FieldEvent, element: FieldElement) =>
        event.type === mode ? action(value, event, element) : value,
    );
};

export const toCustom$ = implicit$FirstArg(toCustomQrl);

export const toLowerCase = <TValue extends MaybeValue<string>>(
    options: TransformOptions,
): QRL<TransformField<TValue>> => {
    return toCustom$<TValue>((value) => value && (value.toLowerCase() as Maybe<TValue>), options);
};

export const toTrimmed = <TValue extends MaybeValue<string>>(
    options: TransformOptions,
): QRL<TransformField<TValue>> => {
    return toCustom$<TValue>((value) => value && (value.trim() as Maybe<TValue>), options);
};

export const toUpperCase = <TValue extends MaybeValue<string>>(
    options: TransformOptions,
): QRL<TransformField<TValue>> => {
    return toCustom$<TValue>((value) => value && (value.toUpperCase() as Maybe<TValue>), options);
};

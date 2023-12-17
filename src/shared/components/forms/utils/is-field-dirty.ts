/* eslint-disable no-nested-ternary */
import type { NoSerialize } from "@builder.io/qwik";
import type { FieldValue } from "#/forms";

export const isFieldDirty = <TFieldValue extends FieldValue>(
    startValue: Maybe<TFieldValue>,
    currentValue: Maybe<TFieldValue>,
) => {
    let toValue = (item: NoSerialize<File> | NoSerialize<Blob> | string) => (item instanceof Blob ? item.size : item);

    return Array.isArray(startValue) && Array.isArray(currentValue)
        ? startValue.map(toValue).join() !== currentValue.map(toValue).join()
        : startValue instanceof Date && currentValue instanceof Date
          ? startValue.getTime() !== currentValue.getTime()
          : Number.isNaN(startValue) && Number.isNaN(currentValue)
            ? false
            : startValue !== currentValue;
};

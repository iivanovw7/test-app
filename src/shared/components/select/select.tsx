import type { InputHTMLAttributes } from "@builder.io/qwik";

import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { cx } from "cva";

export type SelectOption = {
    label?: string;
    value: string;
};

export type SelectProperties = InputHTMLAttributes<HTMLSelectElement> & {
    classes?: Partial<{
        container: string;
        label: string;
        select: string;
    }>;
    errorText?: Nullable<string>;
    label?: string;
    options: SelectOption[];
    value?: string;
};

export const Select = component$<SelectProperties>((properties) => {
    let { classes = {}, errorText, id, label, options, value, ...restProperties } = properties;

    let hasError = useSignal(!!errorText?.length);

    useVisibleTask$(({ track }) => {
        track(() => errorText);

        hasError.value = !!errorText?.length;
    });

    return (
        <div class={cx(classes.container)}>
            <label class={cx("block text-sm font-medium", classes.label)} for={id}>
                {label}
            </label>
            <select
                class={cx(
                    "rounded",
                    "text-brand-text dark:text-brand-dark-text",
                    "block w-full round",
                    "border-brand-border dark:border-brand-dark-border",
                    "focus:border-brand-border dark:focus:border-brand-dark-border",
                    "border p-2.5 text-sm",
                    "bg-stone-300 dark:bg-stone-800",
                    "outline-none focus:outline-none focus:ring-2",
                    "focus:ring-brand-focus-ring",
                    "dark:focus:ring-brand-dark-focus-ring",
                    classes.select,
                )}
                id={id}
                {...restProperties}
            >
                {options.map((option) => (
                    <option selected={value === option.value} value={option.value}>
                        {option.label || option.value}
                    </option>
                ))}
            </select>
            <p class="mb-1 mt-0 min-h-[22px] text-[12px] font-medium text-brand-error">
                {!!errorText?.length && <span>{errorText}</span>}
            </p>
        </div>
    );
});

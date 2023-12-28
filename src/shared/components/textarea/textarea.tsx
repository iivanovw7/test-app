import type { TextareaHTMLAttributes } from "@builder.io/qwik";

import { useVisibleTask$, component$, useSignal } from "@builder.io/qwik";
import { cx } from "cva";

export type TextareaProperties = TextareaHTMLAttributes<HTMLTextAreaElement> & {
    classes?: Partial<{
        container: string;
        textarea: string;
        label: string;
    }>;
    errorText?: Nullable<string>;
    label?: string;
};

export const Textarea = component$<TextareaProperties>((properties) => {
    let { classes = {}, errorText, label, value, id, ...restProperties } = properties;

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
            <textarea
                class={cx(
                    "rounded",
                    "text-brand-text dark:text-brand-dark-text",
                    "border-brand-border dark:border-brand-dark-border",
                    "focus:border-brand-border dark:focus:border-brand-dark-border",
                    "block w-full round",
                    "border p-2.5 text-sm",
                    "bg-stone-300 dark:bg-stone-800",
                    "outline-none focus:outline-none focus:ring-2",
                    "focus:ring-brand-focus-ring",
                    "dark:focus:ring-brand-dark-focus-ring",
                    "text-brand-text",
                    {
                        "focus:ring-brand-error dark:focus:ring-brand-error": !!errorText?.length,
                        "border-brand-error dark:border-brand-error": !!errorText?.length,
                    },
                    classes.textarea,
                )}
                value={value}
                id={id}
                {...restProperties}
            />
            <p class="mb-1 mt-0 min-h-[22px] text-[12px] font-medium text-brand-error">
                {!!errorText?.length && <span>{errorText}</span>}
            </p>
        </div>
    );
});

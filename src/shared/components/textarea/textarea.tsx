import type { TextareaHTMLAttributes } from "@builder.io/qwik";

import { component$ } from "@builder.io/qwik";
import { cx } from "cva";

export type TextareaProperties = TextareaHTMLAttributes<HTMLTextAreaElement> & {
    classes?: Partial<{
        container: string;
        textarea: string;
        label: string;
    }>;
    label?: string;
};

export const Textarea = component$<TextareaProperties>((properties) => {
    let { classes = {}, label, id, ...restProperties } = properties;

    return (
        <div class={cx(classes.container)}>
            <label class={cx("block text-sm font-medium", classes.label)} for={id}>
                {label}
            </label>
            <textarea
                class={cx(
                    "rounded",
                    "text-brand-text dark:text-brand-dark-text",
                    "block w-full round",
                    "border border-gray-400 p-2.5 text-sm",
                    "focus:border-gray-400",
                    "bg-stone-300 dark:bg-stone-800",
                    "outline-none focus:outline-none focus:ring-2",
                    "focus:ring-brand-focus-ring",
                    "dark:focus:ring-brand-dark-focus-ring",
                    "text-brand-text",
                    classes.textarea,
                )}
                id={id}
                {...restProperties}
            />
        </div>
    );
});

import type { InputHTMLAttributes } from "@builder.io/qwik";

import { component$ } from "@builder.io/qwik";
import { cx } from "cva";

export type InputProperties = InputHTMLAttributes<HTMLInputElement> & {
    classes: Partial<{
        container: string;
        label: string;
        input: string;
    }>;
    label?: string;
};

export const Input = component$<InputProperties>((properties) => {
    let { classes, label, id, ...restProperties } = properties;

    return (
        <div class={cx(classes.container)}>
            <label class={cx("block text-sm font-medium", classes.label)} for={id}>
                {label}
            </label>
            <input
                class={cx(
                    "text-brand-text dark:text-brand-dark-text",
                    "block w-full round-sm",
                    "border border-gray-400 p-2.5 text-sm",
                    "focus:border-gray-400",
                    "bg-stone-300 dark:bg-stone-800",
                    "outline-none focus:outline-none focus:ring-2",
                    "focus:ring-brand-focus-ring",
                    "dark:focus:ring-brand-dark-focus-ring",
                    "text-brand-text",
                    classes.input,
                )}
                id={id}
                {...restProperties}
            />
        </div>
    );
});

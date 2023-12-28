import type { InputHTMLAttributes } from "@builder.io/qwik";

import { useVisibleTask$, component$, useSignal } from "@builder.io/qwik";
import { CountryMap } from "@/shared/utils";
import { cx } from "cva";

export type InputPhoneProperties = InputHTMLAttributes<HTMLInputElement> & {
    classes?: Partial<{
        container: string;
        button: string;
        label: string;
        input: string;
        form: string;
    }>;
    errorText?: Nullable<string>;
    prefix?: string;
    label?: string;
};

export const PhonePrefix = {
    [CountryMap.RUSSIA]: "+7",
} as const satisfies Record<CountryMap, string>;

export const toPhoneNumber = (value = "") => {
    let numbers = value.replaceAll(/\D/g, "");

    if (numbers) {
        return numbers;
    }

    return "";
};

export const InputPhone = component$<InputPhoneProperties>((properties) => {
    let { classes = {}, errorText, prefix, label, id, ...restProperties } = properties;

    let hasError = useSignal(!!errorText?.length);

    useVisibleTask$(({ track }) => {
        track(() => errorText);

        hasError.value = !!errorText?.length;
    });

    return (
        <form class={cx("mx-auto w-full", classes.form)}>
            <div class={cx(classes.container)}>
                <label class={cx("block text-sm font-medium", classes.label)} for={id}>
                    {label}
                </label>
                <div class={cx("flex items-center")}>
                    <button
                        class={cx(
                            "flex-shrink-0 z-10 inline-flex",
                            "items-center p-2.5",
                            "text-sm font-medium text-center ",
                            "border rounded-s text-sm",
                            "border-brand-border dark:border-brand-dark-border",
                            "bg-stone-300 dark:bg-stone-800",
                            "text-brand-text dark:text-brand-dark-text",
                            "outline-none focus:outline-none focus:ring-2",
                            "focus:ring-brand-focus-ring",
                            "dark:focus:ring-brand-dark-focus-ring",
                            classes.button,
                        )}
                        type="button"
                        disabled
                    >
                        {prefix}
                    </button>
                    <div class="relative w-full">
                        <input
                            class={cx(
                                "block rounded-e",
                                "text-brand-text dark:text-brand-dark-text",
                                "border-brand-border dark:border-brand-dark-border",
                                "focus:border-brand-border dark:focus:border-brand-dark-border",
                                "block w-full round",
                                "border p-2.5 text-sm",
                                "bg-stone-300 dark:bg-stone-800",
                                "outline-none focus:outline-none focus:ring-2",
                                "focus:ring-brand-focus-ring",
                                "dark:focus:ring-brand-dark-focus-ring",
                                classes.input,
                            )}
                            id={id}
                            {...restProperties}
                        />
                    </div>
                </div>
                <p class="mb-1 mt-0 min-h-[22px] text-[12px] font-medium text-brand-error">
                    {!!errorText?.length && <span>{errorText}</span>}
                </p>
            </div>
        </form>
    );
});

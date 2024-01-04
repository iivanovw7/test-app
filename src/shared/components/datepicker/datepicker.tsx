import type { CustomValueEvent, OnChangeHandler } from "@/shared/utils";
import type { InputHTMLAttributes } from "@builder.io/qwik";

import { $, component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { LuCalendar } from "@qwikest/icons/lucide";
import { cx } from "cva";

export type DatepickerProperties = InputHTMLAttributes<HTMLInputElement> & {
    classes?: Partial<{
        container: string;
        input: string;
        label: string;
    }>;
    errorText?: Nullable<string>;
    label?: string;
    onDateChange?: OnChangeHandler;
};

export const Datepicker = component$<DatepickerProperties>((properties) => {
    let { classes = {}, errorText, id, label, onDateChange, value, ...restProperties } = properties;
    let reference = useSignal<HTMLInputElement>();
    let hasError = useSignal(!!errorText?.length);

    let handleChange = $((event: Event) => {
        onDateChange?.(event as CustomValueEvent);
    });

    useVisibleTask$(({ cleanup }) => {
        reference.value?.addEventListener("changeDate", handleChange);

        cleanup(() => {
            reference.value?.removeEventListener("changeDate", handleChange);
        });
    });

    useVisibleTask$(({ track }) => {
        track(() => errorText);

        hasError.value = !!errorText?.length;
    });

    return (
        <div class={cx("relative", classes.container)}>
            <label class={cx("block text-sm font-medium", classes.label)} for={id}>
                {label}
            </label>
            <div class="pointer-events-none absolute start-0 top-8 flex items-center ps-3.5">
                <LuCalendar aria-hidden="true" class="h-4 w-4 stroke-current" />
            </div>
            <input
                class={cx(
                    "ps-10 rounded",
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
                        "border-brand-error dark:border-brand-error": !!errorText?.length,
                        "focus:ring-brand-error dark:focus:ring-brand-error": !!errorText?.length,
                    },
                    classes.input,
                )}
                id={id}
                ref={reference}
                value={value}
                {...{
                    datepicker: true,
                    "datepicker-orientation": "bottom left",
                    "datepicker-title": label,
                    ...restProperties,
                }}
            />
            <p class="mb-1 mt-0 min-h-[22px] text-[12px] font-medium text-brand-error">
                {!!errorText?.length && <span>{errorText}</span>}
            </p>
        </div>
    );
});

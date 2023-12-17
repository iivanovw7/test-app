import { component$, Slot } from "@builder.io/qwik";
import { cx } from "cva";

export type ChipProperties = {
    class?: string;
};

export const Chip = component$<ChipProperties>((properties) => {
    let { class: className } = properties;

    return (
        <div
            class={cx(
                "bg-gray-300 text-gray-800 text-xs",
                "font-medium me-2 px-2.5 py-0.5",
                "dark:bg-gray-700 dark:text-gray-300",
                "relative whitespace-nowrap rounded-xs",
                className,
            )}
        >
            <Slot />
        </div>
    );
});

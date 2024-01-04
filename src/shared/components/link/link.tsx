import type { AnchorHTMLAttributes } from "@builder.io/qwik";

import { component$, Slot } from "@builder.io/qwik";
import { cx } from "cva";

export type LinkProperties = AnchorHTMLAttributes<HTMLAnchorElement> & {
    text?: string;
    /** @default "never" */
    underline?: "always" | "hover" | "never";
};

export const Link = component$<LinkProperties>((properties) => {
    let { text, underline = "never", ...linkProperties } = properties;

    return (
        <a
            class={cx(
                "px-2 rounded",
                "font-medium",
                "focus:outline-none",
                "focus:ring-2",
                "focus:ring-brand-focus-ring",
                "dark:focus:ring-brand-dark-focus-ring",
                "text-brand-primary dark:text-brand-dark-primary",
                {
                    "hover:underline": underline === "hover",
                    "no-underline": underline === "never",
                    underline: (underline = "always"),
                },
            )}
            {...linkProperties}
        >
            {text}
            <Slot />
        </a>
    );
});

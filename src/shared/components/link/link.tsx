import type { AnchorHTMLAttributes } from "@builder.io/qwik";

import { component$, Slot } from "@builder.io/qwik";
import { cx } from "cva";

export type LinkProperties = AnchorHTMLAttributes<HTMLAnchorElement> & {
    /** @default "never" */
    underline?: "always" | "hover" | "never";
    text?: string;
};

export const Link = component$<LinkProperties>((properties) => {
    let { underline = "never", text, ...linkProperties } = properties;

    return (
        <a
            class={cx(
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

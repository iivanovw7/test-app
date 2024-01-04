import type { ProvidersProperties } from "@/layouts/providers";

import { component$, Slot } from "@builder.io/qwik";
import { cva } from "cva";

import type { LinkProperties } from "./link";

import { Link } from "./link";

export type NavButtonProperties = Pick<ProvidersProperties, "slug"> & LinkProperties;

const navButton = cva(["inline-flex items-center no-underline", "px-8 py-3", "w-full rounded"], {
    defaultVariants: {
        active: false,
    },
    variants: {
        active: {
            false: ["bg-stone-50 text-brand-text dark:text-brand-dark-text", "hover:text-gray-900 dark:bg-stone-800"],
            true: ["bg-brand-primary", "text-brand-dark-text", "dark:bg-brand-dark-primary"],
        },
    },
});

export const NavButton = component$<NavButtonProperties>((properties) => {
    let { href = "#", slug, ...restProperties } = properties;

    let isActive = slug === href;

    return (
        <Link
            class={navButton({ active: isActive })}
            href={href}
            target="_self"
            {...(isActive && {
                "aria-current": "page",
            })}
            {...restProperties}
        >
            <Slot />
        </Link>
    );
});

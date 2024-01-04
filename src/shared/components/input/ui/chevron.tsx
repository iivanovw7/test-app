import type { SVGProps } from "@builder.io/qwik";

import { component$ } from "@builder.io/qwik";

export type ChevronProperties = SVGProps<SVGElement> & {
    size?: number;
};

export const Chevron = component$<ChevronProperties>(
    ({ color = "currentColor", height, size, width, ...restProperties }) => {
        return (
            <svg
                aria-hidden="true"
                class="ms-2.5 h-2.5 w-2.5"
                fill="none"
                height={size || height || "24"}
                viewBox="0 0 10 6"
                width={size || width || "24"}
                xmlns="http://www.w3.org/2000/svg"
                {...restProperties}
            >
                <path d="m1 1 4 4 4-4" stroke={color} stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
            </svg>
        );
    },
);

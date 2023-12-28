import type { SVGProps } from "@builder.io/qwik";

import { component$ } from "@builder.io/qwik";

export type ChevronProperties = SVGProps<SVGElement> & {
    size?: number;
};

export const Chevron = component$<ChevronProperties>(
    ({ color = "currentColor", height, width, size, ...restProperties }) => {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                height={size || height || "24"}
                width={size || width || "24"}
                class="ms-2.5 h-2.5 w-2.5"
                aria-hidden="true"
                viewBox="0 0 10 6"
                fill="none"
                {...restProperties}
            >
                <path stroke-linejoin="round" stroke-linecap="round" stroke-width="2" d="m1 1 4 4 4-4" stroke={color} />
            </svg>
        );
    },
);

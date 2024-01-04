import { cva } from "cva";

const button = cva(
    [
        "relative block",
        "text-center",
        "font-medium text-brand-text",
        "outline-none focus:outline-none",
        "focus:ring-2",
        "focus:ring-brand-focus-ring",
        "dark:focus:ring-brand-dark-focus-ring",
        "rounded no-underline",
        "transition-all",
    ],
    {
        compoundVariants: [
            {
                class: ["relative inline-flex items-center justify-center", "p-0.5"],
                size: "x-small",
                variant: "gradient-outline",
            },
            {
                class: ["relative inline-flex items-center justify-center", "p-0.5"],
                size: "small",
                variant: "gradient-outline",
            },
            {
                class: ["relative inline-flex items-center justify-center", "p-0.5"],
                size: "medium",
                variant: "gradient-outline",
            },
            {
                class: "px-2 py-1 text-xs",
                size: "x-small",
                variant: "fill",
            },
            {
                class: "px-3 py-2 text-xs",
                size: "small",
                variant: "fill",
            },
            {
                class: "px-3 py-2 text-sm",
                size: "medium",
                variant: "fill",
            },
            {
                class: "px-3 py-2.5 text-sm",
                size: "large",
                variant: "fill",
            },
            {
                class: "px-3 py-2 text-xs",
                size: "x-small",
                variant: "gradient-duonote",
            },
            {
                class: "px-3 py-2 text-sm",
                size: "small",
                variant: "gradient-duonote",
            },
            {
                class: "px-3 py-2.5 text-sm",
                size: "medium",
                variant: "gradient-duonote",
            },
            {
                class: ["bg-brand-primary text-stone-50"],
                color: "primary",
                variant: "fill",
            },
            {
                class: ["opacity-50"],
                color: "primary",
                disabled: true,
                variant: "fill",
            },
            {
                class: "bg-brand-secondary",
                color: "secondary",
                variant: "fill",
            },
            {
                class: "bg-brand-tertiary",
                color: "tertiary",
                variant: "fill",
            },
            {
                class: ["bg-brand-error text-stone-50"],
                color: "error",
                variant: "fill",
            },
            {
                class: ["border-0"],
                color: "tertiary",
                variant: "transparent",
            },
        ],
        defaultVariants: {
            color: "primary",
            disabled: false,
            size: "medium",
            variant: "fill",
        },
        variants: {
            color: {
                error: [
                    "focus:ring-brand-focus-ring-error",
                    "dark:focus:ring-brand-dark-focus-ring-error",
                    "hover:brightness-125",
                ],
                primary: ["hover:brightness-125"],
                secondary: ["hover:brightness-125"],
                success: [],
                tertiary: [
                    "border",
                    "text-brand-text",
                    "border-brand-border dark:border-brand-dark-border",
                    "bg-brand-tertiary dark:bg-brand-dark-tertiary",
                    "hover:bg-brand-hover-tertiary",
                    "dark:hover:bg-brand-dark-hover-tertiary",
                    "dark:text-brand-dark-text",
                    "dark:hover:bg-brand-dark-hover",
                ],
            },
            disabled: {
                false: [],
                true: ["pointer-events-none"],
            },
            size: {
                large: ["px-5 py-2.5 text-sm"],
                medium: ["p-2 text-sm"],
                small: ["text-xs"],
                "x-small": ["p-1 text-xs"],
            },
            variant: {
                fill: ["text-brand-text"],
                "gradient-duonote": ["text-brand-text"],
                "gradient-outline": [
                    "group",
                    "bg-gradient-to-br from-purple-600 to-blue-500",
                    "group-hover:from-purple-600 group-hover:to-blue-500",
                    "bg-brand-background text-brand-text",
                    "dark:bg-brand-dark-background",
                ],
                transparent: [],
            },
        },
    },
);

const text = cva(["relative w-full"], {
    compoundVariants: [
        {
            class: [
                "text-brand-text",
                "dark:text-brand-dark-text",
                "round-sm bg-brand-background",
                "dark:bg-brand-dark-background",
                "px-3 py-2 text-xs group-hover:bg-opacity-0",
            ],
            size: "x-small",
            variant: "gradient-outline",
        },
        {
            class: [
                "text-brand-text",
                "dark:text-brand-dark-text",
                "round-sm bg-brand-background",
                "dark:bg-brand-dark-background",
                "px-3 py-2 text-xs group-hover:bg-opacity-0",
            ],
            size: "small",
            variant: "gradient-outline",
        },
        {
            class: [
                "text-brand-text",
                "dark:text-brand-dark-text",
                "rounded bg-brand-background",
                "dark:bg-brand-dark-background",
                "px-5 py-2.5 text-sm group-hover:bg-opacity-0",
            ],
            size: "medium",
            variant: "gradient-outline",
        },
        {
            class: [],
            color: "primary",
            variant: "fill",
        },
        {
            class: ["text-md"],
            size: "medium",
            variant: "fill",
        },
    ],
    defaultVariants: {
        color: "primary",
        disabled: false,
        size: "medium",
        variant: "fill",
    },
    variants: {
        color: {
            error: [],
            primary: [],
            secondary: [],
            success: [],
            tertiary: [],
        },
        disabled: {
            false: [],
            true: [],
        },
        size: {
            large: [],
            medium: [],
            small: [],
            "x-small": [],
        },
        variant: {
            fill: [],
            "gradient-duonote": [],
            "gradient-outline": ["transition-all duration-75 ease-in"],
            transparent: [],
        },
    },
});

const loader = cva(
    ["absolute left-0 top-0 z-10 rounded", "flex h-full w-full flex-col", "items-center justify-center"],
    {
        compoundVariants: [
            {
                class: ["bg-brand-primary"],
                color: "primary",
                variant: "fill",
            },
            {
                class: "bg-brand-secondary",
                color: "secondary",
                variant: "fill",
            },
            {
                class: "bg-brand-tertiary",
                color: "tertiary",
                variant: "fill",
            },
        ],
        defaultVariants: {
            color: "primary",
            disabled: false,
            size: "medium",
            variant: "fill",
        },
        variants: {
            color: {
                error: [],
                primary: [],
                secondary: [],
                success: [],
                tertiary: [],
            },
            disabled: {
                false: [],
                true: [],
            },
            size: {
                large: [],
                medium: [],
                small: [],
                "x-small": [],
            },
            variant: {
                fill: [],
                "gradient-duonote": [],
                "gradient-outline": [],
                transparent: [],
            },
        },
    },
);

export const styles = {
    button,
    loader,
    text,
};

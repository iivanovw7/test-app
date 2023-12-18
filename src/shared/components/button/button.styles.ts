import { cva } from "cva";

const button = cva(
    [
        "block",
        "text-center",
        "font-medium text-brand-text",
        "outline-none focus:outline-none",
        "focus:ring-2",
        "focus:ring-brand-focus-ring",
        "dark:focus:ring-brand-dark-focus-ring",
        "round-sm no-underline",
        "transition-all",
    ],
    {
        compoundVariants: [
            {
                class: ["relative inline-flex items-center justify-center", "p-0.5"],
                variant: "gradient-outline",
                size: "x-small",
            },
            {
                class: ["relative inline-flex items-center justify-center", "p-0.5"],
                variant: "gradient-outline",
                size: "small",
            },
            {
                class: ["relative inline-flex items-center justify-center", "p-0.5"],
                variant: "gradient-outline",
                size: "medium",
            },
            {
                class: "px-2 py-1 text-xs",
                variant: "fill",
                size: "x-small",
            },
            {
                class: "px-3 py-2 text-xs",
                variant: "fill",
                size: "small",
            },
            {
                class: "px-3 py-2 text-sm",
                variant: "fill",
                size: "medium",
            },
            {
                class: "px-3 py-2.5 text-sm",
                variant: "fill",
                size: "large",
            },
            {
                variant: "gradient-duonote",
                class: "px-3 py-2 text-xs",
                size: "x-small",
            },
            {
                variant: "gradient-duonote",
                class: "px-3 py-2 text-sm",
                size: "small",
            },
            {
                class: "px-3 py-2.5 text-sm",
                variant: "gradient-duonote",
                size: "medium",
            },
            {
                class: ["bg-brand-primary text-stone-50"],
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
            {
                variant: "transparent",
                class: ["border-0"],
                color: "tertiary",
            },
        ],
        variants: {
            color: {
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
                secondary: ["hover:brightness-125"],
                primary: ["hover:brightness-125"],
                success: [],
                error: [],
            },
            variant: {
                "gradient-outline": [
                    "group",
                    "bg-gradient-to-br from-purple-600 to-blue-500",
                    "group-hover:from-purple-600 group-hover:to-blue-500",
                    "bg-brand-background text-brand-text",
                    "dark:bg-brand-dark-background",
                ],
                fill: ["bg-brand-primary text-brand-text", "px-3 py-2"],
                "gradient-duonote": ["text-brand-surface"],
                transparent: [],
            },
            size: {
                large: ["px-5 py-2.5 text-sm"],
                medium: ["px-2 py-2 text-sm"],
                "x-small": ["p-1 text-xs"],
                small: ["text-xs"],
            },
        },
        defaultVariants: {
            color: "primary",
            variant: "fill",
            size: "medium",
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
            variant: "gradient-outline",
            size: "x-small",
        },
        {
            class: [
                "text-brand-text",
                "dark:text-brand-dark-text",
                "round-sm bg-brand-background",
                "dark:bg-brand-dark-background",
                "px-3 py-2 text-xs group-hover:bg-opacity-0",
            ],
            variant: "gradient-outline",
            size: "small",
        },
        {
            class: [
                "text-brand-text",
                "dark:text-brand-dark-text",
                "round-sm bg-brand-background",
                "dark:bg-brand-dark-background",
                "px-5 py-2.5 text-sm group-hover:bg-opacity-0",
            ],
            variant: "gradient-outline",
            size: "medium",
        },
        {
            class: ["text-brand-surface"],
            color: "primary",
            variant: "fill",
        },
        {
            class: ["text-md"],
            variant: "fill",
            size: "medium",
        },
    ],
    variants: {
        variant: {
            "gradient-outline": ["transition-all duration-75 ease-in"],
            "gradient-duonote": [],
            transparent: [],
            fill: [],
        },
        color: {
            secondary: [],
            tertiary: [],
            primary: [],
            success: [],
            error: [],
        },
        size: {
            "x-small": [],
            medium: [],
            small: [],
            large: [],
        },
    },
    defaultVariants: {
        color: "primary",
        variant: "fill",
        size: "medium",
    },
});

export const styles = {
    button,
    text,
};

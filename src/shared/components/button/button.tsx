import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "@builder.io/qwik";

import { component$, Slot } from "@builder.io/qwik";
import { cx } from "cva";

import { styles } from "./button.styles";
import { Loader } from "./ui/loader";

export type BaseProperties = {
    classes?: Partial<{
        button: string;
        loader: string;
        text: string;
    }>;
    variant?: "gradient-duonote" | "gradient-outline" | "transparent" | "fill";
    color?: "secondary" | "tertiary" | "primary" | "success" | "error";
    size?: "x-small" | "medium" | "small" | "large";
    isLoading?: boolean;
    disabled?: boolean;
    text?: string;
};

export type ButtonAsButton = BaseProperties &
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProperties> & {
        as?: "button";
    };

export type ButtonAsLink = BaseProperties &
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProperties> & {
        as?: "link";
    };

export type ButtonProperties = ButtonAsButton | ButtonAsLink;

export const Button = component$<ButtonProperties>((properties) => {
    let {
        text: textProperty,
        color = "primary",
        variant = "fill",
        as = "button",
        classes = {},
        isLoading,
        disabled,
        size,
        ...restProperties
    } = properties;

    let combinedClassName = cx(styles.button({ disabled, variant, color, size }), classes.button);
    let buttonText = (
        <span class={cx(styles.text({ disabled, variant, color, size }), classes.text)}>{textProperty}</span>
    );
    let loader = (
        <div class={cx(styles.loader({ disabled, variant, color, size }), styles.loader)}>
            <Loader color="#E5E7EB" />
        </div>
    );

    if (as === "link") {
        let linkProperties = restProperties as ButtonAsLink;

        return (
            <a disabled={isLoading || disabled} class={combinedClassName} {...linkProperties}>
                {isLoading && loader}
                {buttonText}
                <Slot />
            </a>
        );
    }

    let buttonProperties = restProperties as ButtonAsButton;

    return (
        <button disabled={isLoading || disabled} class={combinedClassName} {...buttonProperties}>
            {isLoading && loader}
            {buttonText}
            <Slot />
        </button>
    );
});

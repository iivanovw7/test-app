import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "@builder.io/qwik";

import { component$, Slot } from "@builder.io/qwik";
import { cx } from "cva";

import { styles } from "./button.styles";

export type BaseProperties = {
    variant?: "gradient-duonote" | "gradient-outline" | "transparent" | "fill";
    color?: "secondary" | "tertiary" | "primary" | "success" | "error";
    size?: "x-small" | "medium" | "small" | "large";
    textClass?: string;
    class?: string;
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
        textClass: textClassName,
        text: textProperty,
        color = "primary",
        variant = "fill",
        class: className,
        as = "button",
        size,
        ...restProperties
    } = properties;

    let combinedClassName = cx(styles.button({ variant, color, size }), className);
    let buttonText = <span class={cx(styles.text({ variant, color, size }), textClassName)}>{textProperty}</span>;

    if (as === "link") {
        let linkProperties = restProperties as ButtonAsLink;

        return (
            <a class={combinedClassName} {...linkProperties}>
                {buttonText}
                <Slot />
            </a>
        );
    }

    let buttonProperties = restProperties as ButtonAsButton;

    return (
        <button class={combinedClassName} {...buttonProperties}>
            {buttonText}
            <Slot />
        </button>
    );
});

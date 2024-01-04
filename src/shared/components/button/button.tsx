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
    color?: "error" | "primary" | "secondary" | "success" | "tertiary";
    disabled?: boolean;
    isLoading?: boolean;
    size?: "large" | "medium" | "small" | "x-small";
    text?: string;
    variant?: "fill" | "gradient-duonote" | "gradient-outline" | "transparent";
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
        as = "button",
        classes = {},
        color = "primary",
        disabled,
        isLoading,
        size,
        text: textProperty,
        variant = "fill",
        ...restProperties
    } = properties;

    let combinedClassName = cx(styles.button({ color, disabled, size, variant }), classes.button);
    let buttonText = (
        <span class={cx(styles.text({ color, disabled, size, variant }), classes.text)}>{textProperty}</span>
    );
    let loader = (
        <div class={cx(styles.loader({ color, disabled, size, variant }), styles.loader)}>
            <Loader color="#E5E7EB" />
        </div>
    );

    if (as === "link") {
        let linkProperties = restProperties as ButtonAsLink;

        return (
            <a class={combinedClassName} disabled={isLoading || disabled} {...linkProperties}>
                {isLoading && loader}
                {buttonText}
                <Slot />
            </a>
        );
    }

    let buttonProperties = restProperties as ButtonAsButton;

    return (
        <button class={combinedClassName} disabled={isLoading || disabled} {...buttonProperties}>
            {isLoading && loader}
            {buttonText}
            <Slot />
        </button>
    );
});

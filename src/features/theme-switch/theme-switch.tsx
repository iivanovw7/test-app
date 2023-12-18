import { component$, useSignal, $ } from "@builder.io/qwik";
import { LuMoon, LuSun } from "@qwikest/icons/lucide";
import { Button } from "@/shared/components";

const LIGHT_CLASS = "theme-toggle-light-icon";
const DARK_CLASS = "theme-toggle-dark-icon";

export type ThemeSwitchProperties = {
    class?: string;
};

export const ThemeSwitch = component$<ThemeSwitchProperties>((properties) => {
    let themeToggleLightIconReference = useSignal<Element>();
    let themeToggleDarkIconReference = useSignal<Element>();

    let handleClick = $(() => {
        let themeToggleDarkIcons = document.getElementsByClassName(DARK_CLASS);
        let themeToggleLightIcons = document.getElementsByClassName(LIGHT_CLASS);

        for (let icon of themeToggleLightIcons) {
            icon.classList.toggle("hidden");
        }

        for (let icon of themeToggleDarkIcons) {
            icon.classList.toggle("hidden");
        }

        if (localStorage.getItem("color-theme")) {
            if (localStorage.getItem("color-theme") === "light") {
                document.documentElement.classList.remove("light");
                document.documentElement.classList.add("dark");

                localStorage.setItem("color-theme", "dark");
            } else {
                document.documentElement.classList.remove("dark");
                document.documentElement.classList.add("light");

                localStorage.setItem("color-theme", "light");
            }
        } else {
            if (document.documentElement.classList.contains("dark")) {
                document.documentElement.classList.remove("dark");
                document.documentElement.classList.add("light");

                localStorage.setItem("color-theme", "light");
            } else {
                document.documentElement.classList.remove("light");
                document.documentElement.classList.add("dark");

                localStorage.setItem("color-theme", "dark");
            }
        }
    });

    return (
        <Button
            class={properties.class}
            onClick$={handleClick}
            variant="transparent"
            color="tertiary"
            type="button"
            size="medium"
        >
            <LuMoon
                class={`${DARK_CLASS} hidden w-4 outline-none`}
                ref={themeToggleDarkIconReference}
                fill="currentColor"
            />
            <LuSun
                class={`${LIGHT_CLASS} h-4 w-4 outline-none`}
                ref={themeToggleLightIconReference}
                fill="currentColor"
            />
        </Button>
    );
});

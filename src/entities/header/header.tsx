import { LocationContext, RootContext } from "@/shared/context";
import { apiRoutes, navLinks, routes } from "@/shared/routes";
import { component$, useContext } from "@builder.io/qwik";
import { ThemeSwitch } from "@/features/theme-switch";
import { LuMenu } from "@qwikest/icons/lucide";
import { Button } from "@/shared/components";
import { cx } from "cva";

export const Header = component$(() => {
    let { slug } = useContext(LocationContext);
    let { profile } = useContext(RootContext);

    return (
        <nav class={cx("w-full", "bg-brand-background dark:bg-brand-dark-background", "lg:bg-transparent", "h-header")}>
            <div
                class={cx(
                    "w-full max-w-8xl",
                    "mx-auto flex max-w-screen-xl",
                    "flex-wrap items-center",
                    "justify-between py-4 px-8",
                )}
            >
                <a class="flex items-center justify-center" href="https://flowbite.com/">
                    <img
                        src="https://flowbite.com/docs/images/logo.svg"
                        class="m-0 mr-3 h-6 w-6"
                        alt="Flowbite Logo"
                        height={24}
                        width={24}
                    />
                    <span class={cx("self-center whitespace-nowrap text-2xl", "font-semibold dark:text-white")}>
                        Flowbite
                    </span>
                </a>
                <div class="flex flex-row items-center gap-2 md:hidden">
                    <ThemeSwitch />
                    <button
                        class={cx(
                            "round-sm p-2",
                            "inline-flex h-8 w-8 items-center",
                            "justify-center text-sm",
                            "hover:bg-brand-hover focus:outline-none",
                            "focus:ring-2 focus:ring-brand-focus-ring",
                            "dark:hover:bg-brand-dark-hover",
                            "dark:focus:ring-brand-dark-focus-ring",
                            "md:hidden",
                        )}
                        data-collapse-toggle="navbar-default"
                        aria-controls="navbar-default"
                        aria-expanded="false"
                        type="button"
                    >
                        <span class="sr-only">Open main menu</span>
                        <LuMenu class="stroke-width-2 h-5 w-5 fill-none stroke-current" />
                    </button>
                </div>
                <div
                    class={cx(
                        "mt-2 md:mt-0 hidden w-full",
                        "bg-brand-background",
                        "dark:bg-brand-dark-background",
                        "md:block md:w-auto",
                        "z-20",
                    )}
                    id="navbar-default"
                >
                    <div
                        class={cx(
                            "mt-4 flex flex-col rounded-lg border",
                            "items-start w-full",
                            "border-brand-outline p-4",
                            "dark:border-brand-dark-outline",
                            "font-medium list-none",
                            "md:flex-row md:items-center",
                            "md:my-0 md:space-x-8",
                            "md:border-0 md:p-0",
                        )}
                    >
                        <ul
                            class={cx(
                                "flex flex-col items-start nowrap",
                                "w-full p-0 mt-0 md:my-0",
                                "md:flex-row md:items-center",
                            )}
                        >
                            {navLinks.map((link, index) => {
                                let { isPrivate, label, href } = link;

                                if (isPrivate && !profile) {
                                    return null;
                                }

                                return (
                                    <li class="m-0 flex items-center p-0" key={index}>
                                        <a
                                            class={cx(
                                                "transition-colors",
                                                "no-underline",
                                                "round-sm px-0 md:px-2",
                                                "focus:outline-none",
                                                "dark:focus:ring-brand-dark-focus-ring",
                                                "focus:ring-2 focus:ring-brand-focus-ring",
                                                {
                                                    [cx(
                                                        "text-brand-primary",
                                                        "dark:text-brand-dark-primary",
                                                        "pointer-events-none",
                                                    )]: slug === href,
                                                    [cx("text-brand-text", "dark:text-brand-dark-text")]: slug !== href,
                                                },
                                            )}
                                            href={href}
                                        >
                                            <strong class="text-inherit">{label}</strong>
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                        <ThemeSwitch class="hidden md:block" />
                        {profile && (
                            <Button
                                onClick$={async () => {
                                    await fetch(apiRoutes.logout.path);

                                    window.location.replace(routes.home.path);
                                }}
                                color="primary"
                                variant="fill"
                                text="Logout"
                                size="small"
                                class="m-0"
                                as="button"
                            />
                        )}
                        {!profile && (
                            <Button
                                variant="gradient-outline"
                                class="m-0 h-full w-full"
                                href={routes.login.path}
                                size="x-small"
                                target="_self"
                                text="Login"
                                as="link"
                            />
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
});

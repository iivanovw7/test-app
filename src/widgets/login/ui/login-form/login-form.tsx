import type { CurriedOnChange } from "@/shared/utils";
import type { LoginData } from "#/api";

import { validateLoginDataField, validateLoginData, hasValues } from "@/shared/utils";
import { useVisibleTask$, component$, useContext, $ } from "@builder.io/qwik";
import { Button, Input, Link } from "@/shared/components";
import { RootContext } from "@/shared/context";
import { cx } from "cva";

import { LoginFormContext, LoginContext, LoginType } from "../../model";

export const LoginForm = component$(() => {
    let rootStore = useContext(RootContext);
    let loginStore = useContext(LoginContext);
    let loginFormState = useContext(LoginFormContext);

    useVisibleTask$(({ track }) => {
        track(() => loginFormState.form.email);
        track(() => loginFormState.form.password);

        loginStore.errorMessage = "";
    });

    let handleSubmit = $(async () => {
        let validation = validateLoginData(loginFormState.form);

        loginFormState.setValidationEnabled(true);
        loginFormState.setValidation(validation);

        if (hasValues(validation)) {
            return;
        }

        let profile = await loginStore.submit(LoginType.SIGNIN, loginFormState.form);

        if (profile) {
            rootStore.profile = profile;
            window.location.replace("/");
        }
    });

    let handleInput: CurriedOnChange<keyof LoginData> = (key) => {
        return $((eventData) => {
            let { value } = eventData.target;

            loginFormState.setFormField(key, value);

            if (loginFormState.validationEnabled) {
                loginFormState.setValidationVield(key, validateLoginDataField(key, value));
            }
        });
    };

    let handleSignupClick = $(() => {
        loginFormState.resetValidation();
        loginStore.errorMessage = "";
        loginStore.type = "SIGNUP";
    });

    return (
        <form
            class={cx(
                "flex flex-col justify-start",
                "md:justify-center",
                "px-4 py-0 m-0",
                "min-w-[100%] min-h-[360px]",
                "md:mb-6 md:min-h-[660px]",
                "md:min-w-[450px]",
                "md:px-6 md:py-6",
            )}
            onSubmit$={handleSubmit}
            preventdefault:submit
            method="post"
            noValidate
        >
            <h2 class="my-0 text-brand-text dark:text-brand-dark-text">Login</h2>
            <div class="flex flex-row items-center justify-between">
                <Button
                    onClick$={handleSignupClick}
                    text="Create account"
                    color="tertiary"
                    variant="fill"
                    size="x-small"
                    type="button"
                    as="button"
                />
                <Link target="_self" text="Home" href="/" />
            </div>
            <hr class="mb-6 mt-2 h-px border-0 bg-gray-400 dark:bg-gray-700" />
            <Input
                errorText={loginFormState.validation.email?.toString()}
                value={loginFormState.form.email}
                placeholder="name@flowbite.com"
                onInput$={handleInput("email")}
                id="login-email"
                label="Email"
                type="email"
                required
            />
            <Input
                errorText={loginFormState.validation.password?.toString()}
                value={loginFormState.form.password}
                onInput$={handleInput("password")}
                placeholder="password"
                id="login-password"
                label="Password"
                type="password"
                required
            />
            <Button
                classes={{ text: "font-bold", button: "mt-2" }}
                isLoading={loginStore.isLoading}
                color="primary"
                variant="fill"
                type="submit"
                text="Submit"
            />
            <p class="min-h-[48px] py-1 text-brand-warning">{loginStore.errorMessage}</p>
        </form>
    );
});

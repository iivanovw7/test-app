import type { CurriedOnChange } from "@/shared/utils";
import type { LoginData } from "#/api";

import { Button, Input, Link } from "@/shared/components";
import { RootContext } from "@/shared/context";
import { hasValues, validateLoginData, validateLoginDataField } from "@/shared/utils";
import { $, component$, useContext, useVisibleTask$ } from "@builder.io/qwik";
import { cx } from "cva";

import { LoginContext, LoginFormContext, LoginType } from "../../model";

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
            method="post"
            noValidate
            onSubmit$={handleSubmit}
            preventdefault:submit
        >
            <h2 class="my-0 text-brand-text dark:text-brand-dark-text">Login</h2>
            <div class="flex flex-row items-center justify-between">
                <Button
                    as="button"
                    color="tertiary"
                    onClick$={handleSignupClick}
                    size="x-small"
                    text="Create account"
                    type="button"
                    variant="fill"
                />
                <Link href="/" target="_self" text="Home" />
            </div>
            <hr class="mb-6 mt-2 h-px border-0 bg-gray-400 dark:bg-gray-700" />
            <Input
                errorText={loginFormState.validation.email?.toString()}
                id="login-email"
                label="Email"
                onInput$={handleInput("email")}
                placeholder="name@flowbite.com"
                required
                type="email"
                value={loginFormState.form.email}
            />
            <Input
                errorText={loginFormState.validation.password?.toString()}
                id="login-password"
                label="Password"
                onInput$={handleInput("password")}
                placeholder="password"
                required
                type="password"
                value={loginFormState.form.password}
            />
            <Button
                classes={{ button: "mt-2", text: "font-bold" }}
                color="primary"
                isLoading={loginStore.isLoading}
                text="Submit"
                type="submit"
                variant="fill"
            />
            <p class="my-1 min-h-[48px] py-1 text-brand-warning">{loginStore.errorMessage}</p>
        </form>
    );
});

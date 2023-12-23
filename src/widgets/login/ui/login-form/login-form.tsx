import type { SubmitHandler } from "@/shared/components/forms";
import type { LoginData } from "#/api";

import { component$, useContext, useSignal, useTask$, $ } from "@builder.io/qwik";
import { getValue, useForm } from "@/shared/components/forms";
import { Button, Input, Link } from "@/shared/components";
import { RootContext } from "@/shared/context";
import { cx } from "cva";

import { LoginContext, LoginType } from "../../model";

export type TLoginForm = LoginData;

export const LoginForm = component$(() => {
    let rootStore = useContext(RootContext);
    let loginStore = useContext(LoginContext);
    let errorText = useSignal("");
    let [form, { Field, Form }] = useForm<TLoginForm>({
        loader: {
            value: {
                password: "",
                email: "",
            },
        },
    });

    useTask$(({ track }) => {
        track(() => getValue(form, "email"));
        track(() => getValue(form, "password"));

        errorText.value = "";
    });

    let handleSubmit = $<SubmitHandler<TLoginForm>>(async (values) => {
        let profile = await loginStore.submit(LoginType.SIGNIN, values);

        if (profile) {
            rootStore.profile = profile;
            window.location.replace("/");
        }
    });

    let handleSignupClick = $(() => {
        loginStore.errorMessage = "";
        loginStore.type = "SIGNUP";
    });

    return (
        <Form
            class={cx(
                "flex flex-col justify-center",
                "px-4 py-0 m-0",
                "min-w-[100%] min-h-[360px]",
                "md:mb-6 md:min-h-[660px]",
                "md:min-w-[450px]",
                "md:px-6 md:py-6",
            )}
            onSubmit$={handleSubmit}
        >
            <h3 class="my-0 text-brand-text dark:text-brand-dark-text">Login</h3>
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
            <Field name="email">
                {(field, properties) => (
                    <Input
                        {...properties}
                        classes={{
                            container: "mt-6",
                        }}
                        placeholder="name@flowbite.com"
                        value={field.value}
                        id="login-email"
                        label="Email"
                        type="email"
                        required
                    />
                )}
            </Field>
            <Field name="password">
                {(field, properties) => (
                    <Input
                        {...properties}
                        classes={{
                            container: "mt-6",
                        }}
                        placeholder="password"
                        id="login-password"
                        value={field.value}
                        label="Password"
                        type="password"
                        required
                    />
                )}
            </Field>
            <Button
                classes={{ text: "font-bold", button: "mt-6" }}
                isLoading={loginStore.isLoading}
                color="primary"
                variant="fill"
                type="submit"
                text="Submit"
            />
            <p class="min-h-[48px] text-brand-warning">{loginStore.errorMessage}</p>
        </Form>
    );
});

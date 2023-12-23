import type { SubmitHandler } from "@/shared/components/forms";
import type { UserSignupData } from "#/api";

import { component$, useContext, useSignal, useTask$, $ } from "@builder.io/qwik";
import { getValue, useForm } from "@/shared/components/forms";
import { Button, Input, Link } from "@/shared/components";
import { RootContext } from "@/shared/context";
import { cx } from "cva";

import { LoginContext, LoginType } from "../../model";

export type TSignupForm = UserSignupData;

export const SignupForm = component$(() => {
    let rootStore = useContext(RootContext);
    let loginStore = useContext(LoginContext);
    let errorText = useSignal("");
    let [form, { Field, Form }] = useForm<TSignupForm>({
        loader: {
            value: {
                firstName: "",
                password: "",
                lastName: "",
                email: "",
            },
        },
    });

    useTask$(({ track }) => {
        track(() => getValue(form, "email"));
        track(() => getValue(form, "password"));
        track(() => getValue(form, "firstName"));
        track(() => getValue(form, "lastName"));

        errorText.value = "";
    });

    let handleSubmit = $<SubmitHandler<TSignupForm>>(async (values) => {
        let profile = await loginStore.submit(LoginType.SIGNUP, values);

        if (profile) {
            rootStore.profile = profile;
            window.location.replace("/");
        }
    });

    let handleSigninClick = $(() => {
        loginStore.type = "SIGNIN";
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
            <h3 class="my-0 text-brand-text dark:text-brand-dark-text">Create account</h3>
            <div class="flex flex-row items-center justify-between">
                <Button
                    onClick$={handleSigninClick}
                    color="tertiary"
                    variant="fill"
                    size="x-small"
                    type="button"
                    text="Login"
                    as="button"
                />
                <Link target="_self" text="Home" href="/" />
            </div>
            <Field name="firstName">
                {(field, properties) => (
                    <Input
                        {...properties}
                        classes={{
                            container: "mt-6",
                        }}
                        value={field.value}
                        placeholder="name"
                        id="signup-name"
                        label="Name"
                        type="text"
                        required
                    />
                )}
            </Field>
            <Field name="lastName">
                {(field, properties) => (
                    <Input
                        {...properties}
                        classes={{
                            container: "mt-6",
                        }}
                        placeholder="last name"
                        id="signup-last-name"
                        value={field.value}
                        label="Last name"
                        type="text"
                        required
                    />
                )}
            </Field>
            <Field name="email">
                {(field, properties) => (
                    <Input
                        {...properties}
                        classes={{
                            container: "mt-6",
                        }}
                        placeholder="name@flowbite.com"
                        value={field.value}
                        id="signup-email"
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
                        id="signup-password"
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
            <p class="min-h-[48px] text-brand-warning">{errorText.value}</p>
        </Form>
    );
});

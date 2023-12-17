import type { SubmitHandler } from "@/shared/components/forms";

import { component$, useContext, useSignal, useTask$, $ } from "@builder.io/qwik";
import { getValue, useForm } from "@/shared/components/forms";
import { Button, Input, Link } from "@/shared/components";
import { RootContext } from "@/shared/context";
import { cx } from "cva";

export type TLoginForm = {
    password: string;
    email: string;
};

export const LoginForm = component$(() => {
    let rootStore = useContext(RootContext);
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
        let response = await fetch("/api/auth/login", { body: JSON.stringify(values), method: "POST" });
        let result = await response.json();

        if (result.success) {
            rootStore.profile = result.data;
            window.location.replace("/");
        } else {
            errorText.value = result?.message;
        }
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
                <Link text="Create account" target="_self" href="/" />
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
                        type="password"
                        required
                    />
                )}
            </Field>
            <Button textClass="font-bold" color="primary" variant="fill" type="submit" text="Submit" class="mt-6" />
            <p class="min-h-[48px] text-brand-warning">{errorText.value}</p>
        </Form>
    );
});

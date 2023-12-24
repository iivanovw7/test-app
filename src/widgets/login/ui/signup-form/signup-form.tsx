import type { SubmitHandler } from "@/shared/components/forms";
import type { UserSignupData } from "#/api";

import { component$, useContext, useTask$, $ } from "@builder.io/qwik";
import { Textarea, Button, Input, Link } from "@/shared/components";
import { getValue, useForm } from "@/shared/components/forms";
import { RootContext } from "@/shared/context";
import { cx } from "cva";

import { LoginContext, LoginType } from "../../model";

export type TSignupForm = UserSignupData;

export const SignupForm = component$(() => {
    let rootStore = useContext(RootContext);
    let loginStore = useContext(LoginContext);
    let [form, { Field, Form }] = useForm<TSignupForm>({
        loader: {
            value: {
                postalCode: "",
                firstName: "",
                apartment: "",
                password: "",
                lastName: "",
                building: "",
                country: "",
                street: "",
                email: "",
                phone: "",
                city: "",
            },
        },
    });

    useTask$(({ track }) => {
        track(() => getValue(form, "email"));
        track(() => getValue(form, "password"));
        track(() => getValue(form, "firstName"));
        track(() => getValue(form, "lastName"));
        track(() => getValue(form, "phone"));
        track(() => getValue(form, "postalCode"));
        track(() => getValue(form, "apartment"));
        track(() => getValue(form, "building"));
        track(() => getValue(form, "street"));
        track(() => getValue(form, "city"));

        loginStore.errorMessage = "";
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
                "flex flex-col justify-start",
                "md:justify-center",
                "px-4 py-0 m-0",
                "min-w-[100%] min-h-[360px]",
                "md:mb-6",
                "md:min-w-[450px]",
                "md:px-8 md:py-2",
            )}
            onSubmit$={handleSubmit}
        >
            <h2 class="my-0 text-brand-text dark:text-brand-dark-text">Create account</h2>
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
            <hr class="my-2 h-px border-0 bg-gray-400 dark:bg-gray-700" />
            <div class="flex flex-col items-start justify-center gap-6 md:flex-row">
                <div class="flex w-full flex-col">
                    <h4 class="mt-3 text-brand-text dark:text-brand-dark-text">Profile</h4>
                    <Field name="firstName">
                        {(field, properties) => (
                            <Input
                                {...properties}
                                classes={{
                                    container: "mt-0",
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
                                    container: "mt-2",
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
                                    container: "mt-2",
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
                    <Field name="phone">
                        {(field, properties) => (
                            <Input
                                {...properties}
                                classes={{
                                    container: "mt-2",
                                }}
                                placeholder="+7 900 990 99 99"
                                value={field.value}
                                id="signup-phone"
                                label="Phone"
                                type="text"
                                required
                            />
                        )}
                    </Field>
                    <Field name="password">
                        {(field, properties) => (
                            <Input
                                {...properties}
                                classes={{
                                    container: "mt-2",
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
                </div>
                <div class="flex w-full flex-col">
                    <h4 class="mt-3 text-brand-text dark:text-brand-dark-text">Address</h4>
                    <Field name="country">
                        {(field, properties) => (
                            <Input
                                {...properties}
                                classes={{
                                    container: "mt-0",
                                }}
                                placeholder="country"
                                value={field.value}
                                id="signup-country"
                                label="Country"
                                type="text"
                                required
                            />
                        )}
                    </Field>
                    <Field name="city">
                        {(field, properties) => (
                            <Input
                                {...properties}
                                classes={{
                                    container: "mt-2",
                                }}
                                value={field.value}
                                placeholder="city"
                                id="signup-city"
                                label="City"
                                type="text"
                                required
                            />
                        )}
                    </Field>
                    <Field name="building">
                        {(field, properties) => (
                            <Input
                                {...properties}
                                classes={{
                                    container: "mt-2",
                                }}
                                placeholder="building"
                                id="signup-building"
                                value={field.value}
                                label="Building"
                                type="text"
                                required
                            />
                        )}
                    </Field>
                    <Field name="apartment">
                        {(field, properties) => (
                            <Input
                                {...properties}
                                classes={{
                                    container: "mt-2",
                                }}
                                placeholder="apartment"
                                id="signup-apartment"
                                value={field.value}
                                label="Apartment"
                                type="text"
                                required
                            />
                        )}
                    </Field>
                    <Field name="postalCode">
                        {(field, properties) => (
                            <Input
                                {...properties}
                                classes={{
                                    container: "mt-2",
                                }}
                                placeholder="postalCode"
                                id="signup-postal-code"
                                value={field.value}
                                label="Postal code"
                                type="text"
                                required
                            />
                        )}
                    </Field>
                    <Field name="street">
                        {(field, properties) => (
                            <Textarea
                                {...properties}
                                classes={{
                                    container: "mt-2",
                                }}
                                placeholder="street"
                                value={field.value}
                                id="signup-street"
                                label="Street"
                                required
                            />
                        )}
                    </Field>
                </div>
            </div>
            <Button
                classes={{
                    button: cx("mt-6 w-full", "md:ml-auto md:mr-0 md:w-[calc(50%-0.75rem)]"),
                    text: "font-bold",
                }}
                isLoading={loginStore.isLoading}
                color="primary"
                variant="fill"
                type="submit"
                text="Submit"
            />
            <p class="min-h-[48px] py-1 text-brand-warning">{loginStore.errorMessage}</p>
        </Form>
    );
});

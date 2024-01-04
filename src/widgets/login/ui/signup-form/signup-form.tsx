import type { CurriedOnChange } from "@/shared/utils";
import type { UserSignupData } from "#/api";

import { Button, Input, InputPhone, Link, PhonePrefix, Select, Textarea, toPhoneNumber } from "@/shared/components";
import { RootContext } from "@/shared/context";
import { CountryMap, hasValues, validateSignupData, validateSignupDataField } from "@/shared/utils";
import { $, component$, useContext, useSignal, useTask$ } from "@builder.io/qwik";
import { cx } from "cva";

import { LoginContext, LoginType, SignupFormContext } from "../../model";

export type TSignupForm = UserSignupData;

const INITIAL_PHONE_PREFIX = PhonePrefix[CountryMap.RUSSIA];

export const SignupForm = component$(() => {
    let rootStore = useContext(RootContext);
    let state = useContext(LoginContext);
    let formState = useContext(SignupFormContext);

    let phonePrefix = useSignal<string>(INITIAL_PHONE_PREFIX);

    useTask$(({ track }) => {
        track(() => formState.form.password);
        track(() => formState.form.firstName);
        track(() => formState.form.lastName);
        track(() => formState.form.phone);
        track(() => formState.form.street);
        track(() => formState.form.apartment);
        track(() => formState.form.building);
        track(() => formState.form.street);
        track(() => formState.form.city);
        track(() => formState.form.country);

        state.errorMessage = "";
    });

    useTask$(({ track }) => {
        track(() => formState.form.country);

        let { country } = formState.form;

        phonePrefix.value = PhonePrefix[country];
    });

    let handleSubmit = $(async () => {
        let validation = validateSignupData(formState.form);

        formState.setValidationEnabled(true);
        formState.setValidation(validation);

        if (hasValues(validation)) {
            return;
        }

        let profile = await state.submit(LoginType.SIGNUP, formState.form);

        if (profile) {
            rootStore.profile = profile;
            window.location.replace("/");
        }
    });

    let handleInput: CurriedOnChange<keyof UserSignupData> = (key) => {
        return $(({ target: { value } }) => {
            let formatted = key === "phone" ? toPhoneNumber(value) : value;

            formState.setFormField(key, formatted);

            if (formState.validationEnabled) {
                formState.setValidationVield(key, validateSignupDataField(key, formatted, formState.form.country));
            }
        });
    };

    let handleSigninClick = $(() => {
        formState.resetValidation();
        state.errorMessage = "";
        state.type = "SIGNIN";
    });

    return (
        <form
            class={cx(
                "flex flex-col justify-start",
                "md:justify-center",
                "px-4 py-0 m-0",
                "min-w-[100%] min-h-[360px]",
                "md:mb-6",
                "md:min-w-[450px]",
                "md:px-8 md:py-2",
            )}
            method="post"
            noValidate
            onSubmit$={handleSubmit}
            preventdefault:submit
        >
            <h2 class="my-0 text-brand-text dark:text-brand-dark-text">Create account</h2>
            <div class="flex flex-row items-center justify-between">
                <Button
                    as="button"
                    color="tertiary"
                    onClick$={handleSigninClick}
                    size="x-small"
                    text="Login"
                    type="button"
                    variant="fill"
                />
                <Link href="/" target="_self" text="Home" />
            </div>
            <hr class="my-2 h-px border-0 bg-gray-400 dark:bg-gray-700" />
            <div class="flex flex-col items-start justify-center gap-6 md:flex-row">
                <div class="flex w-full flex-col">
                    <h4 class="mt-3 text-brand-text dark:text-brand-dark-text">Profile</h4>
                    <Input
                        errorText={formState.validation.firstName?.toString()}
                        id="signup-name"
                        label="Name"
                        onInput$={handleInput("firstName")}
                        placeholder="name"
                        required
                        type="text"
                        value={formState.form.firstName}
                    />
                    <Input
                        errorText={formState.validation.lastName?.toString()}
                        id="signup-last-name"
                        label="Last name"
                        onInput$={handleInput("lastName")}
                        placeholder="last name"
                        required
                        type="text"
                        value={formState.form.lastName}
                    />
                    <Input
                        errorText={formState.validation.email?.toString()}
                        id="signup-email"
                        label="Email"
                        onInput$={handleInput("email")}
                        placeholder="name@flowbite.com"
                        required
                        type="email"
                        value={formState.form.email}
                    />
                    <InputPhone
                        errorText={formState.validation.phone?.toString()}
                        id="signup-phone"
                        label="Phone"
                        onInput$={handleInput("phone")}
                        placeholder="9998885566"
                        prefix={phonePrefix.value}
                        required
                        type="tel"
                        value={formState.form.phone}
                    />
                    <Input
                        errorText={formState.validation.password?.toString()}
                        id="signup-password"
                        label="Password"
                        onInput$={handleInput("password")}
                        placeholder="password"
                        required
                        type="password"
                        value={formState.form.password}
                    />
                </div>
                <div class="flex w-full flex-col">
                    <h4 class="mt-3 text-brand-text dark:text-brand-dark-text">Address</h4>
                    <Select
                        disabled
                        id="signup-country"
                        label="Country"
                        options={Object.values(CountryMap).map((country) => ({
                            value: country,
                        }))}
                        placeholder="country"
                        required
                        value={formState.form.country}
                    />
                    <Input
                        errorText={formState.validation.city?.toString()}
                        id="signup-city"
                        label="City"
                        onInput$={handleInput("city")}
                        placeholder="city"
                        required
                        type="text"
                        value={formState.form.city}
                    />
                    <Input
                        errorText={formState.validation.building?.toString()}
                        id="signup-building"
                        label="Building"
                        onInput$={handleInput("building")}
                        placeholder="building"
                        required
                        type="text"
                        value={formState.form.building}
                    />
                    <Input
                        errorText={formState.validation.apartment?.toString()}
                        id="signup-apartment"
                        label="Apartment"
                        onInput$={handleInput("apartment")}
                        placeholder="apartment"
                        required
                        type="text"
                        value={formState.form.apartment}
                    />
                    <Input
                        errorText={formState.validation.postalCode?.toString()}
                        id="signup-postal-code"
                        label="Postal code"
                        onInput$={handleInput("postalCode")}
                        placeholder="postalCode"
                        required
                        type="text"
                        value={formState.form.postalCode}
                    />
                    <Textarea
                        errorText={formState.validation.street?.toString()}
                        id="signup-street"
                        label="Street"
                        onInput$={handleInput("street")}
                        placeholder="street"
                        required
                        value={formState.form.street}
                    />
                </div>
            </div>
            <Button
                classes={{
                    button: cx("mt-2 w-full", "md:ml-auto md:mr-0 md:w-[calc(50%-0.75rem)]"),
                    text: "font-bold",
                }}
                color="primary"
                isLoading={state.isLoading}
                text="Submit"
                type="submit"
                variant="fill"
            />
            <p class="my-1 min-h-[48px] py-1 text-right text-brand-warning">{state.errorMessage}</p>
        </form>
    );
});

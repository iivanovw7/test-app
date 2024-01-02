import type { CurriedOnChange } from "@/shared/utils";
import type { UserSignupData } from "#/api";

import { toPhoneNumber, PhonePrefix, InputPhone, Textarea, Button, Select, Input, Link } from "@/shared/components";
import { validateSignupDataField, validateSignupData, CountryMap, hasValues } from "@/shared/utils";
import { component$, useContext, useSignal, useTask$, $ } from "@builder.io/qwik";
import { RootContext } from "@/shared/context";
import { cx } from "cva";

import { SignupFormContext, LoginContext, LoginType } from "../../model";

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
            onSubmit$={handleSubmit}
            preventdefault:submit
            method="post"
            noValidate
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
                    <Input
                        errorText={formState.validation.firstName?.toString()}
                        onInput$={handleInput("firstName")}
                        value={formState.form.firstName}
                        placeholder="name"
                        id="signup-name"
                        label="Name"
                        type="text"
                        required
                    />
                    <Input
                        errorText={formState.validation.lastName?.toString()}
                        onInput$={handleInput("lastName")}
                        value={formState.form.lastName}
                        placeholder="last name"
                        id="signup-last-name"
                        label="Last name"
                        type="text"
                        required
                    />
                    <Input
                        errorText={formState.validation.email?.toString()}
                        placeholder="name@flowbite.com"
                        onInput$={handleInput("email")}
                        value={formState.form.email}
                        id="signup-email"
                        label="Email"
                        type="email"
                        required
                    />
                    <InputPhone
                        errorText={formState.validation.phone?.toString()}
                        onInput$={handleInput("phone")}
                        value={formState.form.phone}
                        prefix={phonePrefix.value}
                        placeholder="9998885566"
                        id="signup-phone"
                        label="Phone"
                        type="tel"
                        required
                    />
                    <Input
                        errorText={formState.validation.password?.toString()}
                        onInput$={handleInput("password")}
                        value={formState.form.password}
                        placeholder="password"
                        id="signup-password"
                        label="Password"
                        type="password"
                        required
                    />
                </div>
                <div class="flex w-full flex-col">
                    <h4 class="mt-3 text-brand-text dark:text-brand-dark-text">Address</h4>
                    <Select
                        options={Object.values(CountryMap).map((country) => ({
                            value: country,
                        }))}
                        value={formState.form.country}
                        placeholder="country"
                        id="signup-country"
                        label="Country"
                        required
                        disabled
                    />
                    <Input
                        errorText={formState.validation.city?.toString()}
                        onInput$={handleInput("city")}
                        value={formState.form.city}
                        placeholder="city"
                        id="signup-city"
                        label="City"
                        type="text"
                        required
                    />
                    <Input
                        errorText={formState.validation.building?.toString()}
                        onInput$={handleInput("building")}
                        value={formState.form.building}
                        placeholder="building"
                        id="signup-building"
                        label="Building"
                        type="text"
                        required
                    />
                    <Input
                        errorText={formState.validation.apartment?.toString()}
                        onInput$={handleInput("apartment")}
                        value={formState.form.apartment}
                        placeholder="apartment"
                        id="signup-apartment"
                        label="Apartment"
                        type="text"
                        required
                    />
                    <Input
                        errorText={formState.validation.postalCode?.toString()}
                        onInput$={handleInput("postalCode")}
                        value={formState.form.postalCode}
                        placeholder="postalCode"
                        id="signup-postal-code"
                        label="Postal code"
                        type="text"
                        required
                    />
                    <Textarea
                        errorText={formState.validation.street?.toString()}
                        onInput$={handleInput("street")}
                        value={formState.form.street}
                        placeholder="street"
                        id="signup-street"
                        label="Street"
                        required
                    />
                </div>
            </div>
            <Button
                classes={{
                    button: cx("mt-2 w-full", "md:ml-auto md:mr-0 md:w-[calc(50%-0.75rem)]"),
                    text: "font-bold",
                }}
                isLoading={state.isLoading}
                color="primary"
                variant="fill"
                type="submit"
                text="Submit"
            />
            <p class="my-1 min-h-[48px] py-1 text-right text-brand-warning">{state.errorMessage}</p>
        </form>
    );
});

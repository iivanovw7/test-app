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
    let loginStore = useContext(LoginContext);
    let signupFormStore = useContext(SignupFormContext);

    let phonePrefix = useSignal<string>(INITIAL_PHONE_PREFIX);

    useTask$(({ track }) => {
        track(() => signupFormStore.form.email);
        track(() => signupFormStore.form.password);
        track(() => signupFormStore.form.firstName);
        track(() => signupFormStore.form.lastName);
        track(() => signupFormStore.form.phone);
        track(() => signupFormStore.form.street);
        track(() => signupFormStore.form.apartment);
        track(() => signupFormStore.form.building);
        track(() => signupFormStore.form.street);
        track(() => signupFormStore.form.city);
        track(() => signupFormStore.form.country);

        loginStore.errorMessage = "";
    });

    useTask$(({ track }) => {
        track(() => signupFormStore.form.country);

        let { country } = signupFormStore.form;

        phonePrefix.value = PhonePrefix[country];
    });

    let handleSubmit = $(async () => {
        let validation = validateSignupData(signupFormStore.form);

        signupFormStore.setValidationEnabled(true);
        signupFormStore.setValidation(validation);

        if (hasValues(validation)) {
            return;
        }

        let profile = await loginStore.submit(LoginType.SIGNUP, signupFormStore.form);

        if (profile) {
            rootStore.profile = profile;
            window.location.replace("/");
        }
    });

    let handleInput: CurriedOnChange<keyof UserSignupData> = (key) => {
        return $(({ target: { value } }) => {
            let formatted = key === "phone" ? toPhoneNumber(value) : value;

            signupFormStore.setFormField(key, formatted);

            if (signupFormStore.validationEnabled) {
                signupFormStore.setValidationVield(
                    key,
                    validateSignupDataField(key, formatted, signupFormStore.form.country),
                );
            }
        });
    };

    let handleSigninClick = $(() => {
        signupFormStore.resetValidation();
        loginStore.errorMessage = "";
        loginStore.type = "SIGNIN";
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
                        errorText={signupFormStore.validation.firstName?.toString()}
                        value={signupFormStore.form.firstName}
                        onInput$={handleInput("firstName")}
                        placeholder="name"
                        id="signup-name"
                        label="Name"
                        type="text"
                        required
                    />
                    <Input
                        errorText={signupFormStore.validation.lastName?.toString()}
                        value={signupFormStore.form.lastName}
                        onInput$={handleInput("lastName")}
                        placeholder="last name"
                        id="signup-last-name"
                        label="Last name"
                        type="text"
                        required
                    />
                    <Input
                        errorText={signupFormStore.validation.email?.toString()}
                        value={signupFormStore.form.email}
                        placeholder="name@flowbite.com"
                        onInput$={handleInput("email")}
                        id="signup-email"
                        label="Email"
                        type="email"
                        required
                    />
                    <InputPhone
                        errorText={signupFormStore.validation.phone?.toString()}
                        value={signupFormStore.form.phone}
                        onInput$={handleInput("phone")}
                        prefix={phonePrefix.value}
                        placeholder="9998885566"
                        id="signup-phone"
                        label="Phone"
                        type="tel"
                        required
                    />
                    <Input
                        errorText={signupFormStore.validation.password?.toString()}
                        value={signupFormStore.form.password}
                        onInput$={handleInput("password")}
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
                        value={signupFormStore.form.country}
                        placeholder="country"
                        id="signup-country"
                        label="Country"
                        required
                        disabled
                    />
                    <Input
                        errorText={signupFormStore.validation.city?.toString()}
                        value={signupFormStore.form.city}
                        onInput$={handleInput("city")}
                        placeholder="city"
                        id="signup-city"
                        label="City"
                        type="text"
                        required
                    />
                    <Input
                        errorText={signupFormStore.validation.building?.toString()}
                        value={signupFormStore.form.building}
                        onInput$={handleInput("building")}
                        placeholder="building"
                        id="signup-building"
                        label="Building"
                        type="text"
                        required
                    />
                    <Input
                        errorText={signupFormStore.validation.apartment?.toString()}
                        value={signupFormStore.form.apartment}
                        onInput$={handleInput("apartment")}
                        placeholder="apartment"
                        id="signup-apartment"
                        label="Apartment"
                        type="text"
                        required
                    />
                    <Input
                        errorText={signupFormStore.validation.postalCode?.toString()}
                        value={signupFormStore.form.postalCode}
                        onInput$={handleInput("postalCode")}
                        placeholder="postalCode"
                        id="signup-postal-code"
                        label="Postal code"
                        type="text"
                        required
                    />
                    <Textarea
                        errorText={signupFormStore.validation.street?.toString()}
                        value={signupFormStore.form.street}
                        onInput$={handleInput("street")}
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
                isLoading={loginStore.isLoading}
                color="primary"
                variant="fill"
                type="submit"
                text="Submit"
            />
            <p class="min-h-[48px] py-1 text-right text-brand-warning">{loginStore.errorMessage}</p>
        </form>
    );
});

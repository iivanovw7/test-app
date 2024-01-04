import type { CurriedOnChange } from "@/shared/utils";

import { Button, Input, InputPhone, PhonePrefix, Select, Textarea, toPhoneNumber } from "@/shared/components";
import { RootContext } from "@/shared/context";
import { CountryMap, equals, hasValues, validateProfileData, validateSignupDataField } from "@/shared/utils";
import { $, component$, useContext, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { cx } from "cva";

import type { ProfileContactsFormFields } from "../../model";

import { ProfileContactsFormContext } from "../../model";

const INITIAL_PHONE_PREFIX = PhonePrefix[CountryMap.RUSSIA];

export const ProfileContactsForm = component$(() => {
    let rootStore = useContext(RootContext);
    let state = useContext(ProfileContactsFormContext);
    let hasChanges = useSignal(false);
    let phonePrefix = useSignal<string>(INITIAL_PHONE_PREFIX);

    useVisibleTask$(({ track }) => {
        track(() => state.form.phone);
        track(() => state.form.telegram);
        track(() => state.form.whatsapp);
        track(() => state.form.country);
        track(() => state.form.postalCode);
        track(() => state.form.building);
        track(() => state.form.apartment);
        track(() => state.form.street);
        track(() => state.form.city);
        track(() => state.form.postalCode);

        state.errorMessage = "";
        state.successMessage = "";
    });

    useVisibleTask$(({ track }) => {
        track(() => state.form.country);

        let { country } = state.form;

        phonePrefix.value = PhonePrefix[country || CountryMap.RUSSIA];
    });

    useVisibleTask$(({ track }) => {
        track(() => state.form.phone);
        track(() => state.form.telegram);
        track(() => state.form.whatsapp);
        track(() => state.form.country);
        track(() => state.form.postalCode);
        track(() => state.form.building);
        track(() => state.form.apartment);
        track(() => state.form.street);
        track(() => state.form.city);
        track(() => state.form.postalCode);
        track(() => state.initialForm.phone);
        track(() => state.initialForm.telegram);
        track(() => state.initialForm.whatsapp);
        track(() => state.initialForm.country);
        track(() => state.initialForm.postalCode);
        track(() => state.initialForm.building);
        track(() => state.initialForm.apartment);
        track(() => state.initialForm.street);
        track(() => state.initialForm.city);

        hasChanges.value = !equals(state.initialForm, state.form);
    });

    let handleSubmit = $(async () => {
        state.errorMessage = "";
        state.successMessage = "";

        let validation = validateProfileData(state.form);

        state.setValidationEnabled(true);
        state.setValidation(validation);

        if (hasValues(validation)) {
            return;
        }

        let profile = await state.update(state.form);

        if (profile) {
            state.successMessage = "Profile contacts updated";
            state.initialForm = { ...state.form };
            rootStore.profile = profile;
        }
    });

    let handleInput: CurriedOnChange<keyof ProfileContactsFormFields> = (key) => {
        return $(({ target: { value } }) => {
            let formatted = key === "phone" ? toPhoneNumber(value) : value;

            state.setFormField(key, formatted);

            if (state.validationEnabled) {
                state.setValidationVield(key, validateSignupDataField(key, formatted, state.form.country));
            }
        });
    };

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
            <h2 class="my-0 text-brand-text dark:text-brand-dark-text">Edit profile contacts</h2>
            <hr class="my-2 h-px border-0 bg-gray-400 dark:bg-gray-700" />
            <div class={cx("flex flex-col md:flex-row")}>
                <div class={cx("flex flex-col items-start basis-2/4", "justify-center gap-6 md:flex-row")}>
                    <div class="flex w-full flex-col pr-6 pt-4">
                        <InputPhone
                            errorText={state.validation.phone?.toString()}
                            id="profile-contacts-form-phone"
                            label="Phone"
                            onInput$={handleInput("phone")}
                            placeholder="9998885566"
                            prefix={phonePrefix.value}
                            required
                            type="tel"
                            value={state.form.phone}
                        />
                        <Input
                            errorText={state.validation.telegram?.toString()}
                            id="profile-contacts-form-telegram"
                            label="Telegram"
                            onInput$={handleInput("telegram")}
                            placeholder="https://t.me/username"
                            required
                            type="text"
                            value={state.form.telegram}
                        />
                        <Input
                            errorText={state.validation.whatsapp?.toString()}
                            id="profile-contacts-form-whatsapp"
                            label="Whatsapp"
                            onInput$={handleInput("whatsapp")}
                            placeholder="https://wa.me/message/your unique code"
                            required
                            type="text"
                            value={state.form.whatsapp}
                        />
                    </div>
                </div>
                <div class={cx("flex flex-col items-start basis-2/4", "justify-center gap-6 md:flex-row")}>
                    <div class="flex w-full flex-col pr-6 pt-4">
                        <Select
                            disabled
                            id="profile-contacts-form-country"
                            label="Country"
                            options={Object.values(CountryMap).map((country) => ({
                                value: country,
                            }))}
                            placeholder="country"
                            required
                            value={state.form.country}
                        />
                        <Input
                            errorText={state.validation.city?.toString()}
                            id="profile-contacts-form-city"
                            label="City"
                            onInput$={handleInput("city")}
                            placeholder="city"
                            required
                            type="text"
                            value={state.form.city}
                        />
                        <Input
                            errorText={state.validation.building?.toString()}
                            id="profile-contacts-form-building"
                            label="Building"
                            onInput$={handleInput("building")}
                            placeholder="building"
                            required
                            type="text"
                            value={state.form.building}
                        />
                        <Input
                            errorText={state.validation.apartment?.toString()}
                            id="profile-contacts-form-apartment"
                            label="Apartment"
                            onInput$={handleInput("apartment")}
                            placeholder="apartment"
                            required
                            type="text"
                            value={state.form.apartment}
                        />
                        <Input
                            errorText={state.validation.postalCode?.toString()}
                            id="profile-contacts-form-postal-code"
                            label="Postal code"
                            onInput$={handleInput("postalCode")}
                            placeholder="postalCode"
                            required
                            type="text"
                            value={state.form.postalCode}
                        />
                        <Textarea
                            errorText={state.validation.street?.toString()}
                            id="profile-contacts-form-street"
                            label="Street"
                            onInput$={handleInput("street")}
                            placeholder="street"
                            required
                            value={state.form.street}
                        />
                        <Button
                            classes={{
                                button: cx("mt-2 w-48 ml-auto mr-0"),
                                text: "font-bold",
                            }}
                            color="primary"
                            disabled={!hasChanges.value}
                            isLoading={state.isLoading}
                            text="Submit"
                            type="submit"
                            variant="fill"
                        />
                        <p
                            class={cx("my-1 min-h-[48px] py-1 text-right", {
                                "text-brand-success": !!state.successMessage && !state.errorMessage,
                                "text-brand-warning": !!state.errorMessage,
                            })}
                        >
                            {state.errorMessage || state.successMessage}
                        </p>
                    </div>
                </div>
            </div>
        </form>
    );
});

import type { CurriedOnChange } from "@/shared/utils";

import { toPhoneNumber, PhonePrefix, InputPhone, Textarea, Button, Select, Input } from "@/shared/components";
import { validateSignupDataField, validateProfileData, CountryMap, hasValues, equals } from "@/shared/utils";
import { useVisibleTask$, component$, useContext, useSignal, $ } from "@builder.io/qwik";
import { RootContext } from "@/shared/context";
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
            onSubmit$={handleSubmit}
            preventdefault:submit
            method="post"
            noValidate
        >
            <h2 class="my-0 text-brand-text dark:text-brand-dark-text">Edit profile contacts</h2>
            <hr class="my-2 h-px border-0 bg-gray-400 dark:bg-gray-700" />
            <div class={cx("flex flex-col md:flex-row")}>
                <div class={cx("flex flex-col items-start basis-2/4", "justify-center gap-6 md:flex-row")}>
                    <div class="flex w-full flex-col pr-6 pt-4">
                        <InputPhone
                            errorText={state.validation.phone?.toString()}
                            id="profile-contacts-form-phone"
                            onInput$={handleInput("phone")}
                            prefix={phonePrefix.value}
                            value={state.form.phone}
                            placeholder="9998885566"
                            label="Phone"
                            type="tel"
                            required
                        />
                        <Input
                            errorText={state.validation.telegram?.toString()}
                            placeholder="https://t.me/username"
                            id="profile-contacts-form-telegram"
                            onInput$={handleInput("telegram")}
                            value={state.form.telegram}
                            label="Telegram"
                            type="text"
                            required
                        />
                        <Input
                            placeholder="https://wa.me/message/your unique code"
                            errorText={state.validation.whatsapp?.toString()}
                            id="profile-contacts-form-whatsapp"
                            onInput$={handleInput("whatsapp")}
                            value={state.form.whatsapp}
                            label="Whatsapp"
                            type="text"
                            required
                        />
                    </div>
                </div>
                <div class={cx("flex flex-col items-start basis-2/4", "justify-center gap-6 md:flex-row")}>
                    <div class="flex w-full flex-col pr-6 pt-4">
                        <Select
                            options={Object.values(CountryMap).map((country) => ({
                                value: country,
                            }))}
                            id="profile-contacts-form-country"
                            value={state.form.country}
                            placeholder="country"
                            label="Country"
                            required
                            disabled
                        />
                        <Input
                            errorText={state.validation.city?.toString()}
                            id="profile-contacts-form-city"
                            onInput$={handleInput("city")}
                            value={state.form.city}
                            placeholder="city"
                            label="City"
                            type="text"
                            required
                        />
                        <Input
                            errorText={state.validation.building?.toString()}
                            id="profile-contacts-form-building"
                            onInput$={handleInput("building")}
                            value={state.form.building}
                            placeholder="building"
                            label="Building"
                            type="text"
                            required
                        />
                        <Input
                            errorText={state.validation.apartment?.toString()}
                            id="profile-contacts-form-apartment"
                            onInput$={handleInput("apartment")}
                            value={state.form.apartment}
                            placeholder="apartment"
                            label="Apartment"
                            type="text"
                            required
                        />
                        <Input
                            errorText={state.validation.postalCode?.toString()}
                            id="profile-contacts-form-postal-code"
                            onInput$={handleInput("postalCode")}
                            value={state.form.postalCode}
                            placeholder="postalCode"
                            label="Postal code"
                            type="text"
                            required
                        />
                        <Textarea
                            errorText={state.validation.street?.toString()}
                            id="profile-contacts-form-street"
                            onInput$={handleInput("street")}
                            value={state.form.street}
                            placeholder="street"
                            label="Street"
                            required
                        />
                        <Button
                            classes={{
                                button: cx("mt-2 w-48 ml-auto mr-0"),
                                text: "font-bold",
                            }}
                            disabled={!hasChanges.value}
                            isLoading={state.isLoading}
                            color="primary"
                            variant="fill"
                            type="submit"
                            text="Submit"
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

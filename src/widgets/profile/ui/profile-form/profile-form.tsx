import type { CurriedOnChange } from "@/shared/utils";

import { Button, Input } from "@/shared/components";
import { RootContext } from "@/shared/context";
import { equals, hasValues, validateProfileData, validateSignupDataField } from "@/shared/utils";
import { $, component$, useContext, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { cx } from "cva";
import dayjs from "dayjs";

import type { ProfileFormFields } from "../../model";

import { ProfileFormContext } from "../../model";

export const ProfileForm = component$(() => {
    let rootStore = useContext(RootContext);
    let state = useContext(ProfileFormContext);
    let hasChanges = useSignal(false);

    useVisibleTask$(({ track }) => {
        track(() => state.form.firstName);
        track(() => state.form.lastName);

        state.errorMessage = "";
        state.successMessage = "";
    });

    useVisibleTask$(({ track }) => {
        track(() => state.form.firstName);
        track(() => state.form.lastName);
        track(() => state.initialForm.firstName);
        track(() => state.initialForm.lastName);

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
            state.successMessage = "Profile updated";
            state.initialForm = { ...state.form };
            rootStore.profile = profile;
        }
    });

    let handleInput: CurriedOnChange<keyof ProfileFormFields> = (key) => {
        return $(({ target: { value } }) => {
            state.setFormField(key, value);

            if (state.validationEnabled) {
                state.setValidationVield(key, validateSignupDataField(key, value));
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
            <h2 class="my-0 text-brand-text dark:text-brand-dark-text">Edit profile</h2>
            <hr class="my-2 h-px border-0 bg-gray-400 dark:bg-gray-700" />
            <div class={cx("flex flex-col md:flex-row")}>
                <div class={cx("flex flex-col items-start basis-2/5", "justify-center gap-6 md:flex-row")}>
                    <div class="flex w-full flex-col pr-6 pt-4">
                        <Input
                            errorText={state.validation.firstName?.toString()}
                            id="signup-name"
                            label="Name"
                            onInput$={handleInput("firstName")}
                            placeholder="name"
                            required
                            type="text"
                            value={state.form.firstName}
                        />
                        <Input
                            errorText={state.validation.lastName?.toString()}
                            id="signup-last-name"
                            label="Last name"
                            onInput$={handleInput("lastName")}
                            placeholder="last name"
                            required
                            type="text"
                            value={state.form.lastName}
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
                {rootStore.profile && (
                    <div class={cx("flex flex-col items-start basis-3/5", "justify-start gap-1", "py-4 pr-6")}>
                        <div class="flex items-center">
                            <span class="text-md me-1 font-normal text-gray-500 dark:text-gray-400">Created at:</span>
                            <span class="pl-2 text-brand-text dark:text-brand-dark-text">
                                {dayjs(rootStore.profile.createdAt).format("hh:mm MMM DD, YYYY")}
                            </span>
                        </div>
                        <div class="flex items-center">
                            <span class="text-md me-1 font-normal text-gray-500 dark:text-gray-400">Updated at:</span>
                            <span class="pl-2 text-brand-text dark:text-brand-dark-text">
                                {dayjs(rootStore.profile.updatedAt).format("hh:mm MMM DD, YYYY")}
                            </span>
                        </div>
                        <div class="flex items-center">
                            <span class="text-md me-1 font-normal text-gray-500 dark:text-gray-400">Role:</span>
                            <span class="pl-2 text-brand-text dark:text-brand-dark-text">
                                {rootStore.profile.role.toLowerCase()}
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </form>
    );
});

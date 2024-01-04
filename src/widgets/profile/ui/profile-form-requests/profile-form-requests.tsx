import type { CurriedOnChange } from "@/shared/utils";

import { Button, Datepicker, Input, Textarea } from "@/shared/components";
import { RootContext } from "@/shared/context";
import { equals, hasValues, validateRequestData, validateRequestDataField } from "@/shared/utils";
import { $, component$, useContext, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { cx } from "cva";
import dayjs from "dayjs";

import type { ProfileRequestFormFields } from "../../model";

import { ProfileRequestsFormContext } from "../../model";

export const ProfileRequestsForm = component$(() => {
    let rootStore = useContext(RootContext);
    let state = useContext(ProfileRequestsFormContext);
    let hasChanges = useSignal(false);

    useVisibleTask$(({ track }) => {
        track(() => state.form.avatarUrl);
        track(() => state.form.title);
        track(() => state.form.description);
        track(() => state.form.endsAt);
        track(() => state.form.startsAt);
        track(() => state.form.description);

        state.errorMessage = "";
        state.successMessage = "";
    });

    useVisibleTask$(({ track }) => {
        track(() => state.form.avatarUrl);
        track(() => state.form.title);
        track(() => state.form.description);
        track(() => state.form.endsAt);
        track(() => state.form.startsAt);
        track(() => state.form.description);
        track(() => state.initialForm.avatarUrl);
        track(() => state.initialForm.title);
        track(() => state.initialForm.description);
        track(() => state.initialForm.endsAt);
        track(() => state.initialForm.startsAt);
        track(() => state.initialForm.description);

        hasChanges.value = !equals(state.initialForm, state.form);
    });

    useVisibleTask$(() => {
        state.getMyRequests();
    });

    let handleSubmit = $(async () => {
        state.errorMessage = "";
        state.successMessage = "";

        let validation = validateRequestData(state.form);

        state.setValidationEnabled(true);
        state.setValidation(validation);

        if (hasValues(validation)) {
            return;
        }

        let result = await state.create(state.form);

        if (result) {
            let count = await state.getRequestCount();

            rootStore.requestCount = count;

            state.successMessage = "Request added";
            state.form.title = state.initialForm.title = "";
            state.form.description = state.initialForm.description = "";
            state.form.startsAt = state.initialForm.startsAt = "";
            state.form.endsAt = state.initialForm.endsAt = "";
        }

        await state.getMyRequests();
    });

    let handleInput: CurriedOnChange<keyof ProfileRequestFormFields> = (key) => {
        return $(({ target: { value } }) => {
            state.setFormField(key, value);

            if (state.validationEnabled) {
                state.setValidationVield(key, validateRequestDataField(key, value));
            }
        });
    };

    let handleDeleteClick = (id: string) => {
        return $(async () => {
            await state.deleteRequest(id);
        });
    };

    return (
        <div class="flex flex-col">
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
                <h2 class="my-0 text-brand-text dark:text-brand-dark-text">Manage requests</h2>
                <hr class="my-2 h-px border-0 bg-gray-400 dark:bg-gray-700" />
                <div class={cx("flex flex-col md:flex-row")}>
                    <div class={cx("flex flex-col items-start basis-2/4", "justify-center gap-6 md:flex-row")}>
                        <div class="flex w-full flex-col pr-6 pt-4">
                            <Input
                                errorText={state.validation.title?.toString()}
                                id="profile-requests-form-title"
                                label="Name"
                                onInput$={handleInput("title")}
                                placeholder="Pets name"
                                required
                                type="text"
                                value={state.form.title}
                            />
                            <Textarea
                                errorText={state.validation.description?.toString()}
                                id="profile-requests-form-description"
                                label="Street"
                                onInput$={handleInput("description")}
                                placeholder="Description"
                                required
                                value={state.form.description}
                            />
                        </div>
                    </div>
                    <div class={cx("flex flex-col items-start basis-2/4", "justify-center gap-6 md:flex-row")}>
                        <div class="flex w-full flex-col pr-6 pt-4">
                            <Datepicker
                                errorText={state.validation.startsAt?.toString()}
                                id="profile-requests-form-starts-at"
                                label="Start date"
                                onDateChange={handleInput("startsAt")}
                                placeholder="Select date"
                                required
                                type="text"
                                value={state.form.startsAt}
                            />
                            <Datepicker
                                errorText={state.validation.endsAt?.toString()}
                                id="profile-requests-form-ends-at"
                                label="End date"
                                onDateChange={handleInput("endsAt")}
                                placeholder="End date"
                                required
                                type="text"
                                value={state.form.endsAt}
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
            <div
                class={cx(
                    "px-4 py-0 m-0",
                    "relative overflow-x-auto rounded",
                    "text-brand-text dark:text-brand-dark-text",
                    "md:px-8 md:py-2",
                )}
            >
                <table class="mt-0 w-full text-left text-sm rtl:text-right">
                    <thead class="text-xs uppercase">
                        <tr>
                            <th class="p-2 font-bold text-brand-text dark:text-brand-dark-text" scope="col">
                                Title
                            </th>
                            <th class="p-2 font-bold text-brand-text dark:text-brand-dark-text" scope="col">
                                Description
                            </th>
                            <th class="p-2 font-bold text-brand-text dark:text-brand-dark-text" scope="col">
                                Start date
                            </th>
                            <th class="p-2 font-bold text-brand-text dark:text-brand-dark-text" scope="col">
                                End date
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {state.myRequests.map((row) => (
                            <tr class="border-b border-gray-300 dark:border-gray-700" key={row.id}>
                                <th class="whitespace-nowrap p-2" scope="row">
                                    {row.title}
                                </th>
                                <td class="whitespace-nowrap p-2">{row.description}</td>
                                <td class="p-2">{dayjs(row.startsAt).format("MMM DD, YYYY")}</td>
                                <td class="p-2">{dayjs(row.endsAt).format("MMM DD, YYYY")}</td>
                                <td class="p-2">
                                    <Button
                                        color="error"
                                        onClick$={handleDeleteClick(row.id)}
                                        size="x-small"
                                        text="Delete"
                                        variant="fill"
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
});

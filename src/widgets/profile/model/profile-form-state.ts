import type { UserUpdateData, QueryUser } from "#/api";

import { createContextId, useStore, $ } from "@builder.io/qwik";
import { makeApiRequest } from "@/shared/utils";

import { update } from "../api";

export type ProfileFormFields = Pick<UserUpdateData, "firstName" | "lastName">;

export type ProfileFormValidation = Record<keyof ProfileFormFields, Nullable<string>>;

export type ProfileFormState = {
    setValidationVield: <Key extends keyof ProfileFormValidation>(
        field: Key,
        value: ProfileFormValidation[Key],
    ) => void;
    setFormField: <Key extends keyof ProfileFormFields>(field: Key, value: ProfileFormFields[Key]) => void;
    update: (values: UserUpdateData) => Promise<Voidable<Nullable<QueryUser>>>;
    setValidation: (validation: ProfileFormValidation) => void;
    setValidationEnabled: (isEnabled: boolean) => void;
    validation: ProfileFormValidation;
    initialForm: ProfileFormFields;
    resetValidation: () => void;
    validationEnabled: boolean;
    form: ProfileFormFields;
    successMessage: string;
    errorMessage: string;
    isLoading: boolean;
};

export const PROFILE_INITIAL_FORM: ProfileFormFields = {
    firstName: "",
    lastName: "",
};

export const PROFILE_FORM_INITIAL_VALIDATION: ProfileFormValidation = {
    firstName: null,
    lastName: null,
};

export const ProfileFormContext = createContextId<ProfileFormState>("profile-form-context");

export type UseProfileFormStateParameters = {
    initialForm?: ProfileFormFields;
};

export const useProfileFormState = ({ initialForm }) => {
    return useStore<ProfileFormState>({
        update: $(async function (this: ProfileFormState, values: ProfileFormFields) {
            let result = await makeApiRequest({
                request: async () => {
                    let response = await update(values);

                    if (response.success) {
                        return response.data;
                    }

                    this.errorMessage = response.message;

                    return null;
                },
                setLoading: (isLoading: boolean) => {
                    this.isLoading = isLoading;
                },
                onError: () => {
                    this.errorMessage = "Unknown error";
                },
            });

            return result?.id ? result : null;
        }),
        setValidationVield: $(function <Key extends keyof ProfileFormValidation>(
            this: ProfileFormState,
            field: Key,
            value: ProfileFormValidation[Key],
        ) {
            this.validation[field] = value;
        }),
        setFormField: $(function <Key extends keyof ProfileFormFields>(
            this: ProfileFormState,
            field: Key,
            value: ProfileFormFields[Key],
        ) {
            this.form[field] = value;
        }),
        setValidation: $(function (this: ProfileFormState, validation: ProfileFormValidation) {
            this.validation = validation;
        }),
        setValidationEnabled: $(function (this: ProfileFormState, isEnabled: boolean) {
            this.validationEnabled = isEnabled;
        }),
        resetValidation: $(function (this: ProfileFormState) {
            this.validation = { ...PROFILE_FORM_INITIAL_VALIDATION };
        }),
        initialForm: { ...PROFILE_INITIAL_FORM, ...initialForm },
        validation: { ...PROFILE_FORM_INITIAL_VALIDATION },
        form: { ...PROFILE_INITIAL_FORM, ...initialForm },
        validationEnabled: false,
        successMessage: "",
        errorMessage: "",
        isLoading: false,
    });
};

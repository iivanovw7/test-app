import type { QueryUser, UserUpdateData } from "#/api";

import { makeApiRequest } from "@/shared/utils";
import { $, createContextId, useStore } from "@builder.io/qwik";

import { updateProfile } from "../api";

export type ProfileFormFields = Pick<UserUpdateData, "firstName" | "lastName">;

export type ProfileFormValidation = Record<keyof ProfileFormFields, Nullable<string>>;

export type ProfileFormState = {
    errorMessage: string;
    form: ProfileFormFields;
    initialForm: ProfileFormFields;
    isLoading: boolean;
    resetValidation: () => void;
    setFormField: <Key extends keyof ProfileFormFields>(field: Key, value: ProfileFormFields[Key]) => void;
    setValidation: (validation: ProfileFormValidation) => void;
    setValidationEnabled: (isEnabled: boolean) => void;
    setValidationVield: <Key extends keyof ProfileFormValidation>(
        field: Key,
        value: ProfileFormValidation[Key],
    ) => void;
    successMessage: string;
    update: (values: UserUpdateData) => Promise<Voidable<Nullable<QueryUser>>>;
    validation: ProfileFormValidation;
    validationEnabled: boolean;
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
        errorMessage: "",
        form: { ...PROFILE_INITIAL_FORM, ...initialForm },
        initialForm: { ...PROFILE_INITIAL_FORM, ...initialForm },
        isLoading: false,
        resetValidation: $(function (this: ProfileFormState) {
            this.validation = { ...PROFILE_FORM_INITIAL_VALIDATION };
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
        setValidationVield: $(function <Key extends keyof ProfileFormValidation>(
            this: ProfileFormState,
            field: Key,
            value: ProfileFormValidation[Key],
        ) {
            this.validation[field] = value;
        }),
        successMessage: "",
        update: $(async function (this: ProfileFormState, values: ProfileFormFields) {
            let result = await makeApiRequest({
                onError: () => {
                    this.errorMessage = "Unknown error";
                },
                request: async () => {
                    let response = await updateProfile(values);

                    if (response.success) {
                        return response.data;
                    }

                    this.errorMessage = response.message;

                    return null;
                },
                setLoading: (isLoading: boolean) => {
                    this.isLoading = isLoading;
                },
            });

            return result?.id ? result : null;
        }),
        validation: { ...PROFILE_FORM_INITIAL_VALIDATION },
        validationEnabled: false,
    });
};

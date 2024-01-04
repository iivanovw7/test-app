import type { QueryUser, UserUpdateData } from "#/api";

import { CountryMap, makeApiRequest } from "@/shared/utils";
import { $, createContextId, useStore } from "@builder.io/qwik";

import { updateProfile } from "../api";

export type ProfileContactsFormFields = Pick<
    UserUpdateData,
    "apartment" | "building" | "city" | "country" | "phone" | "postalCode" | "street" | "telegram" | "whatsapp"
>;

export type ProfileContactsFormValidation = Record<keyof ProfileContactsFormFields, Nullable<string>>;

export type ProfileContactsFormState = {
    errorMessage: string;
    form: ProfileContactsFormFields;
    initialForm: ProfileContactsFormFields;
    isLoading: boolean;
    resetValidation: () => void;
    setFormField: <Key extends keyof ProfileContactsFormFields>(
        field: Key,
        value: ProfileContactsFormFields[Key],
    ) => void;
    setValidation: (validation: ProfileContactsFormValidation) => void;
    setValidationEnabled: (isEnabled: boolean) => void;
    setValidationVield: <Key extends keyof ProfileContactsFormValidation>(
        field: Key,
        value: ProfileContactsFormValidation[Key],
    ) => void;
    successMessage: string;
    update: (values: UserUpdateData) => Promise<Voidable<Nullable<QueryUser>>>;
    validation: ProfileContactsFormValidation;
    validationEnabled: boolean;
};

export const PROFILE_INITIAL_CONTACTS_FORM: ProfileContactsFormFields = {
    apartment: "",
    building: "",
    city: "",
    country: CountryMap.RUSSIA,
    phone: "",
    postalCode: "",
    street: "",
    telegram: "",
    whatsapp: "",
};

export const PROFILE_CONTACTS_FORM_INITIAL_VALIDATION: ProfileContactsFormValidation = {
    apartment: null,
    building: null,
    city: null,
    country: null,
    phone: null,
    postalCode: null,
    street: null,
    telegram: null,
    whatsapp: null,
};

export const ProfileContactsFormContext = createContextId<ProfileContactsFormState>("profile-form-contacts-context");

export type UseProfileContactsFormStateParameters = {
    initialForm?: ProfileContactsFormFields;
};

export const useProfileContactsFormState = ({ initialForm }) => {
    return useStore<ProfileContactsFormState>({
        errorMessage: "",
        form: { ...PROFILE_INITIAL_CONTACTS_FORM, ...initialForm },
        initialForm: { ...PROFILE_INITIAL_CONTACTS_FORM, ...initialForm },
        isLoading: false,
        resetValidation: $(function (this: ProfileContactsFormState) {
            this.validation = { ...PROFILE_CONTACTS_FORM_INITIAL_VALIDATION };
        }),
        setFormField: $(function <Key extends keyof ProfileContactsFormFields>(
            this: ProfileContactsFormState,
            field: Key,
            value: ProfileContactsFormFields[Key],
        ) {
            this.form[field] = value;
        }),
        setValidation: $(function (this: ProfileContactsFormState, validation: ProfileContactsFormValidation) {
            this.validation = validation;
        }),
        setValidationEnabled: $(function (this: ProfileContactsFormState, isEnabled: boolean) {
            this.validationEnabled = isEnabled;
        }),
        setValidationVield: $(function <Key extends keyof ProfileContactsFormValidation>(
            this: ProfileContactsFormState,
            field: Key,
            value: ProfileContactsFormValidation[Key],
        ) {
            this.validation[field] = value;
        }),
        successMessage: "",
        update: $(async function (this: ProfileContactsFormState, values: ProfileContactsFormFields) {
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
        validation: { ...PROFILE_CONTACTS_FORM_INITIAL_VALIDATION },
        validationEnabled: false,
    });
};

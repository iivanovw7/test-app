import type { UserUpdateData, QueryUser } from "#/api";

import { createContextId, useStore, $ } from "@builder.io/qwik";
import { makeApiRequest, CountryMap } from "@/shared/utils";

import { update } from "../api";

export type ProfileContactsFormFields = Pick<
    UserUpdateData,
    "postalCode" | "apartment" | "building" | "telegram" | "whatsapp" | "country" | "street" | "phone" | "city"
>;

export type ProfileContactsFormValidation = Record<keyof ProfileContactsFormFields, Nullable<string>>;

export type ProfileContactsFormState = {
    setValidationVield: <Key extends keyof ProfileContactsFormValidation>(
        field: Key,
        value: ProfileContactsFormValidation[Key],
    ) => void;
    setFormField: <Key extends keyof ProfileContactsFormFields>(
        field: Key,
        value: ProfileContactsFormFields[Key],
    ) => void;
    update: (values: UserUpdateData) => Promise<Voidable<Nullable<QueryUser>>>;
    setValidation: (validation: ProfileContactsFormValidation) => void;
    setValidationEnabled: (isEnabled: boolean) => void;
    validation: ProfileContactsFormValidation;
    initialForm: ProfileContactsFormFields;
    form: ProfileContactsFormFields;
    resetValidation: () => void;
    validationEnabled: boolean;
    successMessage: string;
    errorMessage: string;
    isLoading: boolean;
};

export const PROFILE_INITIAL_CONTACTS_FORM: ProfileContactsFormFields = {
    country: CountryMap.RUSSIA,
    postalCode: "",
    apartment: "",
    building: "",
    telegram: "",
    whatsapp: "",
    street: "",
    phone: "",
    city: "",
};

export const PROFILE_CONTACTS_FORM_INITIAL_VALIDATION: ProfileContactsFormValidation = {
    postalCode: null,
    apartment: null,
    building: null,
    telegram: null,
    whatsapp: null,
    country: null,
    street: null,
    phone: null,
    city: null,
};

export const ProfileContactsFormContext = createContextId<ProfileContactsFormState>("profile-form-contacts-context");

export type UseProfileContactsFormStateParameters = {
    initialForm?: ProfileContactsFormFields;
};

export const useProfileContactsFormState = ({ initialForm }) => {
    return useStore<ProfileContactsFormState>({
        update: $(async function (this: ProfileContactsFormState, values: ProfileContactsFormFields) {
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
        setValidationVield: $(function <Key extends keyof ProfileContactsFormValidation>(
            this: ProfileContactsFormState,
            field: Key,
            value: ProfileContactsFormValidation[Key],
        ) {
            this.validation[field] = value;
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
        resetValidation: $(function (this: ProfileContactsFormState) {
            this.validation = { ...PROFILE_CONTACTS_FORM_INITIAL_VALIDATION };
        }),
        setValidationEnabled: $(function (this: ProfileContactsFormState, isEnabled: boolean) {
            this.validationEnabled = isEnabled;
        }),
        initialForm: { ...PROFILE_INITIAL_CONTACTS_FORM, ...initialForm },
        validation: { ...PROFILE_CONTACTS_FORM_INITIAL_VALIDATION },
        form: { ...PROFILE_INITIAL_CONTACTS_FORM, ...initialForm },
        validationEnabled: false,
        successMessage: "",
        errorMessage: "",
        isLoading: false,
    });
};

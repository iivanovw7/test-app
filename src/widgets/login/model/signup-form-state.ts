import type { UserSignupData } from "#/api";

import { createContextId, useStore, $ } from "@builder.io/qwik";
import { CountryMap } from "@/shared/utils";

export type SignupFormValidation = {
    postalCode: Nullable<string>;
    firstName: Nullable<string>;
    apartment: Nullable<string>;
    password: Nullable<string>;
    lastName: Nullable<string>;
    building: Nullable<string>;
    telegram: Nullable<string>;
    whatsapp: Nullable<string>;
    country: Nullable<string>;
    street: Nullable<string>;
    email: Nullable<string>;
    phone: Nullable<string>;
    city: Nullable<string>;
};

export type SignupFormState = {
    setValidationVield: <Key extends keyof SignupFormValidation>(field: Key, value: SignupFormValidation[Key]) => void;
    setFormField: <Key extends keyof UserSignupData>(field: Key, value: UserSignupData[Key]) => void;
    setValidation: (validation: SignupFormValidation) => void;
    setValidationEnabled: (isEnabled: boolean) => void;
    validation: SignupFormValidation;
    resetValidation: () => void;
    validationEnabled: boolean;
    form: UserSignupData;
};

export const SIGNUP_INITIAL_FORM_STATE: UserSignupData = {
    country: CountryMap.RUSSIA,
    postalCode: "",
    firstName: "",
    apartment: "",
    lastName: "",
    password: "",
    building: "",
    telegram: "",
    whatsapp: "",
    street: "",
    email: "",
    phone: "",
    city: "",
};

export const SIGNUP_INITIAL_VALIDATION_STATE: SignupFormValidation = {
    postalCode: null,
    firstName: null,
    apartment: null,
    lastName: null,
    password: null,
    building: null,
    telegram: null,
    whatsapp: null,
    country: null,
    street: null,
    email: null,
    phone: null,
    city: null,
};

export const SignupFormContext = createContextId<SignupFormState>("signup-form-context");

export const useSignupFormState = () => {
    return useStore<SignupFormState>({
        setValidationVield: $(function <Key extends keyof SignupFormValidation>(
            this: SignupFormState,
            field: Key,
            value: SignupFormValidation[Key],
        ) {
            this.validation[field] = value;
        }),
        setFormField: $(function <Key extends keyof UserSignupData>(
            this: SignupFormState,
            field: Key,
            value: UserSignupData[Key],
        ) {
            this.form[field] = value;
        }),
        setValidation: $(function (this: SignupFormState, validation: SignupFormValidation) {
            this.validation = validation;
        }),
        setValidationEnabled: $(function (this: SignupFormState, isEnabled: boolean) {
            this.validationEnabled = isEnabled;
        }),
        resetValidation: $(function (this: SignupFormState) {
            this.validation = SIGNUP_INITIAL_VALIDATION_STATE;
        }),
        validation: SIGNUP_INITIAL_VALIDATION_STATE,
        form: SIGNUP_INITIAL_FORM_STATE,
        validationEnabled: false,
    });
};

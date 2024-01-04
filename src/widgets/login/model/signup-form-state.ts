import type { UserSignupData } from "#/api";

import { CountryMap } from "@/shared/utils";
import { $, createContextId, useStore } from "@builder.io/qwik";

export type SignupFormValidation = {
    apartment: Nullable<string>;
    building: Nullable<string>;
    city: Nullable<string>;
    country: Nullable<string>;
    email: Nullable<string>;
    firstName: Nullable<string>;
    lastName: Nullable<string>;
    password: Nullable<string>;
    phone: Nullable<string>;
    postalCode: Nullable<string>;
    street: Nullable<string>;
    telegram: Nullable<string>;
    whatsapp: Nullable<string>;
};

export type SignupFormState = {
    form: UserSignupData;
    resetValidation: () => void;
    setFormField: <Key extends keyof UserSignupData>(field: Key, value: UserSignupData[Key]) => void;
    setValidation: (validation: SignupFormValidation) => void;
    setValidationEnabled: (isEnabled: boolean) => void;
    setValidationVield: <Key extends keyof SignupFormValidation>(field: Key, value: SignupFormValidation[Key]) => void;
    validation: SignupFormValidation;
    validationEnabled: boolean;
};

export const SIGNUP_INITIAL_FORM_STATE: UserSignupData = {
    apartment: "",
    building: "",
    city: "",
    country: CountryMap.RUSSIA,
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    phone: "",
    postalCode: "",
    street: "",
    telegram: "",
    whatsapp: "",
};

export const SIGNUP_INITIAL_VALIDATION_STATE: SignupFormValidation = {
    apartment: null,
    building: null,
    city: null,
    country: null,
    email: null,
    firstName: null,
    lastName: null,
    password: null,
    phone: null,
    postalCode: null,
    street: null,
    telegram: null,
    whatsapp: null,
};

export const SignupFormContext = createContextId<SignupFormState>("signup-form-context");

export const useSignupFormState = () => {
    return useStore<SignupFormState>({
        form: SIGNUP_INITIAL_FORM_STATE,
        resetValidation: $(function (this: SignupFormState) {
            this.validation = SIGNUP_INITIAL_VALIDATION_STATE;
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
        setValidationVield: $(function <Key extends keyof SignupFormValidation>(
            this: SignupFormState,
            field: Key,
            value: SignupFormValidation[Key],
        ) {
            this.validation[field] = value;
        }),
        validation: SIGNUP_INITIAL_VALIDATION_STATE,
        validationEnabled: false,
    });
};

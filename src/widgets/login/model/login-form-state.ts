import type { LoginData } from "#/api";

import { $, createContextId, useStore } from "@builder.io/qwik";

export type LoginFormValidation = {
    email: Nullable<string>;
    password: Nullable<string>;
};

export type LoginFormState = {
    form: LoginData;
    resetValidation: () => void;
    setFormField: <Key extends keyof LoginData>(field: Key, value: LoginData[Key]) => void;
    setValidation: (validation: LoginFormValidation) => void;
    setValidationEnabled: (isEnabled: boolean) => void;
    setValidationVield: <Key extends keyof LoginFormValidation>(field: Key, value: LoginFormValidation[Key]) => void;
    validation: LoginFormValidation;
    validationEnabled: boolean;
};

export const LOGIN_INITIAL_FORM_STATE: LoginData = {
    email: "",
    password: "",
};

export const LOGIN_INITIAL_VALIDATION_STATE: LoginFormValidation = {
    email: null,
    password: null,
};

export const LoginFormContext = createContextId<LoginFormState>("login-form-context");

export const useLoginFormState = () => {
    return useStore<LoginFormState>({
        form: LOGIN_INITIAL_FORM_STATE,
        resetValidation: $(function (this: LoginFormState) {
            this.validation = LOGIN_INITIAL_VALIDATION_STATE;
        }),
        setFormField: $(function <Key extends keyof LoginData>(
            this: LoginFormState,
            field: Key,
            value: LoginData[Key],
        ) {
            this.form[field] = value;
        }),
        setValidation: $(function (this: LoginFormState, validation: LoginFormValidation) {
            this.validation = validation;
        }),
        setValidationEnabled: $(function (this: LoginFormState, isEnabled: boolean) {
            this.validationEnabled = isEnabled;
        }),
        setValidationVield: $(function <Key extends keyof LoginFormValidation>(
            this: LoginFormState,
            field: Key,
            value: LoginFormValidation[Key],
        ) {
            this.validation[field] = value;
        }),
        validation: LOGIN_INITIAL_VALIDATION_STATE,
        validationEnabled: false,
    });
};

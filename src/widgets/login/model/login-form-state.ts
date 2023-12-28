import type { LoginData } from "#/api";

import { createContextId, useStore, $ } from "@builder.io/qwik";

export type LoginFormValidation = {
    password: Nullable<string>;
    email: Nullable<string>;
};

export type LoginFormState = {
    setValidationVield: <Key extends keyof LoginFormValidation>(field: Key, value: LoginFormValidation[Key]) => void;
    setFormField: <Key extends keyof LoginData>(field: Key, value: LoginData[Key]) => void;
    setValidation: (validation: LoginFormValidation) => void;
    setValidationEnabled: (isEnabled: boolean) => void;
    validation: LoginFormValidation;
    resetValidation: () => void;
    validationEnabled: boolean;
    form: LoginData;
};

export const LOGIN_INITIAL_FORM_STATE: LoginData = {
    password: "",
    email: "",
};

export const LOGIN_INITIAL_VALIDATION_STATE: LoginFormValidation = {
    password: null,
    email: null,
};

export const LoginFormContext = createContextId<LoginFormState>("login-form-context");

export const useLoginFormState = () => {
    return useStore<LoginFormState>({
        setValidationVield: $(function <Key extends keyof LoginFormValidation>(
            this: LoginFormState,
            field: Key,
            value: LoginFormValidation[Key],
        ) {
            this.validation[field] = value;
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
        resetValidation: $(function (this: LoginFormState) {
            this.validation = LOGIN_INITIAL_VALIDATION_STATE;
        }),
        validation: LOGIN_INITIAL_VALIDATION_STATE,
        form: LOGIN_INITIAL_FORM_STATE,
        validationEnabled: false,
    });
};

import type { LoginData, QueryUser, UserSignupData } from "#/api";

import { makeApiRequest } from "@/shared/utils";
import { $, createContextId, useStore } from "@builder.io/qwik";

import { login, signup } from "../api";

export const LoginType = {
    SIGNIN: "SIGNIN",
    SIGNUP: "SIGNUP",
} as const;

export type LoginType = (typeof LoginType)[keyof typeof LoginType];

export type LoginState = {
    errorMessage: string;
    isLoading: boolean;
    submit: <T extends LoginType>(
        type: T,
        values: T extends "SIGNUP" ? UserSignupData : LoginData,
    ) => Promise<Voidable<Nullable<QueryUser>>>;
    type: LoginType;
};

export const LoginContext = createContextId<LoginState>("login-context");

export const useLoginState = (): LoginState => {
    return useStore<LoginState>({
        errorMessage: "",
        isLoading: false,
        submit: $(async function <T extends LoginType>(
            this: LoginState,
            type: T,
            values: T extends "SIGNUP" ? UserSignupData : LoginData,
        ) {
            let result = await makeApiRequest({
                onError: () => {
                    this.errorMessage = "Unknown error";
                },
                request: async () => {
                    let response =
                        type === LoginType.SIGNUP
                            ? await signup(values as UserSignupData)
                            : await login(values as LoginData);

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
        type: "SIGNIN",
    });
};

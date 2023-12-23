import type { UserSignupData, QueryUser, LoginData } from "#/api";

import { createContextId, useStore, $ } from "@builder.io/qwik";
import { makeApiRequest } from "@/shared/utils";

import { signup, login } from "../api";

export const LoginType = {
    SIGNUP: "SIGNUP",
    SIGNIN: "SIGNIN",
} as const;

export type LoginType = (typeof LoginType)[keyof typeof LoginType];

export type LoginState = {
    submit: <T extends LoginType>(
        type: T,
        values: T extends "SIGNUP" ? UserSignupData : LoginData,
    ) => Promise<Voidable<Nullable<QueryUser>>>;
    errorMessage: string;
    isLoading: boolean;
    type: LoginType;
};

export const LoginContext = createContextId<LoginState>("login-context");

export const useLoginState = (): LoginState => {
    return useStore<LoginState>({
        submit: $(async function <T extends LoginType>(
            this: LoginState,
            type: T,
            values: T extends "SIGNUP" ? UserSignupData : LoginData,
        ) {
            let result = await makeApiRequest({
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
                onError: () => {
                    this.errorMessage = "Unknown error";
                },
            });

            return result?.id ? result : null;
        }),
        isLoading: false,
        errorMessage: "",
        type: "SIGNIN",
    });
};

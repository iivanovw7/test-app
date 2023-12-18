import { createContextId } from "@builder.io/qwik";

export type LoginState = {
    type: "SIGNUP" | "SIGNIN";
};

export const LoginContext = createContextId<LoginState>("login-context");

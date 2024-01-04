import type { LoginData, QueryUser, TBasicApiError, TBasicApiResult, UserSignupData } from "#/api";

import { apiRoutes } from "@/shared/routes";

export const login = async (values: LoginData): Promise<TBasicApiError | TBasicApiResult<QueryUser>> => {
    let response = await fetch(apiRoutes.login.path, { body: JSON.stringify(values), method: "POST" });

    return response.json();
};

export const signup = async (values: UserSignupData): Promise<TBasicApiError | TBasicApiResult<QueryUser>> => {
    let response = await fetch(apiRoutes.signup.path, { body: JSON.stringify(values), method: "POST" });

    return response.json();
};

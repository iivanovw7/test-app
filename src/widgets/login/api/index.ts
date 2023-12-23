import type { TBasicApiResult, TBasicApiError, UserSignupData, QueryUser, LoginData } from "#/api";

import { apiRoutes } from "@/shared/routes";

export const login = async (values: LoginData): Promise<TBasicApiResult<QueryUser> | TBasicApiError> => {
    let response = await fetch(apiRoutes.login.path, { body: JSON.stringify(values), method: "POST" });

    return response.json();
};

export const signup = async (values: UserSignupData): Promise<TBasicApiResult<QueryUser> | TBasicApiError> => {
    let response = await fetch(apiRoutes.signup.path, { body: JSON.stringify(values), method: "POST" });

    return response.json();
};

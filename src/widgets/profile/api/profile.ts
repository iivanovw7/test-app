import type { QueryUser, TBasicApiError, TBasicApiResult, UserUpdateData } from "#/api";

import { apiRoutes } from "@/shared/routes";

export const updateProfile = async (values: UserUpdateData): Promise<TBasicApiError | TBasicApiResult<QueryUser>> => {
    let response = await fetch(apiRoutes.updateMe.path, { body: JSON.stringify(values), method: "PATCH" });

    return response.json();
};

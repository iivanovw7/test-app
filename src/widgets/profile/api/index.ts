import type { TBasicApiResult, TBasicApiError, UserUpdateData, QueryUser } from "#/api";

import { apiRoutes } from "@/shared/routes";

export const update = async (values: UserUpdateData): Promise<TBasicApiResult<QueryUser> | TBasicApiError> => {
    let response = await fetch(apiRoutes.updateMe.path, { body: JSON.stringify(values), method: "PATCH" });

    return response.json();
};

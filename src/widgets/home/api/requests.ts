import type { QueryRequest, TBasicApiError, TBasicApiListResult } from "#/api";

import { apiRoutes } from "@/shared/routes";

export const getRequests = async (): Promise<TBasicApiError | TBasicApiListResult<QueryRequest>> => {
    let response = await fetch(apiRoutes.requests.path, {
        method: "GET",
    });

    return response.json();
};

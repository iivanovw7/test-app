import type { CreateRequestData, QueryRequest, TBasicApiError, TBasicApiListResult, TBasicApiResult } from "#/api";

import { apiRoutes } from "@/shared/routes";

export const createRequest = async (
    values: CreateRequestData,
): Promise<TBasicApiError | TBasicApiResult<QueryRequest>> => {
    let response = await fetch(apiRoutes.createRequest.path, { body: JSON.stringify(values), method: "POST" });

    return response.json();
};

export const getRequestCount = async (): Promise<TBasicApiError | TBasicApiResult<number>> => {
    let response = await fetch(apiRoutes.requestCount.path);

    return response.json();
};

export const getMyRequests = async (): Promise<TBasicApiError | TBasicApiListResult<QueryRequest>> => {
    let response = await fetch(apiRoutes.getMyRequests.path);

    return response.json();
};

export const deleteRequest = async (id: string): Promise<TBasicApiError | TBasicApiListResult<null>> => {
    let parameters = new URLSearchParams({ id }).toString();
    let url = `${apiRoutes.deleteRequest.path}?` + parameters;
    let response = await fetch(url, {
        method: "DELETE",
    });

    return response.json();
};

import type { CreateRequestData, QueryRequest, TBasicApiError, TBasicApiListResult, TBasicApiResult } from "#/api";

import { apiRoutes } from "@/shared/routes";

export const createRequest = async (
    values: CreateRequestData,
): Promise<TBasicApiError | TBasicApiResult<QueryRequest>> => {
    let response = await fetch(apiRoutes.requests.path, { body: JSON.stringify(values), method: "POST" });

    return response.json();
};

export const getRequestCount = async (): Promise<TBasicApiError | TBasicApiResult<number>> => {
    let response = await fetch(apiRoutes.requestCount.path);

    return response.json();
};

export const getRequests = async (authorId: string): Promise<TBasicApiError | TBasicApiListResult<QueryRequest>> => {
    let parameters = new URLSearchParams({ authorId }).toString();
    let url = `${apiRoutes.requests.path}?` + parameters;
    let response = await fetch(url, {
        method: "GET",
    });

    return response.json();
};

export const deleteRequest = async (id: string): Promise<TBasicApiError | TBasicApiListResult<null>> => {
    let response = await fetch(`${apiRoutes.requests.path}/${id}`, {
        method: "DELETE",
    });

    return response.json();
};

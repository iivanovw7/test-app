/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-explicit-any */

import type { QRL } from "@builder.io/qwik";
import type { TBasicApiError } from "#/api";

type SetLoading = (isLoading: boolean) => void;
type SetLoadingQRL = QRL<SetLoading>;

export type MakeApiRequestData<Request_ extends () => Promise<any>> = {
    onError?: (error: TBasicApiError) => void;
    setLoading: SetLoadingQRL | SetLoading;
    request: Request_;
};

export const makeApiRequest = async <Request_ extends () => Promise<any>, Response_ = AsyncReturnType<Request_>>({
    setLoading,
    request,
    onError,
}: MakeApiRequestData<Request_>): Promise<Voidable<Response_ extends Maybe<void> ? true : Response_>> => {
    try {
        setLoading(true);

        let result = await request();

        return result ?? true;
    } catch (error) {
        console.error(error);

        onError?.(error);
    } finally {
        setLoading(false);
    }
};

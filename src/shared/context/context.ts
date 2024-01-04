import type { QueryUser } from "#/api";

import { createContextId } from "@builder.io/qwik";

import type { BasePath } from "../routes";

export type RootState = {
    profile: Nullable<QueryUser>;
    requestCount: number;
    userCount: number;
};

export const RootContext = createContextId<RootState>("root-context");

export type LocationState = {
    slug: BasePath;
};

export const LocationContext = createContextId<LocationState>("location-context");

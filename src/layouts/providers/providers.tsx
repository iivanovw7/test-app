import type { LocationState, RootState } from "@/shared/context";
import type { QueryUser } from "#/api";

import { LocationContext, RootContext } from "@/shared/context";
import { apiRoutes, BasePath } from "@/shared/routes";
import { defaultTo, MILLISECONDS_IN_MINUTE } from "@/shared/utils";
import { $, component$, Slot, useContextProvider, useStore, useVisibleTask$ } from "@builder.io/qwik";
import { initFlowbite } from "flowbite";

export type ProvidersProperties = {
    profile?: QueryUser;
    requestCount?: number;
    slug: BasePath;
    userCount?: number;
};

export const Providers = component$<ProvidersProperties>((properties) => {
    let { profile, requestCount, slug, userCount } = properties;

    let locationStore = useStore<LocationState>({
        slug: defaultTo(BasePath.home, slug),
    });

    let rootStore = useStore<RootState>({
        profile: defaultTo(null, profile),
        requestCount: defaultTo(0, requestCount),
        userCount: defaultTo(0, userCount),
    });

    let refreshToken = $(async () => {
        let response = await fetch(apiRoutes.refresh.path);
        let result = await response.json();

        if (!result.success) {
            rootStore.profile = null;
        }
    });

    useContextProvider(LocationContext, locationStore);
    useContextProvider(RootContext, rootStore);

    useVisibleTask$(() => {
        initFlowbite();
    });

    useVisibleTask$(async ({ cleanup, track }) => {
        let currentProfile = track(() => rootStore.profile);

        await refreshToken();

        let id = setInterval(async () => {
            if (currentProfile) {
                await refreshToken();
            }
        }, MILLISECONDS_IN_MINUTE * 15);

        cleanup(() => clearInterval(id));
    });

    return (
        <>
            <Slot />
        </>
    );
});

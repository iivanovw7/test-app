import type { LocationState, RootState } from "@/shared/context";
import type { QueryUser } from "#/api";

import { useContextProvider, useVisibleTask$, component$, useStore, Slot, $ } from "@builder.io/qwik";
import { MILLISECONDS_IN_MINUTE, defaultTo } from "@/shared/utils";
import { LocationContext, RootContext } from "@/shared/context";
import { apiRoutes, BasePath } from "@/shared/routes";
import { initFlowbite } from "flowbite";

export type ProvidersProperties = {
    profile?: QueryUser;
    userCount?: number;
    slug: BasePath;
};

export const Providers = component$<ProvidersProperties>((properties) => {
    let { userCount, profile, slug } = properties;

    let locationStore = useStore<LocationState>({
        slug: defaultTo(BasePath.home, slug),
    });

    let rootStore = useStore<RootState>({
        userCount: defaultTo(0, userCount),
        profile: defaultTo(null, profile),
    });

    let refreshToken = $(async () => {
        let response = await fetch(apiRoutes.refresh.path, { method: "GET" });
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

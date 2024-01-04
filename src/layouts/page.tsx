import { component$, Slot } from "@builder.io/qwik";

import type { ProvidersProperties } from "./providers";

import { Providers } from "./providers";

export type PageLayoutProperties = ProvidersProperties;

export const PageLayout = component$<PageLayoutProperties>((properties) => {
    let { profile, requestCount, slug, userCount } = properties;

    return (
        <Providers profile={profile} requestCount={requestCount} slug={slug} userCount={userCount}>
            <Slot />
        </Providers>
    );
});

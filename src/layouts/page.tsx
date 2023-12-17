import { component$, Slot } from "@builder.io/qwik";

import type { ProvidersProperties } from "./providers";

import { Providers } from "./providers";

export type PageLayoutProperties = ProvidersProperties;

export const PageLayout = component$<PageLayoutProperties>((properties) => {
    let { userCount, profile, slug } = properties;

    return (
        <Providers userCount={userCount} profile={profile} slug={slug}>
            <Slot />
        </Providers>
    );
});

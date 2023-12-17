import type { ProvidersProperties } from "@/layouts/providers";

import { component$ } from "@builder.io/qwik";
import { Footer, Header } from "@/entities";
import { PageLayout } from "@/layouts/page";
import { cx } from "cva";

export type ProfileProperties = ProvidersProperties;

export const Profile = component$<ProfileProperties>((properties) => {
    let { userCount, profile, slug } = properties;

    return (
        <PageLayout userCount={userCount} profile={profile} slug={slug}>
            <Header />
            <div class="relative">
                <div class="mx-auto max-w-screen-xl px-8">
                    <main
                        class={cx(
                            "min-h-[calc(100vh-theme(spacing.footer)-theme(spacing.header))]",
                            "lg:min-h-[calc(100vh-theme(spacing.footer)-theme(spacing.header))]",
                        )}
                    >
                        <section class={cx("py-6 lg:py-10", "mx-auto px-0 py-0", "max-w-none xl:ml-0")}>
                            <article class={cx("max-w-none")}>
                                <strong class="text-sm text-blue-500">Profile page</strong>
                                <h1 class="mb-1 text-3xl text-brand-text dark:text-brand-dark-text sm:text-5xl">
                                    Test website
                                </h1>
                                <h2 class="mt-1 font-semibold text-brand-text dark:text-brand-dark-text">
                                    Description
                                </h2>
                            </article>
                        </section>
                    </main>
                </div>
            </div>
            <Footer />
        </PageLayout>
    );
});

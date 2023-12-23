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
                        <section class={cx("py-4 lg:py-8", "mx-auto px-0 py-0", "max-w-none xl:ml-0")}>
                            <article class={cx("max-w-none flex flex-col gap-2")}>
                                <strong class="text-sm text-brand-secondary dark:text-brand-dark-secondary">
                                    Profile
                                </strong>
                                <hr class="my-1 h-px border-0 bg-gray-400 dark:bg-gray-700" />
                                <span>
                                    <strong class="text-brand-primary">{profile?.firstName}</strong>
                                    <strong class="text-brand-primary">{profile?.lastName}</strong>
                                </span>
                                <p class="m-0">{profile?.email}</p>
                                <p class="m-0">{profile?.role.toLowerCase()}</p>
                            </article>
                        </section>
                    </main>
                </div>
            </div>
            <Footer />
        </PageLayout>
    );
});

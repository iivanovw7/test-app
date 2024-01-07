import type { ProvidersProperties } from "@/layouts/providers";
import type { QueryRequest } from "#/api";

import { Footer, Header } from "@/entities";
import { PageLayout } from "@/layouts/page";
import { component$, useContextProvider } from "@builder.io/qwik";
import { cx } from "cva";
import dayjs from "dayjs";

import type { HomeState } from "./model";

import { HomeContext, useHomeState } from "./model";

export type HomeProperties = ProvidersProperties & {
    requests?: QueryRequest[];
};

export const Home = component$<HomeProperties>((properties) => {
    let { profile, requestCount, requests, slug, userCount } = properties;

    let homeStore = useHomeState();

    useContextProvider<HomeState>(HomeContext, homeStore);

    return (
        <PageLayout profile={profile} requestCount={requestCount} slug={slug} userCount={userCount}>
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
                            <article class={cx("max-w-none")}>
                                <h1 class="mb-1 text-3xl text-brand-text dark:text-brand-dark-text sm:text-5xl">
                                    Test website
                                </h1>
                                <h2 class="mt-1 font-semibold text-brand-text dark:text-brand-dark-text">
                                    Description
                                </h2>
                                <div class="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                                    {requests?.map((element) => (
                                        <div
                                            class={cx(
                                                "w-full rounded-lg border border-stone-200",
                                                "bg-white p-6 shadow dark:border-stone-700 dark:bg-stone-800",
                                            )}
                                            key={element.id}
                                        >
                                            <h5
                                                class={cx(
                                                    "mb-0 text-2xl font-bold tracking-tight",
                                                    "text-gray-900 dark:text-white",
                                                )}
                                            >
                                                {element.title}
                                            </h5>
                                            <p class={cx("mt-1 mb-3 font-normal", "text-gray-700 dark:text-gray-400")}>
                                                {element.description || "No description"}
                                            </p>
                                            <div class="flex items-center">
                                                <span class="text-md me-1 font-normal text-gray-500 dark:text-gray-400">
                                                    Created at:
                                                </span>
                                                <span class="pl-2 text-brand-text dark:text-brand-dark-text">
                                                    {dayjs(element.createdAt).format("hh:mm MMM DD, YYYY")}
                                                </span>
                                            </div>
                                            <div class="flex items-center">
                                                <span class="text-md me-1 font-normal text-gray-500 dark:text-gray-400">
                                                    Starts at:
                                                </span>
                                                <span class="pl-2 text-brand-text dark:text-brand-dark-text">
                                                    {dayjs(element.startsAt).format("MMM DD, YYYY")}
                                                </span>
                                            </div>
                                            <div class="flex items-center">
                                                <span class="text-md me-1 font-normal text-gray-500 dark:text-gray-400">
                                                    Ends at:
                                                </span>
                                                <span class="pl-2 text-brand-text dark:text-brand-dark-text">
                                                    {dayjs(element.endsAt).format("MMM DD, YYYY")}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </article>
                        </section>
                    </main>
                </div>
            </div>
            <Footer />
        </PageLayout>
    );
});

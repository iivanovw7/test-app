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
                                                    {dayjs(element.startsAt).format("hh:mm MMM DD, YYYY")}
                                                </span>
                                            </div>
                                            <div class="flex items-center">
                                                <span class="text-md me-1 font-normal text-gray-500 dark:text-gray-400">
                                                    Ends at:
                                                </span>
                                                <span class="pl-2 text-brand-text dark:text-brand-dark-text">
                                                    {dayjs(element.endsAt).format("hh:mm MMM DD, YYYY")}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <p class="mt-4">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque suscipit, orci
                                    non vulputate porta, sem erat lacinia sem, ac tincidunt nibh turpis a turpis.
                                    Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia
                                    curae; Proin ullamcorper ac diam et porttitor. Proin mollis enim eros, sed rutrum
                                    nunc fermentum sed. Nullam fermentum auctor leo, in pretium turpis varius non. Cras
                                    euismod est eget dolor pharetra semper. Nulla ut dictum dolor, vel vestibulum velit.
                                    Morbi arcu ipsum, interdum id iaculis id, rutrum sed enim. Orci varius natoque
                                    penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam imperdiet
                                    turpis at risus rhoncus, in mollis odio aliquam. Praesent eget eros purus. Praesent
                                    imperdiet id diam a rutrum. Nam laoreet ullamcorper sapien, eget tincidunt magna
                                    dictum rutrum. Nam ut cursus magna
                                    <span class="text-brand-secondary">educational</span> and{" "}
                                    <span class="text-brand-tertiary">promotional</span>
                                    purposes.
                                </p>
                            </article>
                        </section>
                    </main>
                </div>
            </div>
            <Footer />
        </PageLayout>
    );
});

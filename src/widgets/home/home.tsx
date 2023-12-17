import type { ProvidersProperties } from "@/layouts/providers";

import { component$ } from "@builder.io/qwik";
import { Footer, Header } from "@/entities";
import { PageLayout } from "@/layouts/page";
import { cx } from "cva";

export type HomeProperties = ProvidersProperties;

export const Home = component$<HomeProperties>((properties) => {
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
                                <strong class="text-sm text-blue-500">Home</strong>
                                <h1 class="mb-1 text-3xl text-brand-text dark:text-brand-dark-text sm:text-5xl">
                                    Test website
                                </h1>
                                <h2 class="mt-1 font-semibold text-brand-text dark:text-brand-dark-text">
                                    Description
                                </h2>
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

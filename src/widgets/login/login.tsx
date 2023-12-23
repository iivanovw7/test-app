import type { ProvidersProperties } from "@/layouts/providers";

import { useContextProvider, component$ } from "@builder.io/qwik";
import { PageLayout } from "@/layouts/page";
import { cx } from "cva";

import type { LoginState } from "./model";

import { useLoginState, LoginContext } from "./model";
import { SignupForm, LoginForm } from "./ui";

export type LoginProperties = Pick<ProvidersProperties, "slug">;

export const Login = component$<LoginProperties>((properties) => {
    let { slug } = properties;
    let loginState = useLoginState();

    useContextProvider<LoginState>(LoginContext, loginState);

    return (
        <PageLayout slug={slug}>
            <div class="relative">
                <div class="mx-auto max-w-screen-xl px-8">
                    <main
                        class={cx(
                            "min-h-[calc(100vh-theme(spacing.footer)-theme(spacing.header))]",
                            "lg:min-h-[calc(100vh-theme(spacing.footer)-theme(spacing.header))]",
                        )}
                    >
                        <section class={cx("mx-auto px-0 py-0", "max-w-none xl:ml-0")}>
                            <article class={cx("max-w-none")}>
                                <div class={cx("relative m-0 p-0", "min-h-full")}>
                                    <div
                                        class={cx(
                                            "block my-0 mx-auto",
                                            "px-0 py-[5%]",
                                            "max-w-[450px] min-h-[100vh]",
                                            "after:content-[''] after:h-6 after:block",
                                            "before:content-[''] before:h-6 before:block",
                                        )}
                                    >
                                        {loginState.type === "SIGNIN" && <LoginForm />}
                                        {loginState.type === "SIGNUP" && <SignupForm />}
                                    </div>
                                </div>
                            </article>
                        </section>
                    </main>
                </div>
            </div>
        </PageLayout>
    );
});

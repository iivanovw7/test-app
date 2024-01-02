import type { ProvidersProperties } from "@/layouts/providers";

import { useContextProvider, component$ } from "@builder.io/qwik";
import { LuContact, LuUser } from "@qwikest/icons/lucide";
import { NavButton } from "@/shared/components";
import { Footer, Header } from "@/entities";
import { PageLayout } from "@/layouts/page";
import { routes } from "@/shared/routes";
import { cx } from "cva";

import type { ProfileContactsFormState, ProfileFormState } from "./model";

import {
    useProfileContactsFormState,
    ProfileContactsFormContext,
    useProfileFormState,
    ProfileFormContext,
} from "./model";
import { ProfileContactsForm, ProfileSecurityForm, ProfileForm } from "./ui";

export type ProfileProperties = ProvidersProperties;

export const Profile = component$<ProfileProperties>((properties) => {
    let { userCount, profile, slug } = properties;

    let profileFormStore = useProfileFormState({
        initialForm: { firstName: profile?.firstName, lastName: profile?.lastName },
    });

    let profileContactsStore = useProfileContactsFormState({
        initialForm: { ...profile?.contacts, ...profile?.address },
    });

    useContextProvider<ProfileFormState>(ProfileFormContext, profileFormStore);
    useContextProvider<ProfileContactsFormState>(ProfileContactsFormContext, profileContactsStore);

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
                        <strong class="text-sm text-brand-secondary dark:text-brand-dark-secondary">Profile</strong>
                        <hr class="my-1 h-px border-0 bg-gray-400 dark:bg-gray-700" />
                        <section class={cx("py-4 lg:py-8", "mx-auto px-0 py-0", "max-w-none xl:ml-0", "md:flex")}>
                            <ul
                                class={cx(
                                    "flex-column list-none",
                                    "space-y space-y-4 p-0",
                                    "text-sm font-medium",
                                    "text-brand-text dark:text-brand-dark-text",
                                    "md:me-4 mb-4 md:mb-0 md:mt-0",
                                )}
                            >
                                <li class="mt-0 p-0">
                                    <NavButton href={routes.profile.path} slug={slug}>
                                        <LuUser class="me-2 h-4 w-4 fill-current stroke-current" />
                                        Profile
                                    </NavButton>
                                </li>
                                <li class="p-0">
                                    <NavButton href={routes.profileContacts.path} slug={slug}>
                                        <LuContact class="me-2 h-4 w-4 text-brand-text dark:text-brand-dark-text" />
                                        Contacts
                                    </NavButton>
                                </li>
                            </ul>
                            <article
                                class={cx("p-4 bg-stone-100", "dark:bg-stone-800", "rounded w-full", "max-w-none")}
                            >
                                {(() => {
                                    switch (slug) {
                                        case routes.profile.path: {
                                            return <ProfileForm />;
                                        }
                                        case routes.profileContacts.path: {
                                            return <ProfileContactsForm />;
                                        }
                                        case routes.profileSecurity.path: {
                                            return <ProfileSecurityForm />;
                                        }
                                        default: {
                                            return null;
                                        }
                                    }
                                })()}
                            </article>
                        </section>
                    </main>
                </div>
            </div>
            <Footer />
        </PageLayout>
    );
});

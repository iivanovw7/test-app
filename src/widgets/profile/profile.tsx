import type { ProvidersProperties } from "@/layouts/providers";

import { Footer, Header } from "@/entities";
import { PageLayout } from "@/layouts/page";
import { NavButton } from "@/shared/components";
import { routes } from "@/shared/routes";
import { component$, useContextProvider } from "@builder.io/qwik";
import { LuBadgeHelp, LuContact, LuUser } from "@qwikest/icons/lucide";
import { cx } from "cva";

import type { ProfileContactsFormState, ProfileFormState, ProfileRequestsFormState } from "./model";

import {
    ProfileContactsFormContext,
    ProfileFormContext,
    ProfileRequestsFormContext,
    useProfileContactsFormState,
    useProfileFormState,
    useProfileRequestsFormState,
} from "./model";
import { ProfileContactsForm, ProfileForm, ProfileSecurityForm } from "./ui";
import { ProfileRequestsForm } from "./ui/profile-form-requests";

export type ProfileProperties = ProvidersProperties;

export const Profile = component$<ProfileProperties>((properties) => {
    let { profile, requestCount, slug, userCount } = properties;

    let profileFormStore = useProfileFormState({
        initialForm: { firstName: profile?.firstName, lastName: profile?.lastName },
    });

    let profileContactsStore = useProfileContactsFormState({
        initialForm: { ...profile?.contacts, ...profile?.address },
    });

    let profileRequestsStore = useProfileRequestsFormState();

    useContextProvider<ProfileFormState>(ProfileFormContext, profileFormStore);
    useContextProvider<ProfileContactsFormState>(ProfileContactsFormContext, profileContactsStore);
    useContextProvider<ProfileRequestsFormState>(ProfileRequestsFormContext, profileRequestsStore);

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
                                        <LuContact class="me-2 h-4 w-4 stroke-current" />
                                        Contacts
                                    </NavButton>
                                </li>
                                <li class="p-0">
                                    <NavButton href={routes.profileRequests.path} slug={slug}>
                                        <LuBadgeHelp class="me-2 h-4 w-4 stroke-current" />
                                        Requests
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
                                        case routes.profileRequests.path: {
                                            return <ProfileRequestsForm />;
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

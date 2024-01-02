import { propEq as propertyEq, filter, values, concat, pluck, pipe } from "../utils";

export const BasePath = {
    profileContacts: "/profile/contacts",
    profileSecurity: "/profile/security",
    profile: "/profile",
    notFound: "/404",
    login: "/login",
    home: "/",
} as const;

const { profileContacts, profileSecurity, notFound, profile, login, home } = BasePath;

export type BasePathKey = keyof typeof BasePath;
export type BasePath = (typeof BasePath)[BasePathKey];

export type Route = {
    isPrivate: boolean;
    path: string;
};

export const routes: Record<BasePathKey, Route> = {
    profileContacts: { path: profileContacts, isPrivate: true },
    profileSecurity: { path: profileSecurity, isPrivate: true },
    notFound: { isPrivate: false, path: notFound },
    profile: { isPrivate: true, path: profile },
    login: { isPrivate: false, path: login },
    home: { isPrivate: false, path: home },
};

export const apiRoutes: Record<string, Route> = {
    updateMe: { path: "/api/users/update-me", isPrivate: true },
    userCount: { path: "/api/user-count", isPrivate: false },
    refresh: { path: "/api/auth/refresh", isPrivate: false },
    getMe: { path: "/api/users/get-me", isPrivate: false },
    logout: { path: "/api/auth/logout", isPrivate: false },
    signup: { path: "/api/auth/signup", isPrivate: false },
    login: { path: "/api/auth/login", isPrivate: false },
};

const collectPaths = pipe(values, pluck("path"));
const collectPublicPaths = pipe(values, filter(propertyEq(false, "isPrivate")), pluck("path"));

export const apiPaths = collectPaths(apiRoutes);

export const publicPagePaths = collectPublicPaths(routes) as Route["path"][];
export const publicApiPaths = collectPublicPaths(apiRoutes) as Route["path"][];
export const publicPaths = concat(publicPagePaths, publicApiPaths);

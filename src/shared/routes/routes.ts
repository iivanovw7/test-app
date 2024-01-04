import { concat, filter, pipe, pluck, propEq as propertyEq, values } from "../utils";

export const BasePath = {
    home: "/",
    login: "/login",
    notFound: "/404",
    profile: "/profile",
    profileContacts: "/profile/contacts",
    profileRequests: "/profile/requests",
    profileSecurity: "/profile/security",
} as const;

const { home, login, notFound, profile, profileContacts, profileRequests, profileSecurity } = BasePath;

export type BasePathKey = keyof typeof BasePath;
export type BasePath = (typeof BasePath)[BasePathKey];

export type Route = {
    isPrivate: boolean;
    path: string;
};

export const routes: Record<BasePathKey, Route> = {
    home: { isPrivate: false, path: home },
    login: { isPrivate: false, path: login },
    notFound: { isPrivate: false, path: notFound },
    profile: { isPrivate: true, path: profile },
    profileContacts: { isPrivate: true, path: profileContacts },
    profileRequests: { isPrivate: true, path: profileRequests },
    profileSecurity: { isPrivate: true, path: profileSecurity },
};

export const apiRoutes: Record<string, Route> = {
    createRequest: { isPrivate: true, path: "/api/requests/create" },
    deleteRequest: { isPrivate: true, path: "/api/requests/delete" },
    getMe: { isPrivate: false, path: "/api/users/get-me" },
    getMyRequests: { isPrivate: true, path: "/api/requests/get-my-requests" },
    login: { isPrivate: false, path: "/api/auth/login" },
    logout: { isPrivate: false, path: "/api/auth/logout" },
    refresh: { isPrivate: false, path: "/api/auth/refresh" },
    requestCount: { isPrivate: false, path: "/api/request-count" },
    signup: { isPrivate: false, path: "/api/auth/signup" },
    updateMe: { isPrivate: true, path: "/api/users/update-me" },
    userCount: { isPrivate: false, path: "/api/user-count" },
};

const collectPaths = pipe(values, pluck("path"));
const collectPublicPaths = pipe(values, filter(propertyEq(false, "isPrivate")), pluck("path"));

export const apiPaths = collectPaths(apiRoutes);

export const publicPagePaths = collectPublicPaths(routes) as Route["path"][];
export const publicApiPaths = collectPublicPaths(apiRoutes) as Route["path"][];
export const publicPaths = concat(publicPagePaths, publicApiPaths);

import { concat, filter, pipe, pluck, propEq as propertyEq, values } from "../utils";

export const BasePath = {
    home: "/",
    login: "/login",
    notFound: "/404",
    profile: "/profile",
} as const;

const { home, login, notFound, profile } = BasePath;

export type BasePathKey = keyof typeof BasePath;
export type BasePath = (typeof BasePath)[BasePathKey];

export type Route = {
    isPrivate: boolean;
    path: string;
};

export const routes: Record<string, Route> = {
    home: { isPrivate: false, path: home },
    login: { isPrivate: false, path: login },
    notFound: { isPrivate: false, path: notFound },
    profile: { isPrivate: true, path: profile },
    profileContacts: { isPrivate: true, path: `${profile}/contacts` },
    profileRequests: { isPrivate: true, path: `${profile}/requests` },
    profileSecurity: { isPrivate: true, path: `${profile}/security` },
};

export const apiRoutes: Record<string, Route> = {
    getMe: { isPrivate: false, path: "/api/users/get-me" },
    login: { isPrivate: false, path: "/api/auth/login" },
    logout: { isPrivate: false, path: "/api/auth/logout" },
    refresh: { isPrivate: false, path: "/api/auth/refresh" },
    requestCount: { isPrivate: false, path: "/api/request-count" },
    requests: { isPrivate: false, path: "/api/requests" },
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

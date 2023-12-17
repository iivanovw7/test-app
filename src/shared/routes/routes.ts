import { propEq as propertyEq, filter, values, concat, pluck, pipe } from "../utils";

export const BasePath = {
    profile: "/profile",
    notFound: "/404",
    login: "/login",
    home: "/",
} as const;

const { notFound, profile, login, home } = BasePath;

export type BasePathKey = keyof typeof BasePath;
export type BasePath = (typeof BasePath)[BasePathKey];

export type Route = {
    isPrivate: boolean;
    path: string;
};

export const routes: Record<BasePathKey, Route> = {
    notFound: { isPrivate: false, path: notFound },
    profile: { isPrivate: true, path: profile },
    login: { isPrivate: false, path: login },
    home: { isPrivate: false, path: home },
};

const collectPublicPaths = pipe(values, filter(propertyEq(false, "isPrivate")), pluck("path"));

export const apiRoutes: Record<string, Route> = {
    userCount: { path: "/api/user-count", isPrivate: false },
    refresh: { path: "/api/auth/refresh", isPrivate: false },
    getMe: { path: "/api/users/get-me", isPrivate: false },
    logout: { path: "/api/auth/logout", isPrivate: false },
    signin: { path: "/api/auth/signin", isPrivate: false },
    login: { path: "/api/auth/login", isPrivate: false },
};

export const publicPagePaths = collectPublicPaths(routes) as Route["path"][];
export const publicApiPaths = collectPublicPaths(apiRoutes) as Route["path"][];

export const publicPaths = concat(publicPagePaths, publicApiPaths);

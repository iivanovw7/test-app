import { ascend, defaultTo, pipe, prop as property, sortWith, values } from "../utils";
import { routes } from "./routes";

const { home, login, profile } = routes;

export type NavigationElement = {
    href: string;
    isPrivate: boolean;
    label: string;
    order?: number;
};

export const navigation: Record<string, NavigationElement> = {
    home: { href: home.path, isPrivate: false, label: "Home", order: 0 },
    profile: { href: profile.path, isPrivate: true, label: "Account", order: 99 },
};

const orderProperty = defaultTo(999, property("order")) as (v: NavigationElement) => number;
const sortLinks = pipe(values, sortWith([ascend(orderProperty)]));

export const navLinks = sortLinks(navigation);

export const loginLink: NavigationElement = {
    href: login.path,
    isPrivate: false,
    label: "Login",
};

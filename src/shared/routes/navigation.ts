import { prop as property, defaultTo, sortWith, ascend, values, pipe } from "../utils";
import { routes } from "./routes";

const { profile, login, home } = routes;

export type NavigationElement = {
    isPrivate: boolean;
    order?: number;
    label: string;
    href: string;
};

export const navigation: Record<string, NavigationElement> = {
    profile: { href: profile.path, label: "Profile", isPrivate: true, order: 99 },
    home: { isPrivate: false, href: home.path, label: "Home", order: 0 },
};

const orderProperty = defaultTo(999, property("order")) as (v: NavigationElement) => number;
const sortLinks = pipe(values, sortWith([ascend(orderProperty)]));

export const navLinks = sortLinks(navigation);

export const loginLink: NavigationElement = {
    href: login.path,
    isPrivate: false,
    label: "Login",
};

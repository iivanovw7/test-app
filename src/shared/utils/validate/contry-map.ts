export const CountryMap = {
    RUSSIA: "Russia",
} as const;

export type CountryMap = (typeof CountryMap)[keyof typeof CountryMap];

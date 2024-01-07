import { createContextId, useStore } from "@builder.io/qwik";

export type HomeState = {};

export const HomeContext = createContextId<HomeState>("home-context");

export const useHomeState = () => {
    return useStore<HomeState>({});
};

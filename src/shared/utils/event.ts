/* eslint-disable @typescript-eslint/no-explicit-any */
import type { QRL } from "@builder.io/qwik";

export type CustomValueEvent<V, E extends Event = Event> = Omit<E, "target"> & {
    target: E["target"] & { value: V };
};

export type OnChangeHandler<T = any> = QRL<(event: CustomValueEvent<T>) => void>;

export type CurriedOnChange<T, V = any> = (argument: T) => OnChangeHandler<V>;

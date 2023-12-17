declare module "eslint-plugin-typescript-enum";

declare global {
    /* eslint-disable @typescript-eslint/no-explicit-any */

    export type Pixels = number;

    export type Milliseconds = number;

    export type Seconds = number;

    export type Percent = number;

    /** Represents type of `nullable` object. */
    export type Nullable<T> = null | T;

    export type ErrorMessage = string;

    export type Voidable<T> = undefined | void | T;

    export type Recordable<T = any> = Record<string, T>;

    export type UnwrapPromise<T extends Promise<any>> = T extends Promise<infer Data> ? Data : never;

    /** Represents any function. */
    export type AnyFunction = (...arguments_: any[]) => any;

    export type AsyncReturnType<T extends (...arguments_: any[]) => Promise<any>> = UnwrapPromise<ReturnType<T>>;

    export type Optional<T extends object, K extends keyof T = keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

    export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

    export type Constructor<T = any> = new (...arguments_: any[]) => T;

    export type AugmentedRequired<T extends object, K extends keyof T = keyof T> = Omit<T, K> & Required<Pick<T, K>>;

    /** Represents any object object. */
    export type AnyObject<T = any> = {
        [field: string]: T;
    };

    /** Gets property type. */
    export type PropertyType<TObject, TProperty extends keyof TObject> = TObject[TProperty];

    /** Represents type of object with partial and `nullable` fields. */
    export type PartialAndNullable<T> = {
        [P in keyof T]?: T[P] | null;
    };

    export type ObjectOrNull<T = unknown> = Nullable<AnyObject<T>>;

    export type OptionalObject<T = unknown> = Maybe<ObjectOrNull<T>>;

    /** Object containing promise. */
    export type WithPromise<T = unknown> = {
        promise: Promise<T>;
    };

    export type ValueOf<T> = T[keyof T];

    export type ExtractType<T, U extends T> = T extends U ? T : never;

    export type TypeGuard<T> = (value: unknown) => T;

    export type PartialKey<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

    export type IsTuple<T extends any[]> = number extends T["length"] ? false : true;

    export type TupleKeys<T extends any[]> = Exclude<keyof T, keyof any[]>;

    export type ArrayKey = number;

    export type Maybe<T> = undefined | T;

    export type MaybeValue<T> = undefined | null | T;

    export type MaybePromise<T> = Promise<T> | T;

    export type MaybeArray<T> = T[] | T;

    export type MaybeFunction<T> = (() => T) | T;

    /* eslint-disable @typescript-eslint/no-explicit-any */
}

export {};

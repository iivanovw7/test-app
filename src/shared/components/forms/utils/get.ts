/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable jsdoc/require-jsdoc */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable no-nested-ternary */
import type {
    FieldArrayPathValue,
    RawFieldArrayState,
    FieldArraysStore,
    FieldArrayStore,
    FieldArrayPath,
    FieldPathValue,
    RawFieldState,
    PartialValues,
    FieldElement,
    ResponseData,
    FieldValues,
    FieldsStore,
    FormOptions,
    FieldStore,
    FieldValue,
    FieldPath,
    FieldType,
    FormStore,
} from "#/forms";
import type { SafeParseReturnType, ZodType } from "zod";
import type { QRL } from "@builder.io/qwik";

import { noSerialize } from "@builder.io/qwik";

import { removeInvalidNames } from "./remove-invalid-names";
import { isFieldDirty } from "./is-field-dirty";

export const getElementInput = <TFieldValues extends FieldValues, TFieldName extends FieldPath<TFieldValues>>(
    element: FieldElement,
    field: FieldStore<TFieldValues, TFieldName>,
    type: Maybe<FieldType<any>>,
): FieldPathValue<TFieldValues, TFieldName> => {
    let { valueAsNumber, valueAsDate, checked, options, files, value } = element as HTMLInputElement &
        HTMLSelectElement &
        HTMLTextAreaElement;
    return (
        !type || type === "string"
            ? value
            : type === "string[]"
              ? options
                  ? [...options].filter((event) => event.selected && !event.disabled).map((event) => event.value)
                  : checked
                    ? [...((field.value || []) as string[]), value]
                    : ((field.value || []) as string[]).filter((v) => v !== value)
              : type === "number"
                ? valueAsNumber
                : type === "boolean"
                  ? checked
                  : type === "File" && files
                    ? noSerialize(files[0])
                    : type === "File[]" && files
                      ? [...files].map((file) => noSerialize(file))
                      : type === "Date" && valueAsDate
                        ? valueAsDate
                        : field.value
    ) as FieldPathValue<TFieldValues, TFieldName>;
};

export const getFieldAndArrayStores = <TFieldValues extends FieldValues, TResponseData extends ResponseData>(
    form: FormStore<TFieldValues, TResponseData>,
): (
    | FieldArrayStore<TFieldValues, FieldArrayPath<TFieldValues>>
    | FieldStore<TFieldValues, FieldPath<TFieldValues>>
)[] => {
    return [...Object.values(form.internal.fields), ...Object.values(form.internal.fieldArrays)] as (
        | FieldArrayStore<TFieldValues, FieldArrayPath<TFieldValues>>
        | FieldStore<TFieldValues, FieldPath<TFieldValues>>
    )[];
};

export const getFieldArrayNames = <TFieldValues extends FieldValues, TResponseData extends ResponseData>(
    form: FormStore<TFieldValues, TResponseData>,
    shouldValid: Maybe<boolean> = true,
): FieldArrayPath<TFieldValues>[] => {
    let fieldArrayNames = Object.keys(form.internal.fieldArrays) as FieldArrayPath<TFieldValues>[];

    if (shouldValid) {
        removeInvalidNames(form, fieldArrayNames);
    }

    return fieldArrayNames;
};

export const getFieldArrayState = <TFieldValues extends FieldValues, TResponseData extends ResponseData>(
    form: FormStore<TFieldValues, TResponseData>,
    name: FieldArrayPath<TFieldValues>,
): Maybe<RawFieldArrayState> => {
    let fieldArray = getFieldArrayStore(form, name);
    return fieldArray
        ? {
              startItems: fieldArray.internal.startItems,
              touched: fieldArray.touched,
              items: fieldArray.items,
              error: fieldArray.error,
              dirty: fieldArray.dirty,
          }
        : undefined;
};

export const getFieldArrayStore = <
    TFieldValues extends FieldValues,
    TResponseData extends ResponseData,
    TFieldArrayName extends FieldArrayPath<TFieldValues>,
>(
    form: FormStore<TFieldValues, TResponseData>,
    name: TFieldArrayName,
): Maybe<FieldArrayStore<TFieldValues, TFieldArrayName>> => {
    return form.internal.fieldArrays[name];
};

export const getFieldNames = <TFieldValues extends FieldValues, TResponseData extends ResponseData>(
    form: FormStore<TFieldValues, TResponseData>,
    shouldValid: Maybe<boolean> = true,
): FieldPath<TFieldValues>[] => {
    let fieldNames = Object.keys(form.internal.fields) as FieldPath<TFieldValues>[];

    if (shouldValid) {
        removeInvalidNames(form, fieldNames);
    }

    return fieldNames;
};

export const getFieldState = <
    TFieldValues extends FieldValues,
    TResponseData extends ResponseData,
    TFieldName extends FieldPath<TFieldValues>,
>(
    form: FormStore<TFieldValues, TResponseData>,
    name: TFieldName,
): Maybe<RawFieldState<TFieldValues, TFieldName>> => {
    let field = getFieldStore(form, name);

    return field
        ? {
              startValue: field.internal.startValue,
              touched: field.touched,
              value: field.value,
              error: field.error,
              dirty: field.dirty,
          }
        : undefined;
};

export const getFieldStore = <
    TFieldValues extends FieldValues,
    TResponseData extends ResponseData,
    TFieldName extends FieldPath<TFieldValues>,
>(
    form: FormStore<TFieldValues, TResponseData>,
    name: TFieldName,
): Maybe<FieldStore<TFieldValues, TFieldName>> => {
    return form.internal.fields[name];
};

export const getFilteredNames = <
    TFieldValues extends FieldValues,
    TResponseData extends ResponseData,
    TOptions extends Record<string, any>,
>(
    form: FormStore<TFieldValues, TResponseData>,
    argument2?: Maybe<
        | (FieldArrayPath<TFieldValues> | FieldPath<TFieldValues>)[]
        | FieldArrayPath<TFieldValues>
        | FieldPath<TFieldValues>
        | TOptions
    >,
    shouldValid?: Maybe<boolean>,
): [FieldPath<TFieldValues>[], FieldArrayPath<TFieldValues>[]] => {
    let allFieldNames = getFieldNames(form, shouldValid);
    let allFieldArrayNames = getFieldArrayNames(form, shouldValid);

    if (typeof argument2 === "string" || Array.isArray(argument2)) {
        return (typeof argument2 === "string" ? [argument2] : argument2)
            .reduce(
                (tuple, name) => {
                    let [fieldNames, fieldArrayNames] = tuple;

                    if (allFieldArrayNames.includes(name as FieldArrayPath<TFieldValues>)) {
                        allFieldArrayNames.forEach((fieldArrayName) => {
                            if (fieldArrayName.startsWith(name)) {
                                fieldArrayNames.add(fieldArrayName);
                            }
                        });
                        allFieldNames.forEach((fieldName) => {
                            if (fieldName.startsWith(name)) {
                                fieldNames.add(fieldName);
                            }
                        });
                    } else {
                        fieldNames.add(name as FieldPath<TFieldValues>);
                    }

                    return tuple;
                },
                [new Set(), new Set()] as [Set<FieldPath<TFieldValues>>, Set<FieldArrayPath<TFieldValues>>],
            )
            .map((set) => [...set]) as [FieldPath<TFieldValues>[], FieldArrayPath<TFieldValues>[]];
    }

    return [allFieldNames, allFieldArrayNames];
};

type InitialFieldArrayState = {
    initialItems: number[];
    items: number[];
    error: string;
};

export const getInitialFieldArrayStore = <
    TFieldValues extends FieldValues,
    TFieldArrayName extends FieldArrayPath<TFieldValues>,
>(
    name: TFieldArrayName,
    { initialItems, items, error }: InitialFieldArrayState = {
        initialItems: [],
        items: [],
        error: "",
    },
): FieldArrayStore<TFieldValues, TFieldArrayName> => {
    let dirty = initialItems.join() !== items.join();
    return {
        internal: {
            initialItems: [...initialItems],
            startItems: [...initialItems],
            consumers: [],
            validate: [],
        },
        touched: dirty,
        active: false,
        items,
        error,
        dirty,
        name,
    };
};

type InitialFieldState<TFieldValues extends FieldValues, TFieldName extends FieldPath<TFieldValues>> = {
    initialValue: Maybe<FieldPathValue<TFieldValues, TFieldName>>;
    value: Maybe<FieldPathValue<TFieldValues, TFieldName>>;
    error: string;
};

export const getInitialFieldStore = <TFieldValues extends FieldValues, TFieldName extends FieldPath<TFieldValues>>(
    name: TFieldName,
    { initialValue, value, error }: InitialFieldState<TFieldValues, TFieldName> = {
        initialValue: undefined,
        value: undefined,
        error: "",
    },
): FieldStore<TFieldValues, TFieldName> => {
    let dirty = isFieldDirty(initialValue as Maybe<FieldValue>, value as Maybe<FieldValue>);

    return {
        internal: {
            startValue: initialValue,
            transform: [],
            consumers: [],
            initialValue,
            validate: [],
            elements: [],
        },
        touched: dirty,
        active: false,
        value,
        error,
        dirty,
        name,
    };
};

export const getInitialStores = <TFieldValues extends FieldValues, TResponseData extends ResponseData>({
    fieldArrays,
    loader,
}: Pick<FormOptions<TFieldValues, TResponseData>, "fieldArrays" | "loader">): [
    FieldsStore<TFieldValues>,
    FieldArraysStore<TFieldValues>,
] => {
    function getActionValue<TFieldName extends FieldPath<TFieldValues>>(
        name: TFieldName,
    ): Maybe<FieldPathValue<TFieldValues, TFieldName>>;
    function getActionValue<TFieldArrayName extends FieldArrayPath<TFieldValues>>(
        name: TFieldArrayName,
    ): Maybe<FieldArrayPathValue<TFieldValues, TFieldArrayName>>;
    function getActionValue(name: any): any {}

    let generateItems = () => getUniqueId();

    let getActionError = <
        TFieldName extends FieldPath<TFieldValues>,
        TFieldArrayName extends FieldArrayPath<TFieldValues>,
    >(): string => "";

    let createInitialStores = (
        stores: [FieldsStore<TFieldValues>, FieldArraysStore<TFieldValues>],
        data: object,
        previousPath?: Maybe<string>,
    ) =>
        Object.entries(data).reduce((stores, [path, value]) => {
            let compoundPath = previousPath ? `${previousPath}.${path}` : path;

            if (fieldArrays?.includes(compoundPath.replaceAll(/.\d+./g, ".$.") as any)) {
                let initialItems = value.map(generateItems);
                stores[1][compoundPath as FieldArrayPath<TFieldValues>] = getInitialFieldArrayStore(
                    compoundPath as FieldArrayPath<TFieldValues>,
                    {
                        items: getActionValue(compoundPath as FieldArrayPath<TFieldValues>)?.map(generateItems) || [
                            ...initialItems,
                        ],
                        error: getActionError(),
                        initialItems,
                    },
                );
            } else if (!value || typeof value !== "object" || Array.isArray(value) || value instanceof Date) {
                stores[0][compoundPath as FieldPath<TFieldValues>] = getInitialFieldStore(
                    compoundPath as FieldPath<TFieldValues>,
                    {
                        value: getActionValue(compoundPath as FieldPath<TFieldValues>) ?? value,
                        error: getActionError(),
                        initialValue: value,
                    },
                );
            }

            if (value && typeof value === "object") {
                createInitialStores(stores, value, compoundPath);
            }

            return stores;
        }, stores);

    return createInitialStores([{}, {}], loader.value) as [FieldsStore<TFieldValues>, FieldArraysStore<TFieldValues>];
};

export const getOptions = <TName extends string, TOptions extends Record<string, any>>(
    argument1?: TOptions | TName[] | TName,
    argument2?: TOptions,
): Partial<TOptions> => {
    return (typeof argument1 !== "string" && !Array.isArray(argument1) ? argument1 : argument2) || {};
};

export const getParsedZodSchema = async <Schema, Value>(
    schema: QRL<MaybeFunction<ZodType<any, any, Schema>>>,
    value: Value,
): Promise<SafeParseReturnType<Schema, any>> => {
    let zodSchema = await schema.resolve();

    return (typeof zodSchema === "function" ? zodSchema() : zodSchema).safeParse(value);
};

export const getPathIndex = <TFieldValues extends FieldValues>(
    name: string,
    path: FieldArrayPath<TFieldValues> | FieldPath<TFieldValues>,
): number => {
    return +path.replace(`${name}.`, "").split(".")[0];
};

export function getPathValue<TFieldValues extends FieldValues, TFieldName extends FieldPath<TFieldValues>>(
    path: TFieldName,
    object: PartialValues<TFieldValues>,
): Maybe<FieldPathValue<TFieldValues, TFieldName>>;

export function getPathValue<TFieldValues extends FieldValues, TFieldArrayName extends FieldArrayPath<TFieldValues>>(
    path: TFieldArrayName,
    object: PartialValues<TFieldValues>,
): Maybe<FieldArrayPathValue<TFieldValues, TFieldArrayName>>;

export function getPathValue(path: string, object: Record<string, any>): any {
    return path.split(".").reduce<any>((value, key) => value?.[key], object);
}

let counter = 0;

export const getUniqueId = (): number => {
    return counter++;
};

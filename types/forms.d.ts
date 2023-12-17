import type { QwikChangeEvent, QwikFocusEvent, NoSerialize, QRL } from "@builder.io/qwik";

/* eslint-disable @typescript-eslint/no-explicit-any */

export type FieldValue = MaybeValue<
    | NoSerialize<Blob>[]
    | NoSerialize<File>[]
    | NoSerialize<Blob>
    | NoSerialize<File>
    | string[]
    | boolean
    | string
    | number
    | Date
>;

export type FieldType<T> = T extends MaybeValue<string>
    ? "string"
    : T extends MaybeValue<string[]>
      ? "string[]"
      : T extends MaybeValue<number>
        ? "number"
        : T extends MaybeValue<boolean>
          ? "boolean"
          : T extends MaybeValue<NoSerialize<Blob> | NoSerialize<File>>
            ? "File"
            : T extends MaybeValue<NoSerialize<Blob>[] | NoSerialize<File>[]>
              ? "File[]"
              : T extends MaybeValue<Date>
                ? "Date"
                : never;

export type FieldElement = HTMLTextAreaElement | HTMLSelectElement | HTMLInputElement;

export type FieldEvent = QwikChangeEvent<FieldElement> | QwikFocusEvent<FieldElement> | Event;

export type FieldValues = {
    [name: string]: (FieldValues | FieldValue)[] | FieldValues | FieldValue;
};

export type ValidateField<TFieldValue> = (value: Maybe<TFieldValue>) => MaybePromise<string>;

export type TransformField<TFieldValue> = (
    value: Maybe<TFieldValue>,
    event: FieldEvent,
    element: FieldElement,
) => MaybePromise<Maybe<TFieldValue>>;

export type InternalFieldStore<TFieldValues extends FieldValues, TFieldName extends FieldPath<TFieldValues>> = {
    transform: QRL<TransformField<FieldPathValue<TFieldValues, TFieldName>>>[];
    validate: QRL<ValidateField<FieldPathValue<TFieldValues, TFieldName>>>[];
    initialValue: Maybe<FieldPathValue<TFieldValues, TFieldName>>;
    startValue: Maybe<FieldPathValue<TFieldValues, TFieldName>>;
    elements: FieldElement[];
    consumers: number[];
};

export type FieldStore<TFieldValues extends FieldValues, TFieldName extends FieldPath<TFieldValues>> = {
    internal: InternalFieldStore<TFieldValues, TFieldName>;
    value: Maybe<FieldPathValue<TFieldValues, TFieldName>>;
    name: TFieldName;
    touched: boolean;
    active: boolean;
    dirty: boolean;
    error: string;
};

export type RawFieldState<TFieldValues extends FieldValues, TFieldName extends FieldPath<TFieldValues>> = {
    startValue: Maybe<FieldPathValue<TFieldValues, TFieldName>>;
    value: Maybe<FieldPathValue<TFieldValues, TFieldName>>;
    touched: boolean;
    dirty: boolean;
    error: string;
};

export type ValidateFieldArray<TFieldArrayItems> = (items: TFieldArrayItems) => MaybePromise<string>;

export type InternalFieldArrayStore = {
    validate: QRL<ValidateFieldArray<number[]>>[];
    initialItems: number[];
    startItems: number[];
    consumers: number[];
};

export type FieldArrayStore<TFieldValues extends FieldValues, TFieldArrayName extends FieldArrayPath<TFieldValues>> = {
    internal: InternalFieldArrayStore;
    name: TFieldArrayName;
    touched: boolean;
    items: number[];
    active: boolean;
    dirty: boolean;
    error: string;
};

export type RawFieldArrayState = {
    startItems: number[];
    touched: boolean;
    items: number[];
    dirty: boolean;
    error: string;
};

export type ValidationMode = "touched" | "change" | "submit" | "input" | "blur";

export type ResponseStatus = "success" | "error" | "info";

export type ResponseData = Maybe<Record<string, any> | any[]>;

export type FormResponse<TResponseData extends ResponseData> = Partial<{
    status: ResponseStatus;
    data: TResponseData;
    message: string;
}>;

export type FormErrors<TFieldValues extends FieldValues> = {
    [name in FieldArrayPath<TFieldValues> | FieldPath<TFieldValues>]?: Maybe<string>;
};

export type ValidateForm<TFieldValues extends FieldValues> = (
    values: PartialValues<TFieldValues>,
) => MaybePromise<FormErrors<TFieldValues>>;

export type FieldsStore<TFieldValues extends FieldValues> = {
    [Name in FieldPath<TFieldValues>]?: FieldStore<TFieldValues, Name>;
};

export type FieldArraysStore<TFieldValues extends FieldValues> = {
    [Name in FieldArrayPath<TFieldValues>]?: FieldArrayStore<TFieldValues, Name>;
};

export type InitialValues<TValue> = TValue extends NoSerialize<Blob>[] | NoSerialize<File>[] | string[]
    ? TValue
    : TValue extends FieldValue
      ? Maybe<TValue>
      : { [Key in keyof Required<TValue>]: InitialValues<TValue[Key]> };

export type PartialValues<TValue> = TValue extends NoSerialize<Blob>[] | NoSerialize<File>[] | string[]
    ? TValue
    : TValue extends FieldValue
      ? Maybe<TValue>
      : { [Key in keyof TValue]?: PartialValues<TValue[Key]> };

export type FormDataInfo<TFieldValues extends FieldValues> = Partial<{
    files: TypeInfoPath<
        TFieldValues,
        NoSerialize<Blob>[] | NoSerialize<File>[] | NoSerialize<Blob> | NoSerialize<File>
    >[];
    booleans: TypeInfoPath<TFieldValues, boolean>[];
    numbers: TypeInfoPath<TFieldValues, number>[];
    arrays: TypeInfoPath<TFieldValues, any[]>[];
    dates: TypeInfoPath<TFieldValues, Date>[];
}>;

export type FormActionStore<TFieldValues extends FieldValues, TResponseData extends ResponseData> = {
    response: FormResponse<TResponseData>;
    values: PartialValues<TFieldValues>;
    errors: FormErrors<TFieldValues>;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type FormOptions<TFieldValues extends FieldValues, TResponseData extends ResponseData> = {
    loader: Readonly<Signal<InitialValues<TFieldValues>>>;
    validate?: Maybe<QRL<ValidateForm<TFieldValues>>>;
    fieldArrays?: TypeInfoPath<TFieldValues, any[]>[];
    revalidateOn?: Maybe<ValidationMode>;
    validateOn?: Maybe<ValidationMode>;
};

export type InternalFormStore<TFieldValues extends FieldValues> = {
    fieldArrayPaths: Maybe<TypeInfoPath<TFieldValues, any[]>[]>;
    validate: Maybe<QRL<ValidateForm<TFieldValues>>>;
    fieldArrays: FieldArraysStore<TFieldValues>;
    fields: FieldsStore<TFieldValues>;
    revalidateOn: ValidationMode;
    validateOn: ValidationMode;
    validators: number[];
};

export type FormStore<TFieldValues extends FieldValues, TResponseData extends ResponseData> = {
    internal: InternalFormStore<TFieldValues>;
    response: FormResponse<TResponseData>;
    element: HTMLFormElement | undefined;
    submitCount: number;
    submitting: boolean;
    validating: boolean;
    submitted: boolean;
    touched: boolean;
    invalid: boolean;
    dirty: boolean;
};

export type FormValues<TFormStore extends FormStore<any, any>> = TFormStore extends FormStore<infer TFieldValues, any>
    ? TFieldValues
    : never;

type ValuePath<TKey extends string | number, TValue> = TValue extends string[]
    ? `${TKey}.${ValuePaths<TValue>}` | `${TKey}`
    : TValue extends FieldValue | Blob
      ? `${TKey}`
      : `${TKey}.${ValuePaths<TValue>}`;

type ValuePaths<TValue> = TValue extends (infer TChild)[]
    ? IsTuple<TValue> extends true
        ? {
              [TKey in TupleKeys<TValue>]-?: ValuePath<TKey & string, TValue[TKey]>;
          }[TupleKeys<TValue>]
        : ValuePath<ArrayKey, TChild>
    : {
          [TKey in keyof TValue]-?: ValuePath<TKey & string, TValue[TKey]>;
      }[keyof TValue];

export type FieldPath<TFieldValues extends FieldValues> = ValuePaths<TFieldValues>;

type PathValue<TValue, TPath> = TPath extends `${infer TKey1}.${infer TKey2}`
    ? TKey1 extends keyof TValue
        ? TKey2 extends ValuePaths<TValue[TKey1]> | ArrayPaths<TValue[TKey1]>
            ? PathValue<TValue[TKey1], TKey2>
            : never
        : TKey1 extends `${ArrayKey}`
          ? TValue extends (infer TChild)[]
              ? PathValue<TChild, TKey2 & (ValuePaths<TChild> | ArrayPaths<TChild>)>
              : never
          : never
    : TPath extends keyof TValue
      ? TValue[TPath]
      : never;

export type FieldPathValue<TFieldValues extends FieldValues, TFieldPath extends FieldPath<TFieldValues>> = PathValue<
    TFieldValues,
    TFieldPath
>;

type ArrayPath<TKey extends string | number, Value> = Value extends any[]
    ? `${TKey}.${ArrayPaths<Value>}` | `${TKey}`
    : Value extends FieldValues
      ? `${TKey}.${ArrayPaths<Value>}`
      : never;

type ArrayPaths<TValue> = TValue extends (infer TChild)[]
    ? IsTuple<TValue> extends true
        ? {
              [TKey in TupleKeys<TValue>]-?: ArrayPath<TKey & string, TValue[TKey]>;
          }[TupleKeys<TValue>]
        : ArrayPath<ArrayKey, TChild>
    : {
          [TKey in keyof TValue]-?: ArrayPath<TKey & string, TValue[TKey]>;
      }[keyof TValue];

export type FieldArrayPath<TFieldValues extends FieldValues> = ArrayPaths<TFieldValues>;

export type FieldArrayPathValue<
    TFieldValues extends FieldValues,
    TFieldArrayPath extends FieldArrayPath<TFieldValues>,
> = PathValue<TFieldValues, TFieldArrayPath> & unknown[];

type TypeTemplatePath<Key extends string | number, Value, Type> = Value extends Type
    ? Value extends Record<string, any> | any[]
        ? `${Key}.${TypeTemplatePaths<Value, Type>}` | `${Key}`
        : `${Key}`
    : Value extends (FieldValues | FieldValue)[] | FieldValues
      ? `${Key extends number ? "$" : Key}.${TypeTemplatePaths<Value, Type>}`
      : never;

type TypeTemplatePaths<Data, Type> = Data extends (infer Child)[]
    ? IsTuple<Data> extends true
        ? {
              [Key in TupleKeys<Data>]-?: TypeTemplatePath<Key & string, Data[Key], Type>;
          }[TupleKeys<Data>]
        : TypeTemplatePath<ArrayKey, Child, Type>
    : {
          [Key in keyof Data]-?: TypeTemplatePath<Key & string, Data[Key], Type>;
      }[keyof Data];

export type TypeInfoPath<TFieldValues extends FieldValues, Type> = TypeTemplatePaths<TFieldValues, Type>;

/* eslint-enable @typescript-eslint/no-explicit-any */

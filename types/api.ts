export type TBasicApiList<Data> = {
    count: number;
    data: Data[];
};

export type TBasicApiListResult<Data> = TBasicApiResult<TBasicApiList<Data>>;

export type TBasicApiResult<Data> = {
    data: Nullable<Data>;
    success: boolean;
    message: string;
};

export type TBasicApiError = {
    success: boolean;
    message: string;
    code: ErrorCode;
    error?: unknown;
};

export type QueryUserCount = {
    count: number;
};

export type QueryUserModel = {
    firstName: string;
    lastName: string;
    password: string;
    email: string;
    role: string;
    _id: string;
};

export type QueryUser = Omit<QueryUserModel, "password" | "_id"> & {
    id: string;
};

export type LoginData = {
    password: string;
    email: string;
};

export const ErrorCode = {
    INVALID_REFRESH_TOKEN: 4002,
    INTERNAL_SERVER_ERROR: 5000,
    USER_NOT_FOUND: 4004,
    WRONG_PASSWORD: 4003,
    UNAUTHORIZED: 4001,
} as const;

export type ErrorCode = (typeof ErrorCode)[keyof typeof ErrorCode];

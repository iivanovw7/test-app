export type TBasicApiList<Data> = {
    count: number;
    data: Data[];
};

export type TBasicApiListResult<Data> = TBasicApiResult<TBasicApiList<Data>>;

export type TBasicApiResult<Data> = {
    data: Nullable<Data>;
    message: string;
    success: true;
};

export type TBasicApiError = {
    message: string;
    code: ErrorCode;
    success: false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error?: any;
};

export type QueryUserCount = {
    count: number;
};

export type QueryUserModel = {
    firstName: string;
    lastName: string;
    password: string;
    role: UserRole;
    email: string;
    _id: string;
};

export type QueryUser = Omit<QueryUserModel, "password" | "_id"> & {
    id: string;
};

export type UserSignupData = Omit<QueryUserModel, "role" | "_id">;

export const UserRole = {
    ADMIN: "ADMIN",
    USER: "USER",
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

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
    USER_EXISTS: 4005,
} as const;

export type ErrorCode = (typeof ErrorCode)[keyof typeof ErrorCode];

import type { ObjectId } from "mongodb";

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
    code: ErrorCode;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error?: any;
    message: string;
    success: false;
};

export type QueryUserCount = {
    count: number;
};

export type QueryUserContactsModel = {
    phone: string;
    telegram?: string;
    whatsapp?: string;
};

export type QueryUserAddressModel = {
    apartment: string;
    building: string;
    city: string;
    country: "Russia";
    postalCode: string;
    street: string;
};

export type QueryUserModel = {
    _id: ObjectId;
    address: QueryUserAddressModel;
    contacts: QueryUserContactsModel;
    createdAt: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    role: UserRole;
    updatedAt: string;
};

export type QueryUser = Omit<QueryUserModel, "_id" | "password"> & {
    id: string;
};

export type UserSignupData = Omit<QueryUserModel, "_id" | "address" | "contacts" | "createdAt" | "role" | "updatedAt"> &
    Pick<QueryUserAddressModel, "apartment" | "building" | "city" | "country" | "postalCode" | "street"> &
    Pick<QueryUserContactsModel, "phone" | "telegram" | "whatsapp">;

export type UserUpdateData = Partial<UserSignupData> & Partial<QueryUserContactsModel>;

export const UserRole = {
    ADMIN: "ADMIN",
    USER: "USER",
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export type LoginData = {
    email: string;
    password: string;
};

export type QueryRequestModel = {
    _id: ObjectId;
    authorId: ObjectId;
    avatarUrl: string;
    createdAt: string;
    description: string;
    endsAt: string;
    isHidden: boolean;
    startsAt: string;
    title: string;
};

export type QueryRequest = Omit<QueryRequestModel, "_id"> & {
    id: string;
};

export type CreateRequestData = Omit<QueryRequestModel, "_id" | "authorId" | "createdAt">;

export const ErrorCode = {
    INTERNAL_SERVER_ERROR: 5000,
    INVALID_REFRESH_TOKEN: 4002,
    UNAUTHORIZED: 4001,
    USER_EXISTS: 4005,
    USER_NOT_FOUND: 4004,
    VALIDATION_ERROR: 4006,
    WRONG_PASSWORD: 4003,
} as const;

export type ErrorCode = (typeof ErrorCode)[keyof typeof ErrorCode];

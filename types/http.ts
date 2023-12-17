/*
    eslint-disable
    @typescript-eslint/no-explicit-any,
    @typescript-eslint/no-redeclare,

*/

export type UploadFileParameters = {
    [key: string]: any;
    data?: Recordable;
    file: Blob | File;
    filename?: string;
    name?: string;
};

export type Result<T = any> = {
    code: number;
    result: T;
};

export const HttpStatus = {
    NON_AUTHORITATIVE_INFORMATION: 203,
    HTTP_VERSION_NOT_SUPPORTED: 505,
    INTERNAL_SERVER_ERROR: 500,
    SERVICE_UNAVAILABLE: 503,
    GATEWAY_TIMEOUT: 504,
    NOT_IMPLEMENTED: 501,
    PARTIAL_CONTENT: 206,
    RESET_CONTENT: 205,
    UNAUTHORIZED: 401,
    BAD_GATEWAY: 502,
    BAD_REQUEST: 400,
    NO_CONTENT: 204,
    AMBIGUOUS: 300,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    ACCEPTED: 202,
    CONFLICT: 409,
    CREATED: 201,
    OK: 200,
} as const;

export type HttpStatus = (typeof HttpStatus)[keyof typeof HttpStatus];

/*
    eslint-enable
    @typescript-eslint/no-explicit-any,
    @typescript-eslint/no-redeclare,
*/

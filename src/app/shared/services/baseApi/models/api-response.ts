export interface ApiResponseBase {
    status: 'ok' | 'error';
    message: string;
}

export type ApiResponse<K extends string, T> = ApiResponseBase & {
    [key in K]: T; // dynamically creates a key of type K with value type T
};
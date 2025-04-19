export const ALLOWED_ERROR_KEYS = ['required', 'email', 'minlength', 'maxlength', 'pattern'] as const;

// this will evaluate to this
// type AllowedErrorKeys = 'required' | 'email' | 'minlength' | 'maxlength' | 'pattern';
export type AllowedErrorKeys = (typeof ALLOWED_ERROR_KEYS)[number];


export type ErrorMessages = Partial<Record<AllowedErrorKeys, string>>;
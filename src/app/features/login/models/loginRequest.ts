export interface LoginRequest {
  username: string;
  password: string;
  expiresIn?: number; // Optional with a default value
}
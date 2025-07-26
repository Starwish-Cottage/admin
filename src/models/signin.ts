export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  full_name: string;
  session_token: string;
  message: string;
}

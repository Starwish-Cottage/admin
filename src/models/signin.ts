export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  full_name: string;
  session_token: string;
}

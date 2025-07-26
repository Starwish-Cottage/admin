export interface VerifySessionRequest {
  session_token: string;
}

export interface VerifySessionResponse {
  valid: boolean;
  message: string;
}

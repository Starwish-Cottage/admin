import type {
  VerifySessionRequest,
  VerifySessionResponse,
} from "@/models/verify_session";

const API_ENDPOINT = import.meta.env.VITE_ENDPOINT;

export const verifySession = async (
  session_token: string
): Promise<VerifySessionResponse> => {
  const data = { session_token } as VerifySessionRequest;
  const response = await fetch(`${API_ENDPOINT}/verify-session`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session_token}`,
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  if (!response.ok || !result.valid) {
    throw new Error(result.message);
  }
  return result as VerifySessionResponse;
};

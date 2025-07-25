import { type LoginRequest, type LoginResponse } from "@/models/signin";

const API_ENDPOINT = import.meta.env.VITE_ENDPOINT;

export const signIn = async (data: LoginRequest) => {
  const response = await fetch(`${API_ENDPOINT}/admin/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.error);
  } else {
    return result as LoginResponse;
  }
};

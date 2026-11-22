import { apiClient } from "../api-client.ts";

export interface CheckEmailDuplicateResponse {
  available: boolean;
}

export function checkEmailDuplicate(email: string) {
  return apiClient
    .get(`members/email/${encodeURIComponent(email)}`)
    .json<CheckEmailDuplicateResponse>();
}

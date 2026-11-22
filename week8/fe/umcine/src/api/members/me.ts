import { authApi } from "../auth-api";
import type { ApiResponse } from "../response";

export interface MemberInfo { email: string; nickname: string; createdAt: string }
export async function getMe() {
  return (await authApi.get("members/me").json<ApiResponse<MemberInfo>>()).result;
}

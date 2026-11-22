import { authApi } from "../auth-api.ts";
import type { ApiResponse } from "../api-response.ts";
import type { Favorite } from "./models.ts";

// GET /favorites: 내 즐겨찾기 목록 (최근에 추가한 순)
export async function getFavorites() {
    const response = await authApi.get("favorites").json<ApiResponse<Favorite[]>>();
    return response.result;
}

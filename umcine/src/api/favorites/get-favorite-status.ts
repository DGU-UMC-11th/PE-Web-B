import { authApi } from "../auth-api.ts";
import type { ApiResponse } from "../api-response.ts";
import type { FavoriteStatus } from "./models.ts";

// GET /favorites/{movieId}: 이 영화를 즐겨찾기했는지
export async function getFavoriteStatus(movieId: number) {
    const response = await authApi.get(`favorites/${movieId}`).json<ApiResponse<FavoriteStatus>>();
    return response.result;
}

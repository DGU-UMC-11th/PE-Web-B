import { authApi } from "../auth-api.ts";
import type { ApiResponse } from "../api-response.ts";

// DELETE /favorites/{movieId}: 즐겨찾기 해제. 즐겨찾기하지 않은 영화면 404를 응답해요.
export async function removeFavorite(movieId: number) {
    await authApi.delete(`favorites/${movieId}`).json<ApiResponse<null>>();
}

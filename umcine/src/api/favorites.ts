import type { ApiResponse } from "./api-client";
import { authApi } from "./auth-api";

export interface Favorite {
  favoriteId: number;
  movieId: number;
  createdAt: string; // JSON에는 Date가 없어서 문자열로 옴
}

// GET /favorites: 내 즐겨찾기 목록 (최신순)
export async function getFavorites() {
  const response = await authApi.get("favorites").json<ApiResponse<Favorite[]>>();
  return response.result;
}

// GET /favorites/{movieId}: 이 영화를 즐겨찾기했는지
export async function getFavoriteStatus(movieId: number) {
  const response = await authApi
    .get(`favorites/${movieId}`)
    .json<ApiResponse<{ isFavorite: boolean }>>();
  return response.result;
}

// POST /favorites
export function addFavorite(movieId: number) {
  return authApi.post("favorites", { json: { movieId } }).json<ApiResponse<Favorite>>();
}

// DELETE /favorites/{movieId}
export function deleteFavorite(movieId: number) {
  return authApi.delete(`favorites/${movieId}`).json<ApiResponse<null>>();
}

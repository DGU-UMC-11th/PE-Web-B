import { authApi } from "../auth-api";
import type { ApiResponse } from "../api-response";

export interface Favorite {
  favoriteId: number;
  movieId: number;
  createdAt: string;
}

/** GET /favorites: 내 즐겨찾기 목록 (회원은 토큰으로 구분) */
export async function getFavorites(): Promise<Favorite[]> {
  const response = await authApi.get("favorites").json<ApiResponse<Favorite[]>>();
  return response.result;
}

/** GET /favorites/{movieId}: 이 영화를 즐겨찾기했는지 */
export async function getFavoriteStatus(movieId: number): Promise<boolean> {
  const response = await authApi
    .get(`favorites/${movieId}`)
    .json<ApiResponse<{ isFavorite: boolean }>>();
  return response.result.isFavorite;
}

/** POST /favorites */
export function addFavorite(movieId: number) {
  return authApi.post("favorites", { json: { movieId } }).json<ApiResponse<Favorite>>();
}

/** DELETE /favorites/{movieId}: favoriteId가 아니라 movieId로 해제 */
export function removeFavorite(movieId: number) {
  return authApi.delete(`favorites/${movieId}`).json<ApiResponse<null>>();
}

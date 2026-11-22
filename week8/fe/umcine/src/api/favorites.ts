import { authApi } from "./auth-api";
import type { ApiResponse } from "./response";

export interface Favorite { favoriteId: number; movieId: number; createdAt: string }
export async function getFavorites() {
  return (await authApi.get("favorites").json<ApiResponse<Favorite[]>>()).result;
}
export async function getFavorite(movieId: number) {
  return (await authApi.get(`favorites/${movieId}`).json<ApiResponse<{ isFavorite: boolean }>>()).result;
}
export function addFavorite(movieId: number) {
  return authApi.post("favorites", { json: { movieId } }).json<ApiResponse<Favorite>>();
}
export function deleteFavorite(movieId: number) {
  return authApi.delete(`favorites/${movieId}`).json<ApiResponse<null>>();
}

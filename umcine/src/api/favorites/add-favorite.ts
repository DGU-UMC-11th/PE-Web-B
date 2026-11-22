import { authApi } from "../auth-api.ts";
import type { ApiResponse } from "../api-response.ts";
import type { Favorite } from "./models.ts";

// POST /favorites: 즐겨찾기 추가. 이미 추가한 영화면 409를 응답해요.
export async function addFavorite(movieId: number) {
    const response = await authApi
        .post("favorites", { json: { movieId } })
        .json<ApiResponse<Favorite>>();
    return response.result;
}

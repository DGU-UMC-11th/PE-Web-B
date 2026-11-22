import { authApi } from "../auth-api.ts";
import type { ApiResponse } from "../api-response.ts";

// DELETE /ratings/{ratingId}: 평점 삭제. 내 평점이 아니면 403을 응답해요.
export async function deleteRating(ratingId: number) {
    await authApi.delete(`ratings/${ratingId}`).json<ApiResponse<null>>();
}

import { authApi } from "../auth-api.ts";
import type { ApiResponse } from "../api-response.ts";
import type { RatingBody } from "./models.ts";

export interface UpdateRatingRequest extends RatingBody {
    ratingId: number;
}

// PATCH /ratings/{ratingId}: 평점 수정. 서버가 result에 null을 보내서 수정된 평점은 응답에 없어요.
export async function updateRating({ ratingId, ...body }: UpdateRatingRequest) {
    await authApi.patch(`ratings/${ratingId}`, { json: body }).json<ApiResponse<null>>();
}

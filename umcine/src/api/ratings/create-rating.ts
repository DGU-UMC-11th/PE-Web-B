import { authApi } from "../auth-api.ts";
import type { ApiResponse } from "../api-response.ts";
import type { Rating, RatingBody } from "./models.ts";

export interface CreateRatingRequest extends RatingBody {
    movieId: number;
}

// POST /ratings: 평점 등록. 영화마다 한 번만 등록할 수 있어서 이미 있으면 409를 응답해요.
export async function createRating(body: CreateRatingRequest) {
    const response = await authApi.post("ratings", { json: body }).json<ApiResponse<Rating>>();
    return response.result;
}

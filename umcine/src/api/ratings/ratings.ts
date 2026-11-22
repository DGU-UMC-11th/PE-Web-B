import { authApi } from "../auth-api";
import type { ApiResponse } from "../api-response";

export interface Rating {
  ratingId: number;
  movieId: number;
  score: number;
  comment: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface RatingBody {
  score: number;
  comment?: string;
}

// 공개 API이고, 공통 응답 래퍼 없이 배열을 그대로 돌려줘요.
export function getMemberRatings(memberId: number) {
  return authApi.get(`members/${memberId}/ratings`).json<Rating[]>();
}

export async function createRating(body: RatingBody & { movieId: number }) {
  const response = await authApi
    .post("ratings", { json: body })
    .json<ApiResponse<Rating>>();
  return response.result;
}

export async function updateRating(
  ratingId: number,
  body: RatingBody,
): Promise<Rating> {
  const response = await authApi
    .patch(`ratings/${ratingId}`, { json: body })
    .json<ApiResponse<Rating>>();
  return response.result;
}

export async function deleteRating(ratingId: number) {
  await authApi.delete(`ratings/${ratingId}`).json<ApiResponse<null>>();
}

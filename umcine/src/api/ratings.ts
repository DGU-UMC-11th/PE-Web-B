import { apiClient, type ApiResponse } from "./api-client";
import { authApi } from "./auth-api";

export interface Rating {
  ratingId: number;
  movieId: number;
  score: number; // 1~5 정수
  comment: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface RatingInput {
  score: number;
  comment?: string; // 500자 이하
}

// GET /members/{memberId}/ratings: 공개 API라 apiClient 사용
// 주의: 다른 API와 달리 { result } 없이 배열을 그대로 반환함
export function getMemberRatings(memberId: number, page = 0, size = 100) {
  return apiClient
    .get(`members/${memberId}/ratings`, { searchParams: { page, size } })
    .json<Rating[]>();
}

// POST /ratings
export function createRating(body: RatingInput & { movieId: number }) {
  return authApi.post("ratings", { json: body }).json<ApiResponse<Rating>>();
}

// PATCH /ratings/{ratingId}
export function updateRating({ ratingId, ...body }: RatingInput & { ratingId: number }) {
  return authApi.patch(`ratings/${ratingId}`, { json: body }).json<ApiResponse<Rating>>();
}

// DELETE /ratings/{ratingId}
export function deleteRating(ratingId: number) {
  return authApi.delete(`ratings/${ratingId}`).json<ApiResponse<null>>();
}

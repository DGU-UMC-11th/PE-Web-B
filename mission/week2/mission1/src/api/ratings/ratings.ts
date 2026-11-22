import { apiClient } from "../api-client";
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

export interface CreateRatingRequest {
  movieId: number;
  score: number;
  comment?: string;
}

export interface UpdateRatingRequest {
  ratingId: number;
  score: number;
  /** 빼고 보내면 기존 후기가 null로 덮여요 (전체 교체) */
  comment?: string;
}

/** GET /members/{memberId}/ratings: 인증 없이 조회, 공통 형식으로 감싸지 않은 배열 */
export function getMemberRatings(memberId: number) {
  return apiClient.get(`members/${memberId}/ratings`).json<Rating[]>();
}

/** POST /ratings */
export function createRating(body: CreateRatingRequest) {
  return authApi.post("ratings", { json: body }).json<ApiResponse<Rating>>();
}

/** PATCH /ratings/{ratingId} */
export function updateRating({ ratingId, ...body }: UpdateRatingRequest) {
  return authApi.patch(`ratings/${ratingId}`, { json: body }).json<ApiResponse<Rating>>();
}

/** DELETE /ratings/{ratingId} */
export function deleteRating(ratingId: number) {
  return authApi.delete(`ratings/${ratingId}`).json<ApiResponse<null>>();
}

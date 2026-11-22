import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../api/query-keys";
import {
  createRating,
  deleteRating,
  getMemberRatings,
  updateRating,
  type Rating,
} from "../api/ratings/ratings";
import { useAuthStore } from "../stores/auth-store";
import { getMemberIdFromToken } from "../utils/auth/token";

/** 토큰에서 읽은 내 memberId. 로그인 전이면 null */
export function useMemberId() {
  return useAuthStore((state) => getMemberIdFromToken(state.accessToken));
}

/** 내 평점 목록에서 이 영화의 평점만 골라요. 평점이 없으면 data가 null */
export function useMyMovieRatingQuery(movieId: number) {
  const memberId = useMemberId();

  return useQuery({
    queryKey: queryKeys.ratings.member(memberId ?? 0),
    queryFn: () => getMemberRatings(memberId ?? 0),
    enabled: memberId !== null,
    select: (ratings) => ratings.find((rating) => rating.movieId === movieId) ?? null,
  });
}

/** 등록·수정·삭제 응답으로 내 평점 목록 캐시를 직접 갱신해요. */
function useRatingsCache() {
  const queryClient = useQueryClient();
  const memberId = useMemberId();

  return {
    update: (updater: (ratings: Rating[]) => Rating[]) => {
      if (memberId === null) return;
      queryClient.setQueryData<Rating[]>(queryKeys.ratings.member(memberId), (prev) =>
        prev ? updater(prev) : prev,
      );
    },
    invalidate: () => queryClient.invalidateQueries({ queryKey: queryKeys.ratings.all }),
  };
}

export function useCreateRatingMutation() {
  const cache = useRatingsCache();

  return useMutation({
    mutationFn: createRating,
    onSuccess: (response) => {
      // 목록은 ratingId 내림차순이라 새 평점을 맨 앞에 넣어요.
      cache.update((ratings) => [response.result, ...ratings]);
      alert("평점을 등록했어요.");
    },
    onError: () => {
      // 이미 평점이 있는 경우(409) 등 화면과 서버가 어긋났을 수 있어 다시 조회해요.
      cache.invalidate();
      alert("평점을 등록하지 못했어요. 다시 시도해 주세요.");
    },
  });
}

export function useUpdateRatingMutation() {
  const cache = useRatingsCache();

  return useMutation({
    mutationFn: updateRating,
    onSuccess: (response) => {
      cache.update((ratings) =>
        ratings.map((rating) =>
          rating.ratingId === response.result.ratingId ? response.result : rating,
        ),
      );
      alert("평점을 수정했어요.");
    },
    onError: () => {
      cache.invalidate();
      alert("평점을 수정하지 못했어요. 다시 시도해 주세요.");
    },
  });
}

export function useDeleteRatingMutation() {
  const cache = useRatingsCache();

  return useMutation({
    mutationFn: deleteRating,
    onSuccess: (_response, ratingId) => {
      cache.update((ratings) => ratings.filter((rating) => rating.ratingId !== ratingId));
      alert("평점을 삭제했어요.");
    },
    onError: () => {
      cache.invalidate();
      alert("평점을 삭제하지 못했어요. 다시 시도해 주세요.");
    },
  });
}

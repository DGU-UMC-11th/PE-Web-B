import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRating, deleteRating, updateRating } from "../api/ratings";

// 평점 목록은 페이지 단위라 응답 하나로 캐시를 맞추기 어려움 → 세 mutation 모두 다시 조회
function useInvalidateRatings() {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: ["ratings"] });
}

export function useCreateRatingMutation() {
  const invalidate = useInvalidateRatings();
  return useMutation({
    mutationFn: createRating,
    onSuccess: invalidate,
    onError: () => alert("평점 등록에 실패했어요. 다시 시도해 주세요."),
  });
}

export function useUpdateRatingMutation() {
  const invalidate = useInvalidateRatings();
  return useMutation({
    mutationFn: updateRating,
    onSuccess: invalidate,
    onError: () => alert("평점 수정에 실패했어요. 다시 시도해 주세요."),
  });
}

export function useDeleteRatingMutation() {
  const invalidate = useInvalidateRatings();
  return useMutation({
    mutationFn: deleteRating,
    onSuccess: invalidate,
    onError: () => alert("평점 삭제에 실패했어요. 다시 시도해 주세요."),
  });
}

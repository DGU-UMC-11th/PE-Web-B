import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addFavorite, deleteFavorite } from "../api/favorites";

interface ToggleFavoriteVariables {
  movieId: number;
  isFavorite: boolean; // 누르기 전 상태
}

export function useToggleFavoriteMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ movieId, isFavorite }: ToggleFavoriteVariables) =>
      isFavorite ? deleteFavorite(movieId) : addFavorite(movieId),
    onSuccess: (_response, { movieId, isFavorite }) => {
      // 상태: 결과를 정확히 아니까 캐시를 직접 바꿈 → 추가 요청 없음
      queryClient.setQueryData(["favorites", movieId], { isFavorite: !isFavorite });
      // 목록: POST 응답은 항목 1개뿐이라 다시 조회
      // exact가 없으면 ["favorites", movieId]까지 무효화돼서 위 setQueryData가 의미 없어짐
      queryClient.invalidateQueries({ queryKey: ["favorites"], exact: true });
    },
    onError: () => {
      alert("즐겨찾기 변경에 실패했어요. 다시 시도해 주세요.");
    },
  });
}

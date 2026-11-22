import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addFavorite,
  getFavorites,
  getFavoriteStatus,
  removeFavorite,
  type Favorite,
} from "../api/favorites/favorites";
import type { ApiResponse } from "../api/api-response";
import { queryKeys } from "../api/query-keys";
import { useAuthStore } from "../stores/auth-store";

/** 마이페이지 목록과 영화 카드의 즐겨찾기 표시에 사용해요. */
export function useFavoritesQuery() {
  const accessToken = useAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: queryKeys.favorites.list,
    queryFn: getFavorites,
    enabled: Boolean(accessToken),
    retry: false,
  });
}

/** 영화 상세에서 이 영화 하나의 즐겨찾기 여부만 확인해요. */
export function useFavoriteStatusQuery(movieId: number, enabled = true) {
  const accessToken = useAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: queryKeys.favorites.status(movieId),
    queryFn: () => getFavoriteStatus(movieId),
    enabled: enabled && Boolean(accessToken),
    retry: false,
  });
}

interface ToggleFavoriteVariables {
  movieId: number;
  /** 요청 전 상태. true면 해제, false면 등록 */
  isFavorite: boolean;
}

export function useToggleFavoriteMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    // 등록 응답의 result는 Favorite, 해제 응답의 result는 null
    mutationFn: ({ movieId, isFavorite }: ToggleFavoriteVariables): Promise<
      ApiResponse<Favorite | null>
    > => (isFavorite ? removeFavorite(movieId) : addFavorite(movieId)),
    onSuccess: (response, { movieId, isFavorite }) => {
      // 응답으로 결과를 알 수 있으므로 여부와 목록 캐시를 직접 바꿔요. (목록 캐시가 없으면 그대로 둬요)
      queryClient.setQueryData<boolean>(queryKeys.favorites.status(movieId), !isFavorite);
      queryClient.setQueryData<Favorite[]>(queryKeys.favorites.list, (prev) => {
        if (!prev) return prev;
        if (isFavorite) return prev.filter((favorite) => favorite.movieId !== movieId);
        return response.result ? [response.result, ...prev] : prev;
      });
    },
    onError: () => {
      // 이미 등록(409)·해제(404)된 경우처럼 화면과 서버가 어긋났을 수 있어 다시 조회해요.
      queryClient.invalidateQueries({ queryKey: queryKeys.favorites.all });
      alert("즐겨찾기를 변경하지 못했어요. 다시 시도해 주세요.");
    },
  });
}

import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  addFavorite,
  getFavoriteStatus,
  getFavorites,
  removeFavorite,
} from "../api/favorites/favorites";
import { useAuthStore } from "../stores/auth-store";

export const favoriteQueries = {
  all: ["favorites"] as const,
  list: () =>
    queryOptions({
      queryKey: ["favorites", "list"],
      queryFn: getFavorites,
    }),
  status: (movieId: number) =>
    queryOptions({
      queryKey: ["favorites", "status", movieId],
      queryFn: () => getFavoriteStatus(movieId),
    }),
};

// 내 즐겨찾기 목록 (로그인했을 때만 조회)
export function useFavoritesQuery(enabled = true) {
  const accessToken = useAuthStore((state) => state.accessToken);
  return useQuery({
    ...favoriteQueries.list(),
    enabled: enabled && Boolean(accessToken),
    staleTime: 60 * 1000,
    retry: false,
  });
}

// 특정 영화의 즐겨찾기 여부 (영화 상세에서 사용)
export function useFavoriteStatusQuery(movieId: number, enabled = true) {
  const accessToken = useAuthStore((state) => state.accessToken);
  return useQuery({
    ...favoriteQueries.status(movieId),
    enabled: enabled && Boolean(accessToken),
    retry: false,
  });
}

// 즐겨찾기 등록/해제. 성공하면 favorites 하위 캐시를 모두 무효화해서
// 마이페이지 목록과 상세 버튼이 같은 서버 상태를 보게 해요.
export function useToggleFavoriteMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      movieId,
      isFavorite,
    }: {
      movieId: number;
      isFavorite: boolean;
    }) => {
      if (isFavorite) await removeFavorite(movieId);
      else await addFavorite(movieId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: favoriteQueries.all });
    },
    onError: () => {
      alert("즐겨찾기 변경에 실패했어요. 다시 시도해 주세요.");
    },
  });
}

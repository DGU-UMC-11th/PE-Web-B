import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addFavorite, deleteFavorite, getFavorite, getFavorites } from "../api/favorites";
import { useAuthStore } from "../stores/auth-store";

export function useFavoritesQuery(enabled = true) {
  const token = useAuthStore((state) => state.accessToken);
  return useQuery({ queryKey: ["favorites", "list"], queryFn: getFavorites, enabled: enabled && Boolean(token), retry: false });
}

export function useFavorite(movieId: number, detail: boolean) {
  const token = useAuthStore((state) => state.accessToken);
  const client = useQueryClient();
  const listQuery = useFavoritesQuery(!detail);
  const detailQuery = useQuery({ queryKey: ["favorites", "detail", movieId],
    queryFn: () => getFavorite(movieId), enabled: detail && Boolean(token), retry: false });
  const query = detail ? detailQuery : listQuery;
  const isFavorite = detail
    ? detailQuery.data?.isFavorite
    : listQuery.data?.some((favorite) => favorite.movieId === movieId);
  const mutation = useMutation({
    mutationKey: ["favorites", movieId],
    mutationFn: async (isFavorite: boolean) => {
      if (isFavorite) await deleteFavorite(movieId);
      else await addFavorite(movieId);
    },
    onSuccess: async () => { await client.invalidateQueries({ queryKey: ["favorites"] }); },
    onError: () => alert("즐겨찾기 변경에 실패했어요. 다시 시도해 주세요."),
  });
  return { query, mutation, token, isFavorite };
}

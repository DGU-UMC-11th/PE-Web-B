import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getApiErrorMessage, getApiErrorStatus } from "../api/api-response.ts";
import { addFavorite } from "../api/favorites/add-favorite.ts";
import { getFavoriteStatus } from "../api/favorites/get-favorite-status.ts";
import { getFavorites } from "../api/favorites/get-favorites.ts";
import type { Favorite, FavoriteStatus } from "../api/favorites/models.ts";
import { removeFavorite } from "../api/favorites/remove-favorite.ts";
import { useAuthStore } from "../stores/auth-store.ts";
import { queryKeys } from "./query-keys.ts";

function useIsLoggedIn() {
    return useAuthStore((state) => Boolean(state.accessToken));
}

// 마이페이지, 영화 카드의 북마크 표시에 쓰는 내 즐겨찾기 목록
export function useFavoritesQuery() {
    const isLoggedIn = useIsLoggedIn();

    return useQuery({
        queryKey: queryKeys.favorites,
        queryFn: getFavorites,
        enabled: isLoggedIn,
    });
}

// 영화 상세에서 쓰는 "이 영화를 즐겨찾기했는지"
export function useFavoriteStatusQuery(movieId: number) {
    const isLoggedIn = useIsLoggedIn();

    return useQuery({
        queryKey: queryKeys.favoriteStatus(movieId),
        queryFn: () => getFavoriteStatus(movieId),
        enabled: isLoggedIn && movieId > 0,
    });
}

interface ToggleFavoriteVariables {
    movieId: number;
    // 누르기 전 상태. true면 해제(DELETE), false면 추가(POST)해요.
    isFavorite: boolean;
}

// 즐겨찾기 추가와 해제를 하나의 버튼으로 다뤄요.
// 성공하면 다시 조회하지 않고 상세의 즐겨찾기 여부와 마이페이지 목록 캐시를 함께 바꿔요.
export function useToggleFavoriteMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ movieId, isFavorite }: ToggleFavoriteVariables) => {
            if (isFavorite) {
                await removeFavorite(movieId);
                return null;
            }
            return addFavorite(movieId);
        },
        onSuccess: (added, { movieId, isFavorite }) => {
            queryClient.setQueryData<FavoriteStatus>(queryKeys.favoriteStatus(movieId), {
                isFavorite: !isFavorite,
            });
            // 목록을 아직 불러온 적이 없으면(prev가 undefined) 그대로 두고, 나중에 처음 조회할 때 받아와요.
            queryClient.setQueryData<Favorite[]>(queryKeys.favorites, (prev) => {
                if (!prev) return prev;
                const others = prev.filter((favorite) => favorite.movieId !== movieId);
                return added ? [added, ...others] : others;
            });
        },
        onError: (error, { movieId }) => {
            // 409(이미 추가됨), 404(이미 해제됨)는 화면과 서버 상태가 어긋났다는 뜻이라 서버 값으로 다시 맞춰요.
            const status = getApiErrorStatus(error);
            if (status === 409 || status === 404) {
                queryClient.invalidateQueries({ queryKey: queryKeys.favoriteStatus(movieId) });
                queryClient.invalidateQueries({ queryKey: queryKeys.favorites });
            }
            alert(getApiErrorMessage(error, "즐겨찾기를 변경하지 못했어요. 다시 시도해 주세요."));
        },
    });
}

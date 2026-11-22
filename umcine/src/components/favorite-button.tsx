import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { getFavoriteStatus } from "../api/favorites";
import { useToggleFavoriteMutation } from "../hooks/use-toggle-favorite-mutation";
import { useAuthStore } from "../stores/auth-store";

interface FavoriteButtonProps {
  movieId: number;
}

// 영화 상세 페이지용 서버 즐겨찾기 버튼
export function FavoriteButton({ movieId }: FavoriteButtonProps) {
  const accessToken = useAuthStore((state) => state.accessToken);
  const navigate = useNavigate();
  const statusQuery = useQuery({
    queryKey: ["favorites", movieId],
    queryFn: () => getFavoriteStatus(movieId),
    enabled: Boolean(accessToken),
    retry: false,
  });
  const toggleMutation = useToggleFavoriteMutation();
  const isFavorite = statusQuery.data?.isFavorite ?? false;

  const handleClick = () => {
    if (!accessToken) {
      alert("로그인이 필요해요.");
      navigate({ to: "/login" });
      return;
    }
    if (!statusQuery.data || toggleMutation.isPending) return;
    toggleMutation.mutate({ movieId, isFavorite });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={statusQuery.isLoading || toggleMutation.isPending}
      aria-pressed={isFavorite}
      className="mt-4 flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-sm font-bold text-white disabled:bg-brand/40"
    >
      <img
        src={isFavorite ? "/icons/bookmark.svg" : "/icons/bookmark-outline.svg"}
        alt=""
        className="size-4 invert"
      />
      {isFavorite ? "즐겨찾기 해제" : "즐겨찾기"}
    </button>
  );
}

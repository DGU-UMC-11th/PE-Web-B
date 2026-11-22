import { useNavigate } from "@tanstack/react-router";
import { useFavoriteStatusQuery, useToggleFavoriteMutation } from "../../hooks/use-favorites.ts";
import { useAuthStore } from "../../stores/auth-store.ts";
import { cn } from "../../utils/cn.ts";

interface FavoriteToggleButtonProps {
  movieId: number;
}

// 영화 상세의 즐겨찾기 버튼이에요.
// GET /favorites/{movieId}로 현재 상태를 받고, 누르면 POST 또는 DELETE를 보내요.
export default function FavoriteToggleButton({ movieId }: FavoriteToggleButtonProps) {
  const navigate = useNavigate();
  const isLoggedIn = useAuthStore((state) => Boolean(state.accessToken));
  const statusQuery = useFavoriteStatusQuery(movieId);
  const toggleFavoriteMutation = useToggleFavoriteMutation();

  const isFavorite = statusQuery.data?.isFavorite ?? false;
  // 상태를 아직 모르면(조회 중) 눌러도 추가인지 해제인지 알 수 없어서 막아요.
  const isDisabled = isLoggedIn && (statusQuery.isPending || toggleFavoriteMutation.isPending);

  const handleClick = () => {
    if (!isLoggedIn) {
      alert("로그인하면 즐겨찾기할 수 있어요.");
      navigate({ to: "/login" });
      return;
    }
    if (isDisabled) return;
    toggleFavoriteMutation.mutate({ movieId, isFavorite });
  };

  return (
    <button
      type="button"
      className={cn(
        "mt-2 inline-flex items-center gap-2 self-start rounded-lg px-5 py-2.5 text-sm font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-60",
        isFavorite
          ? "border border-blue-600 bg-white text-blue-600 hover:bg-blue-50"
          : "bg-blue-600 text-white hover:bg-blue-700",
      )}
      onClick={handleClick}
      disabled={isDisabled}
      aria-pressed={isFavorite}
    >
      <img
        src={isFavorite ? "/movie-icons/bookmark.svg" : "/movie-icons/bookmark-outline.svg"}
        alt=""
        className={cn("size-[18px]", !isFavorite && "brightness-0 invert")}
      />
      {toggleFavoriteMutation.isPending ? "처리 중" : isFavorite ? "즐겨찾기 해제" : "즐겨찾기"}
    </button>
  );
}

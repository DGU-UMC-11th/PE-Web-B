import { useNavigate } from "@tanstack/react-router";
import {
  useFavoriteStatusQuery,
  useFavoritesQuery,
  useToggleFavoriteMutation,
} from "../hooks/use-favorites";
import { useAuthStore } from "../stores/auth-store";
import { cn } from "../utils/cn";

interface BookmarkButtonProps {
  movieId: number;
  // list: 내 즐겨찾기 목록(GET /favorites)에서 확인 — 카드가 많은 목록 화면용
  // status: 이 영화의 여부(GET /favorites/{movieId})를 따로 조회 — 영화 상세용
  source?: "list" | "status";
}

function useIsFavorite(movieId: number, source: "list" | "status") {
  // 훅은 항상 호출하되, 쓰는 쪽 query만 enabled로 켜서 불필요한 요청을 막아요.
  // (목록 화면의 카드마다 GET /favorites/{movieId}가 나가지 않도록)
  const listQuery = useFavoritesQuery(source === "list");
  const statusQuery = useFavoriteStatusQuery(movieId, source === "status");

  if (source === "status") return statusQuery.data?.isFavorite ?? false;
  return listQuery.data?.some((favorite) => favorite.movieId === movieId) ?? false;
}

export function BookmarkButton({
  movieId,
  source = "list",
}: BookmarkButtonProps) {
  const navigate = useNavigate();
  const accessToken = useAuthStore((state) => state.accessToken);
  const isBookmarked = useIsFavorite(movieId, source);
  const toggleMutation = useToggleFavoriteMutation();

  const handleClick = () => {
    if (!accessToken) {
      navigate({ to: "/login" });
      return;
    }
    if (toggleMutation.isPending) return;
    toggleMutation.mutate({ movieId, isFavorite: isBookmarked });
  };

  return (
    <button
      type="button"
      disabled={toggleMutation.isPending}
      className={cn(
        "absolute top-2.5 right-2.5 flex h-[34px] w-[34px] items-center justify-center border rounded-lg",
        isBookmarked
          ? "border-blue-600 bg-blue-600"
          : "border-white bg-[#17191e]",
      )}
      onClick={handleClick}
    >
      <img
        className="brightness-0 invert"
        src={
          isBookmarked ? "/icons/bookmark.svg" : "/icons/bookmark-outline.svg"
        }
        alt={isBookmarked ? "북마크 켜짐" : "북마크 꺼짐"}
      />
    </button>
  );
}

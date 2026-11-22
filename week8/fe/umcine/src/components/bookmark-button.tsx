import { useFavorite } from "../hooks/use-favorites";
import { useNavigate } from "@tanstack/react-router";
import { cn } from "../utils/cn";

interface BookmarkButtonProps {
  movieId: number;
  detail?: boolean;
  variant?: "text" | "icon";
  className?: string;
}

export function BookmarkButton({ movieId, detail = false, variant = "text", className }: BookmarkButtonProps) {
  const { query, mutation, token, isFavorite } = useFavorite(movieId, detail);
  const navigate = useNavigate();
  const isBookmarked = Boolean(token && isFavorite);
  const handleClick = () => {
    if (!token) { void navigate({ to: "/login" }); return; }
    if (query.isError) { void query.refetch(); return; }
    if (!query.isSuccess || mutation.isPending) return;
    mutation.mutate(isBookmarked);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={Boolean(token) && (query.isLoading || mutation.isPending)}
      title={query.isError ? "즐겨찾기 조회 실패: 클릭하여 다시 시도" : undefined}
      aria-label={isBookmarked ? "북마크 해제" : "북마크 추가"}
      aria-pressed={isBookmarked}
      className={cn(
        variant === "icon" && "grid h-[34px] w-[34px] place-items-center rounded-[7px] border p-1",
        variant === "icon" && (isBookmarked
          ? "border-[#2563eb] bg-[#2563eb]"
          : "border-white bg-[rgb(25_27_31_/_85%)]"),
        className,
      )}
    >
      {variant === "icon" ? (
        <img
          className="h-6 w-6 invert"
          src={isBookmarked ? "/icons/bookmark.svg" : "/icons/bookmark-outline.svg"}
          alt=""
        />
      ) : (isBookmarked ? "북마크 해제" : "북마크 추가")}
    </button>
  );
}

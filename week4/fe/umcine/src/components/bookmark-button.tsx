import { useBookmarkStore } from "../stores/bookmark-store";
import { cn } from "../utils/cn";

interface BookmarkButtonProps {
  movieId: number;
  variant?: "text" | "icon";
  className?: string;
}

export function BookmarkButton({ movieId, variant = "text", className }: BookmarkButtonProps) {
  const isBookmarked = useBookmarkStore((state) =>
    state.bookmarkedMovieIds.includes(movieId),
  );
  const toggleBookmark = useBookmarkStore((state) => state.toggleBookmark);

  return (
    <button
      type="button"
      onClick={() => toggleBookmark(movieId)}
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

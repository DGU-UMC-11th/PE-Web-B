import { useBookmarkStore } from "../stores/bookmark-store";
import { cn } from "../utils/cn";

interface BookmarkButtonProps {
  movieId: number;
  title: string;
  variant?: "icon" | "text";
  className?: string;
}

export function BookmarkButton({ movieId, title, variant = "text", className }: BookmarkButtonProps) {
  const isBookmarked = useBookmarkStore((state) => state.bookmarkedMovieIds.includes(movieId));
  const toggleBookmark = useBookmarkStore((state) => state.toggleBookmark);
  const iconOnly = variant === "icon";

  return (
    <button
      type="button"
      aria-label={`${title} 북마크 ${isBookmarked ? "해제" : "추가"}`}
      aria-pressed={isBookmarked}
      onClick={() => toggleBookmark(movieId)}
      className={cn(
        iconOnly
          ? "grid size-[34px] place-items-center rounded-[7px] border p-1"
          : "inline-flex h-9 items-center gap-1.5 rounded-md px-3 text-xs font-semibold text-white",
        iconOnly
          ? isBookmarked ? "border-blue-600 bg-blue-600" : "border-white bg-[#191b1f]/85"
          : isBookmarked ? "bg-blue-800" : "bg-blue-600 hover:bg-blue-700",
        className,
      )}
    >
      <img
        className={cn("invert", iconOnly ? "size-6" : "size-4")}
        src={isBookmarked ? "/icons/bookmark.svg" : "/icons/bookmark-outline.svg"}
        alt=""
      />
      {!iconOnly && (isBookmarked ? "북마크 해제" : "북마크 추가")}
    </button>
  );
}

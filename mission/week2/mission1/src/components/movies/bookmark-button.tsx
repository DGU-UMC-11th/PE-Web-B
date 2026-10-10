import { useBookmarkStore } from "../../stores/bookmark-store";
import { cn } from "../../utils/cn";

interface BookmarkButtonProps {
  movieId: number;
  movieTitle: string;
  // icon: 포스터 위에 겹치는 아이콘 버튼, labeled: 상세 화면의 문구 버튼
  variant?: "icon" | "labeled";
  className?: string;
}

export function BookmarkButton({
  movieId,
  movieTitle,
  variant = "icon",
  className,
}: BookmarkButtonProps) {
  const isBookmarked = useBookmarkStore((state) =>
    state.bookmarkedMovieIds.includes(movieId),
  );
  const toggleBookmark = useBookmarkStore((state) => state.toggleBookmark);

  if (variant === "labeled") {
    return (
      <button
        type="button"
        className={cn(
          "flex h-[42px] items-center gap-2 rounded-lg px-4 text-sm font-extrabold text-white",
          isBookmarked
            ? "bg-primary hover:bg-primary-hover"
            : "bg-ink hover:bg-ink-secondary",
          className,
        )}
        aria-pressed={isBookmarked}
        onClick={() => toggleBookmark(movieId)}
      >
        <img src="/icons/bookmark-small.svg" alt="" width={16} height={16} />
        {isBookmarked ? "즐겨찾기 해제" : "즐겨찾기 추가"}
      </button>
    );
  }

  return (
    <button
      type="button"
      className={cn(
        "flex size-[34px] items-center justify-center rounded-lg border",
        isBookmarked ? "border-primary bg-primary" : "border-white bg-ink",
        className,
      )}
      aria-pressed={isBookmarked}
      aria-label={
        isBookmarked ? `${movieTitle} 북마크 해제` : `${movieTitle} 북마크 추가`
      }
      onClick={() => toggleBookmark(movieId)}
    >
      <img
        src={isBookmarked ? "/icons/bookmark.svg" : "/icons/bookmark-outline.svg"}
        alt=""
        width={24}
        height={24}
      />
    </button>
  );
}

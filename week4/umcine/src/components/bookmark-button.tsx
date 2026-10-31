import { useBookmarkStore } from "../stores/bookmark-store";
import { cn } from "../utils/cn";

interface BookmarkButtonProps {
  movieId: number;
}

export function BookmarkButton({ movieId }: BookmarkButtonProps) {
  const isBookmarked = useBookmarkStore((state) =>
    state.bookmarkedMovieIds.includes(movieId),
  );
  const toggleBookmark = useBookmarkStore((state) => state.toggleBookmark);

  return (
    <button
      type="button"
      className={cn(
        "absolute top-2.5 right-2.5 flex h-[34px] w-[34px] items-center justify-center border rounded-lg",
        isBookmarked
          ? "border-blue-600 bg-blue-600"
          : "border-white bg-[#17191e]",
      )}
      onClick={() => toggleBookmark(movieId)}
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

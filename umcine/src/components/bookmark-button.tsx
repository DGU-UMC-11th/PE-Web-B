//bookmark-button.tsx

import { useBookmarkStore } from "../stores/bookmark-store";
import { cn } from "../utils/cn";

interface BookmarkButtonProps {
  movieId: number;
}

export function BookmarkButton({ movieId }: BookmarkButtonProps) {
    const isBookmarked = useBookmarkStore((state) =>
        state.bookmarkedMovieIds.includes(movieId), 
    );
    //큰 state 안에 값 접근
    const toggleBookmark = useBookmarkStore(
        (state) => state.toggleBookmark,
    );

    return (<button
        type="button"
        onClick={() => toggleBookmark(movieId)}
        aria-pressed={isBookmarked}
        aria-label={isBookmarked ? "북마크 해제" : "북마크하기"}
        className={cn(
            "absolute right-2 top-2 rounded-md border p-1",
            isBookmarked ? "border-brand bg-brand" : "border-white bg-black/60",
        )}>
        <img src={isBookmarked ? "/icons/bookmark.svg" : "/icons/bookmark-outline.svg"} alt="" className="size-5 invert" />
    </button>);

//   return (
//     <button type="button" onClick={() => toggleBookmark(movieId)}>
//       {isBookmarked ? "북마크 해제" : "북마크 추가"}
//     </button>
//   );
}
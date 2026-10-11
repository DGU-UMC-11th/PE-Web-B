import type { Movie } from "../../types/movie";
import { cn } from "../../utils/cn";

interface MovieCardProps {
  movie: Movie;
  onToggleBookmark: (id: number) => void;
  onSelectMovie?: (id: number) => void;
}

export default function MovieCard({
  movie,
  onToggleBookmark,
  onSelectMovie,
}: MovieCardProps) {
  const handleBookmarkClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onToggleBookmark(movie.id);
  };

  const handleCardClick = () => {
    if (onSelectMovie) {
      onSelectMovie(movie.id);
    }
  };

  return (
    <article className="flex cursor-pointer flex-col" onClick={handleCardClick}>
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-xl bg-gray-200 shadow-md">
        <img
          src={movie.posterPath}
          alt={movie.title}
          className="block size-full object-cover"
          loading="lazy"
        />
        <button
          type="button"
          className={cn(
            "absolute right-2.5 top-2.5 z-10 flex size-[34px] cursor-pointer items-center justify-center rounded-lg bg-gray-900/60 backdrop-blur-sm transition hover:scale-[1.08]",
            movie.isBookmarked && "bg-blue-600 hover:bg-blue-700",
          )}
          onClick={handleBookmarkClick}
          aria-label={movie.isBookmarked ? "북마크 해제" : "북마크 추가"}
        >
          <img
            src={
              movie.isBookmarked
                ? "/movie-icons/bookmark.svg"
                : "/movie-icons/bookmark-outline.svg"
            }
            alt=""
            className="size-5 brightness-0 invert"
          />
        </button>
      </div>

      <div className="mt-2.5 flex flex-col gap-1">
        <h3 className="truncate text-sm font-bold leading-[1.3] text-gray-900 sm:text-[15px]" title={movie.title}>
          {movie.title}
        </h3>
        <p className="text-xs font-normal text-gray-500 sm:text-[13px]">{movie.releaseDate}</p>
      </div>
    </article>
  );
}

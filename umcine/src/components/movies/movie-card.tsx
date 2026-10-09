import { Link } from "@tanstack/react-router";
import type { Movie } from "../../types/movie";
import { cn } from "../../utils/cn";

interface MovieCardProps {
  movie: Movie;
  onToggleBookmark: (movieId: number) => void;
}

export function MovieCard({ movie, onToggleBookmark }: MovieCardProps) {
  return (
    <article className="min-w-0">
      <div className="relative aspect-[0.88] w-full overflow-hidden rounded-[10px]">
        <Link to="/movies/$movieId" params={{ movieId: String(movie.id) }}>
          <img
            className="block size-full object-cover transition-transform duration-300 hover:scale-105"
            src={movie.posterPath}
            alt={movie.title}
          />
        </Link>

        <button
          type="button"
          className={cn(
            "absolute top-2.5 right-2.5 grid size-[34px] place-items-center rounded-[7px] border p-1",
            movie.isBookmarked
              ? "border-blue-600 bg-blue-600"
              : "border-white bg-[#191b1f]/85",
          )}
          onClick={() => onToggleBookmark(movie.id)}
          aria-label={`${movie.title} 북마크`}
          aria-pressed={movie.isBookmarked}
        >
          <img
            className="size-6 invert"
            src={movie.isBookmarked ? "/icons/bookmark.svg" : "/icons/bookmark-outline.svg"}
            alt=""
          />
        </button>
      </div>

      <h2 className="mt-2 mb-0.5 truncate text-[13px] leading-5 font-semibold tracking-[-0.3px] sm:text-sm">
        <Link
          to="/movies/$movieId"
          params={{ movieId: String(movie.id) }}
          className="text-inherit no-underline hover:underline"
        >
          {movie.title}
        </Link>
      </h2>
      <p className="m-0 text-xs leading-[18px] text-gray-400">{movie.releaseDate}</p>
    </article>
  );
}

import { Link } from "@tanstack/react-router";
import type { Movie } from "../../types/movie";
import { cn } from "../../utils/cn";

interface MovieCardProps {
  movie: Movie;
  onToggleBookmark: (movieId: number) => void;
}

function MovieCard({
  movie,
  onToggleBookmark,
}: MovieCardProps) {
  return (
    <article className="min-w-0">
      <div className="relative aspect-[0.88] w-full overflow-hidden rounded-[10px]">
        <Link
          className="block h-full w-full"
          to="/movies/$movieId"
          params={{ movieId: String(movie.id) }}
        >
          <img
            className="block h-full w-full object-cover"
            src={movie.posterPath}
            alt={movie.title}
          />
        </Link>

        <button
          className={cn(
            "absolute right-[10px] top-[10px] grid h-[34px] w-[34px] place-items-center rounded-[7px] border p-1",
            movie.isBookmarked
              ? "border-[#2563eb] bg-[#2563eb]"
              : "border-white bg-[rgb(25_27_31_/_85%)]",
          )}
          onClick={() => onToggleBookmark(movie.id)}
          type="button"
          aria-label={`${movie.title} 북마크`}
          aria-pressed={movie.isBookmarked}
        >
          <img
            className="h-6 w-6 invert"
            src={
              movie.isBookmarked
                ? "/icons/bookmark.svg"
                : "/icons/bookmark-outline.svg"
            }
            alt=""
          />
        </button>
      </div>

      <h2 className="mb-[2px] mt-2 overflow-hidden text-ellipsis whitespace-nowrap text-[14px] font-semibold leading-5 tracking-[-0.3px] max-[540px]:text-[13px]">
        <Link to="/movies/$movieId" params={{ movieId: String(movie.id) }}>{movie.title}</Link>
      </h2>

      <p className="m-0 text-[12px] leading-[18px] text-[#9ca3af]">
        {movie.releaseDate}
      </p>
    </article>
  );
}

export default MovieCard;

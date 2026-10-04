import { Link } from "@tanstack/react-router";
import type { Movie } from "../../types/movie";
import { cn } from "../../utils/cn";

interface MovieCardProps {
  movie: Movie;
  onToggleBookmark: (movieId: number) => void;
}

export function MovieCard({ movie, onToggleBookmark }: MovieCardProps) {
  const detailLink = {
    to: "/movies/$movieId",
    params: { movieId: String(movie.id) },
  } as const;

  return (
    <article className="flex flex-col gap-1">
      <div className="relative h-[274px] overflow-hidden rounded-[10px] bg-page">
        <Link {...detailLink} className="block size-full">
          <img
            className="size-full object-cover"
            src={movie.posterPath}
            alt={`${movie.title} 포스터`}
          />
        </Link>

        <button
          type="button"
          className={cn(
            "absolute top-2.5 right-2.5 flex size-[34px] items-center justify-center rounded-lg border",
            movie.isBookmarked
              ? "border-primary bg-primary"
              : "border-white bg-ink",
          )}
          aria-pressed={movie.isBookmarked}
          aria-label={
            movie.isBookmarked
              ? `${movie.title} 북마크 해제`
              : `${movie.title} 북마크 추가`
          }
          onClick={() => onToggleBookmark(movie.id)}
        >
          {/* 북마크 여부 */}
          <img
            src={
              movie.isBookmarked
                ? "/icons/bookmark.svg"
                : "/icons/bookmark-outline.svg"
            }
            alt=""
            width={24}
            height={24}
          />
        </button>
      </div>

      <h2 className="pt-[5px] text-sm font-extrabold">
        <Link {...detailLink}>{movie.title}</Link>
      </h2>
      <p className="text-xs text-ink-tertiary">{movie.releaseDate}</p>
    </article>
  );
}

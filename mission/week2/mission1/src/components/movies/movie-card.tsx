import { Link } from "@tanstack/react-router";
import type { Movie } from "../../types/movie";
import { BookmarkButton } from "./bookmark-button";

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
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

        <BookmarkButton
          movieId={movie.id}
          movieTitle={movie.title}
          className="absolute top-2.5 right-2.5"
        />
      </div>

      <h2 className="pt-[5px] text-sm font-extrabold">
        <Link {...detailLink}>{movie.title}</Link>
      </h2>
      <p className="text-xs text-ink-tertiary">{movie.releaseDate}</p>
    </article>
  );
}

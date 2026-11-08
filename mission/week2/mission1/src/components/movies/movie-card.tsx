import { Link } from "@tanstack/react-router";
import type { TmdbMovieListItem } from "../../api/movies/models";
import { formatReleaseDate } from "../../utils/movies/format-movie";
import { getTmdbPosterUrl } from "../../utils/movies/tmdb-image";
import { BookmarkButton } from "./bookmark-button";
import { MovieImage } from "./movie-image";

interface MovieCardProps {
  movie: TmdbMovieListItem;
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
          <MovieImage
            className="size-full"
            src={getTmdbPosterUrl(movie.poster_path)}
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
      <p className="text-xs text-ink-tertiary">{formatReleaseDate(movie.release_date)}</p>
    </article>
  );
}

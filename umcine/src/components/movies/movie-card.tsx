import { Link } from "@tanstack/react-router";
import type { TmdbMovieListItem } from "../../api/movies/models";
import { getTmdbPosterUrl } from "../../utils/movies/tmdb-image";
import { BookmarkButton } from "../bookmark-button";
import { MoviePoster } from "./movie-poster";

interface MovieCardProps {
  movie: TmdbMovieListItem;
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <article className="min-w-0">
      <div className="relative aspect-[0.88] w-full overflow-hidden rounded-[10px]">
        <Link to="/movies/$movieId" params={{ movieId: String(movie.id) }}>
          <MoviePoster
            className="block size-full transition-transform duration-300 hover:scale-105"
            src={getTmdbPosterUrl(movie.poster_path)}
            alt={movie.title}
          />
        </Link>

        <BookmarkButton movieId={movie.id} title={movie.title} variant="icon" className="absolute top-2.5 right-2.5" />
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
      <p className="m-0 text-xs leading-[18px] text-gray-400">{movie.release_date}</p>
    </article>
  );
}

import { Link } from "@tanstack/react-router";
import type { Movie } from "../../types/movie";
import { BookmarkButton } from "../bookmark-button";

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
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
      <p className="m-0 text-xs leading-[18px] text-gray-400">{movie.releaseDate}</p>
    </article>
  );
}

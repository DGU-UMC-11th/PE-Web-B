
import { Link } from "@tanstack/react-router";
import type { TmdbMovieListItem } from "../../api/movies/models";
import { getTmdbPosterUrl } from "../../utils/movies/tmdb-image";
import { BookmarkButton } from "../bookmark-button";

interface MovieCardProps {
  movie: TmdbMovieListItem;
}

function MovieCard({ movie }: MovieCardProps) {
  const posterUrl = getTmdbPosterUrl(movie.poster_path);

  return (
    <article className="min-w-0">
      <div className="relative aspect-[0.88] w-full overflow-hidden rounded-[10px]">
        <Link
          className="block h-full w-full"
          to="/movies/$movieId"
          params={{ movieId: String(movie.id) }}
        >
          {posterUrl ? (
            <img
              className="block h-full w-full object-cover"
              src={posterUrl}
              alt={movie.title}
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gray-200 text-sm text-gray-500">
              이미지 없음
            </div>
          )}
        </Link>

        <BookmarkButton
          movieId={movie.id}
          variant="icon"
          className="absolute right-[10px] top-[10px]"
        />
      </div>

      <h2 className="mb-[2px] mt-2 overflow-hidden text-ellipsis whitespace-nowrap text-[14px] font-semibold leading-5 tracking-[-0.3px] max-[540px]:text-[13px]">
        <Link
          to="/movies/$movieId"
          params={{ movieId: String(movie.id) }}
        >
          {movie.title}
        </Link>
      </h2>

      <p className="m-0 text-[12px] leading-[18px] text-[#9ca3af]">
        {movie.release_date}
      </p>
    </article>
  );
}

export default MovieCard;

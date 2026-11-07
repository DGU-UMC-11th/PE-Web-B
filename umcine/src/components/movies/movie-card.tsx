import { Link } from "@tanstack/react-router";
import type { TmdbMovieListItem } from "../../api/movies/models";
import { getTmdbPosterUrl } from "../../utils/movies/tmdb-image";
import { BookmarkButton } from "../bookmark-button";

interface MovieCardProps {
  movie: TmdbMovieListItem;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const posterUrl = getTmdbPosterUrl(movie.poster_path);

  return (
    <article className="flex flex-col gap-[4px]">
      <div className="relative h-[274px] overflow-hidden rounded-[10px] bg-[#f6f7f9]">
        {posterUrl ? (
          <img
            className="h-full w-full object-cover"
            src={posterUrl}
            alt={movie.title}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[#e3e6eb] text-xs text-[#969da8]">
            이미지 없음
          </div>
        )}
        <BookmarkButton movieId={movie.id} />
      </div>

      <Link
        to="/movies/$movieId"
        params={{ movieId: String(movie.id) }}
        className="block truncate pt-[5px] text-sm font-extrabold"
      >
        {movie.title}
      </Link>

      <div className="text-xs text-[#969da8]">{movie.release_date}</div>
    </article>
  );
}

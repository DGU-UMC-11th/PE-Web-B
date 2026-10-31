import { Link } from "@tanstack/react-router";
import type { Movie } from "../../types/movie";
import { BookmarkButton } from "../bookmark-button";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <article className="flex flex-col gap-[4px]">
      <div className="relative h-[274px] overflow-hidden rounded-[10px] bg-[#f6f7f9]">
        <img
          className="h-full w-full object-cover"
          src={movie.posterPath}
          alt={movie.title}
        />
        <BookmarkButton movieId={movie.id} />
      </div>

      <Link
        to="/movies/$movieId"
        params={{ movieId: String(movie.id) }}
        className="block truncate pt-[5px] text-sm font-extrabold"
      >
        {movie.title}
      </Link>

      <div className="text-xs text-[#969da8]">{movie.releaseDate}</div>
    </article>
  );
}

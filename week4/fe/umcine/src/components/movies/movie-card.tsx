import { Link } from "@tanstack/react-router";
import type { Movie } from "../../types/movie";
import { BookmarkButton } from "../bookmark-button";

interface MovieCardProps {
  movie: Movie;
}

function MovieCard({
  movie,
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

        <BookmarkButton
          movieId={movie.id}
          variant="icon"
          className="absolute right-[10px] top-[10px]"
        />
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

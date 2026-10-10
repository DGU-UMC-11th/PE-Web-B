import type { Movie } from "../../types/movie";
import { MovieCard } from "./movie-card";

interface MovieGridProps {
  movies: Movie[];
}

export function MovieGrid({ movies }: MovieGridProps) {
  if (movies.length === 0) {
    return <p className="py-20 text-center text-ink-tertiary">표시할 영화가 없음</p>;
  }

  return (
    <ul className="grid grid-cols-5 gap-x-[18px] gap-y-5">
      {movies.map((movie) => (
        <li key={movie.id}>
          <MovieCard movie={movie} />
        </li>
      ))}
    </ul>
  );
}

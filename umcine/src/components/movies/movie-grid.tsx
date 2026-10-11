import type { Movie } from "../../types/movie";
import { MovieCard } from "./movie-card";

interface MovieGridProps {
  movies: Movie[];
}

export function MovieGrid({ movies }: MovieGridProps) {
  return (
    <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-5 md:grid-cols-3 md:gap-5 xl:grid-cols-5">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
        />
      ))}
    </section>
  );
}

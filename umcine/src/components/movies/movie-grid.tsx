import type { Movie } from "../../types/movie";
import MovieCard from "./movie-card";

interface MovieGridProps {
  movies: Movie[];
  onToggleBookmark: (id: number) => void;
  onSelectMovie?: (id: number) => void;
}

export default function MovieGrid({
  movies,
  onToggleBookmark,
  onSelectMovie,
}: MovieGridProps) {
  return (
    <section className="grid w-full grid-cols-2 gap-x-3 gap-y-5 sm:grid-cols-3 sm:gap-x-5 sm:gap-y-7 md:grid-cols-4 xl:grid-cols-5">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onToggleBookmark={onToggleBookmark}
          onSelectMovie={onSelectMovie}
        />
      ))}
    </section>
  );
}

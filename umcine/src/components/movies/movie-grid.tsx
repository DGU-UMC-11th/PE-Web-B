import type { TmdbMovie } from "../../api/movies/models";
import MovieCard from "./movie-card";

interface MovieGridProps {
  movies: TmdbMovie[];
  onSelectMovie?: (id: number) => void;
}

export default function MovieGrid({ movies, onSelectMovie }: MovieGridProps) {
  return (
    <section className="grid w-full grid-cols-2 gap-x-3 gap-y-5 sm:grid-cols-3 sm:gap-x-5 sm:gap-y-7 md:grid-cols-4 xl:grid-cols-5">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} onSelectMovie={onSelectMovie} />
      ))}
    </section>
  );
}

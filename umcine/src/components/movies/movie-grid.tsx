import type { TmdbMovieListItem } from "../../api/movies/models";
import { MovieCard } from "./movie-card";

interface MovieGridProps {
  movies: TmdbMovieListItem[];
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

export function MovieGridSkeleton() {
  return (
    <section
      aria-label="영화 목록을 불러오는 중이에요."
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-5 md:grid-cols-3 md:gap-5 xl:grid-cols-5"
    >
      {Array.from({ length: 10 }, (_, index) => (
        <div key={index} className="min-w-0 animate-pulse">
          <div className="aspect-[0.88] w-full rounded-[10px] bg-gray-200" />
          <div className="mt-2 h-4 w-3/4 rounded bg-gray-200" />
          <div className="mt-1 h-3 w-1/3 rounded bg-gray-200" />
        </div>
      ))}
    </section>
  );
}

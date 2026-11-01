import type { Movie } from "../../types/movie";
import MovieCard from "./movie-card";

interface MovieGridProps {
  movies: Movie[];
  onToggleBookmark: (movieId: number) => void;
}

function MovieGrid({
  movies,
  onToggleBookmark,
}: MovieGridProps) {
  return (
    <section aria-label="영화 목록" className="grid grid-cols-5 gap-5 max-[1100px]:grid-cols-3 max-[760px]:grid-cols-2 max-[760px]:gap-x-4 max-[540px]:grid-cols-1 max-[540px]:gap-6">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onToggleBookmark={onToggleBookmark}
        />
      ))}
    </section>
  );
}

export default MovieGrid;

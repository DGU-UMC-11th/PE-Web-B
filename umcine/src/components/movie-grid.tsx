import type { Movie } from "../types/movie";
import MovieCard from "./movie-card";
import styles from "./movie-grid.module.css";

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
    <section className={styles.grid}>
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

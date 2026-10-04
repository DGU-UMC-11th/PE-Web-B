import type { Movie } from "../types/movie";
import MovieCard from "./movie-card";
import "./movie-grid.css";

interface MovieGridProps {
  movies: Movie[];
  onToggleBookmark: (movieId: number) => void;
}

export default function MovieGrid({ movies, onToggleBookmark }: MovieGridProps) {
  if (movies.length === 0) {
    return <p className="movie-grid__empty">표시할 영화가 없음</p>;
  }

  return (
    <ul className="movie-grid">
      {movies.map((movie) => (
        <li key={movie.id}>
          <MovieCard movie={movie} onToggleBookmark={onToggleBookmark} />
        </li>
      ))}
    </ul>
  );
}

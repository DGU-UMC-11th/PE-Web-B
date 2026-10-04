import { useState, type ReactNode } from "react";
import { movies as initialMovies } from "../data/movies";
import { MoviesContext } from "./movies-context";

export function MoviesProvider({ children }: { children: ReactNode }) {
  const [movies, setMovies] = useState(initialMovies);

  function toggleBookmark(movieId: number) {
    setMovies((current) =>
      current.map((movie) =>
        movie.id === movieId
          ? { ...movie, isBookmarked: !movie.isBookmarked }
          : movie,
      ),
    );
  }

  return (
    <MoviesContext.Provider value={{ movies, toggleBookmark }}>
      {children}
    </MoviesContext.Provider>
  );
}

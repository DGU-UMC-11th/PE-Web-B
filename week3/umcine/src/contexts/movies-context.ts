import { createContext, useContext } from "react";
import type { Movie } from "../types/movie";

interface MoviesContextValue {
  movies: Movie[];
  toggleBookmark: (movieId: number) => void;
}

export const MoviesContext = createContext<MoviesContextValue | null>(null);

export function useMovies() {
  const context = useContext(MoviesContext);
  if (!context) {
    throw new Error("useMovies must be used within MoviesProvider");
  }
  return context;
}

import type { ReactNode } from "react";
import { movies as initialMovies } from "../data/movies";
import { useBookmarkStore } from "../stores/bookmark-store";
import { MoviesContext } from "./movies-context";

export function MoviesProvider({ children }: { children: ReactNode }) {
  const bookmarkedMovieIds = useBookmarkStore((state) => state.bookmarkedMovieIds);
  const toggleBookmark = useBookmarkStore((state) => state.toggleBookmark);

  const movies = initialMovies.map((movie) => ({
    ...movie,
    isBookmarked: bookmarkedMovieIds.includes(movie.id),
  }));

  return (
    <MoviesContext.Provider value={{ movies, toggleBookmark }}>
      {children}
    </MoviesContext.Provider>
  );
}

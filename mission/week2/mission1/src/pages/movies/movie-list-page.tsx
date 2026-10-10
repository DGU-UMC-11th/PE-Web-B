import { useState } from "react";
import { MovieGrid } from "../../components/movies/movie-grid";
import { Pagination } from "../../components/movies/pagination";
import { movies as initialMovies } from "../../data/movies";

export function MovieListPage() {
  const [movies, setMovies] = useState(initialMovies);

  function handleToggleBookmark(movieId: number) {
    setMovies((currentMovies) =>
      currentMovies.map((movie) =>
        movie.id === movieId
          ? { ...movie, isBookmarked: !movie.isBookmarked }
          : movie,
      ),
    );
  }

  return (
    <main className="mx-auto flex max-w-[1440px] flex-col gap-5 px-20 py-6">
      <h1 className="text-[38px] leading-[44px] font-bold tracking-[-1.71px]">
        영화 목록
      </h1>
      <MovieGrid movies={movies} onToggleBookmark={handleToggleBookmark} />
      <Pagination />
    </main>
  );
}

import { useState } from "react";
import { MovieGrid } from "../../components/movies/movie-grid";
import { Pagination } from "../../components/movies/pagination";
import { movies as initialMovies } from "../../data/movies";
import type { Movie } from "../../types/movie";

export function MovieListPage() {
  const [movies, setMovies] = useState<Movie[]>(initialMovies);
  const [currentPage, setCurrentPage] = useState(1);

  const handleToggleBookmark = (movieId: number) => {
    setMovies((currentMovies) =>
      currentMovies.map((movie) =>
        movie.id === movieId
          ? { ...movie, isBookmarked: !movie.isBookmarked }
          : movie,
      ),
    );
  };

  return (
    <main className="mx-auto w-full max-w-[1440px] flex-1 px-4 pt-6 pb-16 sm:px-6 md:px-8 md:pb-32 xl:px-20">
      <h1 className="mt-0 mb-5 text-[28px] leading-9 font-bold tracking-[-1.2px] md:text-4xl md:leading-[44px]">
        영화 목록
      </h1>

      <MovieGrid movies={movies} onToggleBookmark={handleToggleBookmark} />
      <Pagination currentPage={currentPage} onPageChange={setCurrentPage} />
    </main>
  );
}

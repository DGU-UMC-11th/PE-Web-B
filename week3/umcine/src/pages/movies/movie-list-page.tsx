import { useState } from "react";
import MovieGrid from "../../components/movies/movie-grid";
import Pagination from "../../components/movies/pagination";
import { movies as initialMovies } from "../../data/movies";

const PAGE_SIZE = 10;
export function MovieListPage() {
  const [movies, setMovies] = useState(initialMovies);
  const [currentPage, setCurrentPage] = useState(1);
  function toggleBookmark(id: number) {
    setMovies((current) => current.map((movie) => movie.id === id ? { ...movie, isBookmarked: !movie.isBookmarked } : movie));
  }
  return <main className="mx-auto w-full max-w-[1440px] flex-1 px-20 pt-6 pb-[54px] max-[1100px]:px-8 max-[760px]:px-6 max-[540px]:px-4">
    <h1 className="mb-5 text-4xl leading-11 font-bold tracking-[-1.2px] max-[760px]:text-[28px]">영화 목록</h1>
    <MovieGrid movies={movies.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)} onToggleBookmark={toggleBookmark} />
    <Pagination currentPage={currentPage} totalPages={Math.ceil(movies.length / PAGE_SIZE)} onPageChange={setCurrentPage} />
  </main>;
}


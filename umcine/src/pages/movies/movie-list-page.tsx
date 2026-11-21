import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMovies } from "../../api/movies/get-movies";
import { StatusMessage } from "../../components/status-message";
import { MovieGrid, MovieGridSkeleton } from "../../components/movies/movie-grid";
import { Pagination } from "../../components/movies/pagination";

export function MovieListPage() {
  const [currentPage, setCurrentPage] = useState(1);

  // page를 key에 넣어서 페이지마다 캐시를 따로 저장해요.
  const moviesQuery = useQuery({
    queryKey: ["movies", "list", { page: currentPage }],
    queryFn: () => getMovies({ page: currentPage }),
  });

  const movies = moviesQuery.data?.results ?? [];

  return (
    <main className="mx-auto w-full max-w-[1440px] flex-1 px-4 pt-6 pb-16 sm:px-6 md:px-8 md:pb-32 xl:px-20">
      <h1 className="mt-0 mb-5 text-[28px] leading-9 font-bold tracking-[-1.2px] md:text-4xl md:leading-[44px]">
        영화 목록
      </h1>

      {moviesQuery.isPending ? (
        <MovieGridSkeleton />
      ) : moviesQuery.isError ? (
        <StatusMessage message="영화 목록을 불러오지 못했어요." />
      ) : movies.length === 0 ? (
        <StatusMessage message="조건에 맞는 영화가 없어요." />
      ) : (
        <MovieGrid movies={movies} />
      )}
      <Pagination currentPage={currentPage} onPageChange={setCurrentPage} />
    </main>
  );
}

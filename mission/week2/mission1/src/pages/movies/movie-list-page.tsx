import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getMovies } from "../../api/movies/get-movies";
import { MovieGrid } from "../../components/movies/movie-grid";
import { Pagination } from "../../components/movies/pagination";
import { StatusMessage } from "../../components/movies/status-message";

// TMDB는 목록 API에서 500페이지까지만 조회할 수 있어요.
const TMDB_MAX_PAGE = 500;

export function MovieListPage() {
  const [page, setPage] = useState(1);

  const moviesQuery = useQuery({
    queryKey: ["movies", "list", { page }],
    queryFn: () => getMovies({ page }),
  });

  const movies = moviesQuery.data?.results ?? [];
  const totalPages = Math.min(moviesQuery.data?.total_pages ?? 0, TMDB_MAX_PAGE);

  function handlePageChange(nextPage: number) {
    setPage(nextPage);
    window.scrollTo({ top: 0 });
  }

  function renderContent() {
    if (moviesQuery.isPending) {
      return <StatusMessage>영화 목록을 불러오는 중이에요.</StatusMessage>;
    }
    if (moviesQuery.isError) {
      return <StatusMessage tone="error">영화 목록을 불러오지 못했어요.</StatusMessage>;
    }
    if (movies.length === 0) {
      return <StatusMessage>표시할 영화가 없어요.</StatusMessage>;
    }

    return (
      <>
        <MovieGrid movies={movies} />
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </>
    );
  }

  return (
    <main className="mx-auto flex max-w-[1440px] flex-col gap-5 px-20 py-6">
      <h1 className="text-[38px] leading-[44px] font-bold tracking-[-1.71px]">
        영화 목록
      </h1>
      {renderContent()}
    </main>
  );
}

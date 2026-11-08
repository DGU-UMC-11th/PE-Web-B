import { useEffect, useState } from "react";
import { getMovies } from "../../api/movies/get-movies";
import type { TmdbMovieListItem } from "../../api/movies/models";
import { StatusMessage } from "../../components/status-message";
import { MovieGrid, MovieGridSkeleton } from "../../components/movies/movie-grid";
import { Pagination } from "../../components/movies/pagination";

type MovieListResult =
  | { page: number; status: "success"; movies: TmdbMovieListItem[] }
  | { page: number; status: "error" };

export function MovieListPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [result, setResult] = useState<MovieListResult | null>(null);

  useEffect(() => {
    let ignore = false;

    async function loadMovies() {
      try {
        const response = await getMovies({ page: currentPage });
        if (!ignore) setResult({ page: currentPage, status: "success", movies: response.results });
      } catch {
        if (!ignore) setResult({ page: currentPage, status: "error" });
      }
    }

    loadMovies();

    return () => {
      ignore = true;
    };
  }, [currentPage]);

  // 저장된 결과가 현재 페이지의 결과가 아니면 아직 로딩 중이에요.
  const isLoading = result?.page !== currentPage;

  return (
    <main className="mx-auto w-full max-w-[1440px] flex-1 px-4 pt-6 pb-16 sm:px-6 md:px-8 md:pb-32 xl:px-20">
      <h1 className="mt-0 mb-5 text-[28px] leading-9 font-bold tracking-[-1.2px] md:text-4xl md:leading-[44px]">
        영화 목록
      </h1>

      {isLoading ? (
        <MovieGridSkeleton />
      ) : result.status === "error" ? (
        <StatusMessage message="영화 목록을 불러오지 못했어요." />
      ) : result.movies.length === 0 ? (
        <StatusMessage message="조건에 맞는 영화가 없어요." />
      ) : (
        <MovieGrid movies={result.movies} />
      )}
      <Pagination currentPage={currentPage} onPageChange={setCurrentPage} />
    </main>
  );
}

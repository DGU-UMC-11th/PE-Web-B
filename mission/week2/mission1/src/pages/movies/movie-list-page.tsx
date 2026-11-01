import { useEffect, useState } from "react";
import { getMovies } from "../../api/movies/get-movies";
import type { TmdbMovieListItem } from "../../api/movies/models";
import { MovieGrid } from "../../components/movies/movie-grid";
import { Pagination } from "../../components/movies/pagination";
import { StatusMessage } from "../../components/movies/status-message";

export function MovieListPage() {
  const [movies, setMovies] = useState<TmdbMovieListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;
    async function loadMovies() {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const response = await getMovies({ page: 1 });
        if (!ignore) setMovies(response.results);
      } catch {
        if (!ignore) setErrorMessage("영화 목록을 불러오지 못했어요.");
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }

    loadMovies();

    return () => {
      ignore = true;
    };
  }, []);

  function renderContent() {
    if (isLoading) return <StatusMessage>영화 목록을 불러오는 중이에요.</StatusMessage>;
    if (errorMessage) return <StatusMessage tone="error">{errorMessage}</StatusMessage>;
    return (
      <>
        <MovieGrid movies={movies} />
        {movies.length > 0 && <Pagination />}
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

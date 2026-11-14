import { useEffect, useState } from "react";
import { getMovies } from "../../api/movies/get-movies";
import type { TmdbMovieListItem } from "../../api/movies/models";
import MovieGrid from "../../components/movies/movie-grid";
import Pagination from "../../components/movies/pagination";
import { useViewSettingsStore } from "../../stores/view-settings-store";

export function MovieListPage() {
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState<TmdbMovieListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const cardSize = useViewSettingsStore((state) => state.cardSize);
  const toggleCardSize = useViewSettingsStore((state) => state.toggleCardSize);

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

  return (
    <main className="flex flex-col gap-5 px-20 py-6">
      <div className="flex items-center justify-between">
        <h1 className="text-[38px] font-bold leading-[44px] tracking-[-1.71px]">
          영화 목록
        </h1>
        <button
          type="button"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          onClick={toggleCardSize}
        >
          {cardSize === "small" ? "크게보기" : "작게보기"}
        </button>
      </div>

      {isLoading ? (
        <p className="text-sm text-[#606774]">영화 목록을 불러오는 중이에요.</p>
      ) : errorMessage ? (
        <p className="text-sm text-[#606774]">{errorMessage}</p>
      ) : movies.length === 0 ? (
        <p className="text-sm text-[#606774]">조건에 맞는 영화가 없어요.</p>
      ) : (
        <MovieGrid movies={movies} />
      )}

      <Pagination currentPage={page} totalPages={5} onPageChange={setPage} />
    </main>
  );
}

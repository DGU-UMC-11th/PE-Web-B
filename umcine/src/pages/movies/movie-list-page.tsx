import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import MovieGrid from "../../components/movies/movie-grid";
import Pagination from "../../components/movies/pagination";
import type { TmdbMovieListItem } from "../../api/movies/models.ts";
import { getMovies } from "../../api/movies/get-movies.ts";

// TMDB는 500페이지를 넘는 요청을 거절해요.
const TMDB_MAX_PAGE = 500;

export default function MovieListPage() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState<TmdbMovieListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    let ignore = false;

    async function loadMovies() {
      try {
        const response = await getMovies({ page: currentPage });
        if (!ignore) {
          setMovies(response.results);
          setTotalPages(Math.min(response.total_pages, TMDB_MAX_PAGE));
        }
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
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setIsLoading(true);
    setErrorMessage(null);
    setCurrentPage(page);
    window.scrollTo({ top: 0 });
  };

  return (
    <div className="mx-auto w-full max-w-[1360px] px-4 pt-6 pb-6 sm:px-6 sm:pt-8 lg:px-10 lg:pt-10">
      <h1 className="mb-5 text-[22px] font-bold tracking-[-0.5px] text-gray-900 sm:mb-7 sm:text-[26px]">영화 목록</h1>
      {isLoading ? (
        <p className="py-20 text-center text-sm text-gray-400">영화 목록을 불러오는 중이에요...</p>
      ) : errorMessage ? (
        <p className="py-20 text-center text-sm text-red-500">{errorMessage}</p>
      ) : movies.length === 0 ? (
        <p className="py-20 text-center text-sm text-gray-400">표시할 영화가 없어요.</p>
      ) : (
        <MovieGrid
          movies={movies}
          onSelectMovie={(id) =>
            navigate({ to: "/movies/$movieId", params: { movieId: String(id) } })
          }
        />
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import MovieGrid from "../../components/movies/movie-grid";
import Pagination from "../../components/movies/pagination";
import { getMovies } from "../../api/movies/get-movies.ts";

// TMDB는 500페이지를 넘는 요청을 거절해요.
const TMDB_MAX_PAGE = 500;

export default function MovieListPage() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const moviesQuery = useQuery({
    queryKey: ["movies", "list", { page }],
    queryFn: () => getMovies({ page }),
  });

  const movies = moviesQuery.data?.results ?? [];
  const totalPages = Math.min(moviesQuery.data?.total_pages ?? 0, TMDB_MAX_PAGE);

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage);
    window.scrollTo({ top: 0 });
  };

  return (
    <div className="mx-auto w-full max-w-[1360px] px-4 pt-6 pb-6 sm:px-6 sm:pt-8 lg:px-10 lg:pt-10">
      <h1 className="mb-5 text-[22px] font-bold tracking-[-0.5px] text-gray-900 sm:mb-7 sm:text-[26px]">영화 목록</h1>
      {moviesQuery.isPending ? (
        <p className="py-20 text-center text-sm text-gray-400">영화 목록을 불러오는 중이에요...</p>
      ) : moviesQuery.isError ? (
        <p className="py-20 text-center text-sm text-red-500">영화 목록을 불러오지 못했어요.</p>
      ) : movies.length === 0 ? (
        <p className="py-20 text-center text-sm text-gray-400">표시할 영화가 없어요.</p>
      ) : (
        <>
          <MovieGrid
            movies={movies}
            onSelectMovie={(id) =>
              navigate({ to: "/movies/$movieId", params: { movieId: String(id) } })
            }
          />
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}

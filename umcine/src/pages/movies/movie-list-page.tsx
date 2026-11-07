import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import MovieGrid from "../../components/movies/movie-grid";
import Pagination from "../../components/movies/pagination";
import { useViewSettingsStore } from "../../stores/view-settings-store";
import { movieQueries } from "../../api/movies/movie-queries";

export function MovieListPage() {
  const [page, setPage] = useState(1);
  const cardSize = useViewSettingsStore((state) => state.cardSize);
  const toggleCardSize = useViewSettingsStore((state) => state.toggleCardSize);

  const moviesQuery = useQuery(movieQueries.list(page));

  const movies = moviesQuery.data?.results ?? [];
  const totalPages = moviesQuery.data?.total_pages ?? 0;

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage);
  };

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

      {moviesQuery.isPending ? (
        <p className="text-sm text-[#606774]">영화 목록을 불러오는 중이에요.</p>
      ) : moviesQuery.isError ? (
        <p className="text-sm text-[#606774]">영화 목록을 불러오지 못했어요.</p>
      ) : movies.length === 0 ? (
        <p className="text-sm text-[#606774]">조건에 맞는 영화가 없어요.</p>
      ) : (
        <MovieGrid movies={movies} />
      )}

      <Pagination
        currentPage={page}
        totalPages={Math.min(totalPages, 5)}
        onPageChange={handlePageChange}
      />
    </main>
  );
}

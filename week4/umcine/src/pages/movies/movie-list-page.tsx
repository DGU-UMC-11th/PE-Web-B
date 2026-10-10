import { useState } from "react";
import MovieGrid from "../../components/movies/movie-grid";
import Pagination from "../../components/movies/pagination";
import { useViewSettingsStore } from "../../stores/view-settings-store";

export function MovieListPage() {
  const [page, setPage] = useState(1);
  const cardSize = useViewSettingsStore((state) => state.cardSize);
  const toggleCardSize = useViewSettingsStore((state) => state.toggleCardSize);

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
      <MovieGrid />

      <Pagination currentPage={page} totalPages={5} onPageChange={setPage} />
    </main>
  );
}

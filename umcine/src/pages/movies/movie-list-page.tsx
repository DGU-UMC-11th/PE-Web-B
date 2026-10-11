import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { movies as initialMovies } from "../../data/movies";
import { useBookmarkStore } from "../../stores/bookmark-store";
import MovieGrid from "../../components/movies/movie-grid";
import Pagination from "../../components/movies/pagination";

export default function MovieListPage() {
  const navigate = useNavigate();
  const bookmarkedMovieIds = useBookmarkStore((state) => state.bookmarkedMovieIds);
  const toggleBookmark = useBookmarkStore((state) => state.toggleBookmark);
  const movies = initialMovies.map((m) => ({
    ...m,
    isBookmarked: bookmarkedMovieIds.includes(m.id),
  }));
  const [currentPage, setCurrentPage] = useState<number>(1);

  return (
    <div className="mx-auto w-full max-w-[1360px] px-4 pt-6 pb-6 sm:px-6 sm:pt-8 lg:px-10 lg:pt-10">
      <h1 className="mb-5 text-[22px] font-bold tracking-[-0.5px] text-gray-900 sm:mb-7 sm:text-[26px]">영화 목록</h1>
      <MovieGrid
        movies={movies}
        onToggleBookmark={toggleBookmark}
        onSelectMovie={(id) =>
          navigate({ to: "/movies/$movieId", params: { movieId: String(id) } })
        }
      />
      <Pagination
        currentPage={currentPage}
        totalPages={1}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

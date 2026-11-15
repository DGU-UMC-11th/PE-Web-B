
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useSearch } from "@tanstack/react-router";
import MovieGrid from "../../components/movies/movie-grid";
import Pagination from "../../components/movies/pagination";
import { getMovies } from "../../api/movies/get-movies";

export function MovieListPage() {
  const { page } = useSearch({ from: "/" });
  const navigate = useNavigate({ from: "/" });

  const currentPage = page ?? 1;

  const moviesQuery = useQuery({
    queryKey: ["movies", "list", { page: currentPage }],
    queryFn: () => getMovies({ page: currentPage }),
  });

  const movies = moviesQuery.data?.results ?? [];
  const totalPages = Math.min(
    moviesQuery.data?.total_pages ?? 0,
    500
  );

  function handlePageChange(nextPage: number) {
    if (nextPage === currentPage) return;

    void navigate({
      to: "/",
      search: nextPage === 1 ? {} : { page: nextPage },
    });
  }

  return (
    <main className="mx-auto w-full max-w-[1440px] flex-1 px-20 pt-6 pb-[54px] max-[1100px]:px-8 max-[760px]:px-6 max-[540px]:px-4">
      <h1 className="mb-5 text-4xl leading-11 font-bold tracking-[-1.2px] max-[760px]:text-[28px]">
        영화 목록
      </h1>

      {moviesQuery.isPending ? (
        <p role="status">영화 목록을 불러오는 중이에요.</p>
      ) : moviesQuery.isError ? (
        <div className="flex flex-col items-center gap-4 py-16">
          <p role="alert">영화 목록을 불러오지 못했어요.</p>

          <button
            type="button"
            onClick={() => void moviesQuery.refetch()}
            className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
          >
            다시 시도
          </button>
        </div>
      ) : movies.length === 0 ? (
        <p>영화가 없어요.</p>
      ) : (
        <>
          <MovieGrid movies={movies} />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </main>
  );
}

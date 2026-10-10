import { MovieGrid } from "../../components/movies/movie-grid";
import { Pagination } from "../../components/movies/pagination";
import { movies } from "../../data/movies";

export function MovieListPage() {
  return (
    <main className="mx-auto flex max-w-[1440px] flex-col gap-5 px-20 py-6">
      <h1 className="text-[38px] leading-[44px] font-bold tracking-[-1.71px]">
        영화 목록
      </h1>
      <MovieGrid movies={movies} />
      <Pagination />
    </main>
  );
}

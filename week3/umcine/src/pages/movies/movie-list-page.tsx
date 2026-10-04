import { useState } from "react";
import MovieGrid from "../../components/movies/movie-grid";
import Pagination from "../../components/movies/pagination";

export function MovieListPage() {
    const [page, setPage] = useState(1);

    return (
        <main className="flex flex-col gap-5 px-20 py-6">
            <h1 className="text-[38px] font-bold leading-[44px] tracking-[-1.71px]">영화 목록</h1>

            <MovieGrid />

            <Pagination currentPage={page} totalPages={5} onPageChange={setPage} />
        </main>
    );
}

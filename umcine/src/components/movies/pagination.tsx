//pagination.tsx

import { useNavigate, useSearch } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { popularMoviesQuery } from "../../api/movies/get-movies";
import { ErrorMessage, LoadingMessage } from "../query-status";
import MovieGrid from "./movie-grid";
import { PageSelector } from "../page-bar/page-bar-selector";

export default function Pagination() {
    const { page = 1 } = useSearch({ from: "/" });
    const navigate = useNavigate({ from: "/" });
    const { data, isPending, isError, isFetching, refetch } = useQuery(popularMoviesQuery(page));

    return (
        <>
            <h1 className="mb-4 text-4xl font-extrabold">영화 목록</h1>
            {isPending ? (
                <LoadingMessage />
            ) : isError ? (
                <ErrorMessage
                    message="영화 목록을 불러오지 못했어요."
                    onRetry={() => refetch()}
                    isRetrying={isFetching}
                />
            ) : data.movies.length === 0 ? (
                <p>영화가 없습니다</p>
            ) : (
                <>
                    <MovieGrid movies={data.movies} />
                    <PageSelector
                        page={page}
                        totalPages={data.totalPages}
                        onChange={(next) => navigate({ search: { page: next > 1 ? next : undefined } })}
                    />
                </>
            )}
        </>
    );
}

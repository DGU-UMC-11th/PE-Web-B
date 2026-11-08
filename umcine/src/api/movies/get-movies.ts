import { keepPreviousData, queryOptions } from "@tanstack/react-query";
import { tmdbClient } from "../tmdb-client";
import { toMoviePage } from "../../utils/movies/movie-adapter";
import type { TmdbMovieListResponse } from "./models";

interface GetMoviesRequest {
    page?: number;
}

type GetMoviesResponse = TmdbMovieListResponse;

/*{page = 1}: GetMoviesRequest = {}
page 꺼내쓰되, 없으면 1
들어오는 객체 타입은 GetMoviesRequest
기본값은 {}
 */
function getMovies({page = 1}: GetMoviesRequest = {}) {
    return tmdbClient.get(
        "movie/popular", {
            searchParams: {
                "language": "ko-KR",
                page
            },
        },
    ).json<GetMoviesResponse>();
    //.json<T>() => Promise<T>;
}

const popularMoviesQuery = (page: number) =>
    queryOptions({
        queryKey: ["movies", page],
        queryFn: () => getMovies({ page }),
        select: toMoviePage,
        placeholderData: keepPreviousData, // 페이지 이동 시 이전 목록 유지
    });

export {getMovies, popularMoviesQuery, type GetMoviesRequest, type GetMoviesResponse};

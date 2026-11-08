import { env } from "../../config/env";
import type { TmdbMovieListResponse } from "./models";

type GetMoviesWithRetchResponse = TmdbMovieListResponse;

async function getMoviesWithFetch(
    page:number = 1
): Promise<GetMoviesWithRetchResponse> {
    const searchParams = new URLSearchParams({
        language: "ko-kr",
        page: String(page),
    });

    const reponse = await fetch(
        `${env.tmdbApiBaseUrl}/movie/popular?${searchParams}`,
        {
            headers: {
                Authorization: `Bearer ${env.tmdbAccessToken}`,
            },
        },
    );

    if(!reponse.ok) {
        throw new Error(`영화 목록 요청 실패. ${reponse.status}`);
    }

    return reponse.json();
}

export {getMoviesWithFetch, type GetMoviesWithRetchResponse};
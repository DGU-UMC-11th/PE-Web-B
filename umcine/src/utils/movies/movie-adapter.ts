import type {
    TmdbMovie,
    TmdbMovieDetail,
    TmdbMovieListResponse,
} from "../../api/movies/models";
import type { MovieDetail, MovieItem, MoviePage } from "../../types/movie";
import { MAX_PAGE } from "./page";
import { getTmdbBackdropUrl, getTmdbPosterUrl } from "./tmdb-image";

export function toMovieItem(movie: TmdbMovie): MovieItem {
    return {
        id: movie.id,
        title: movie.title,
        originalTitle: movie.original_title,
        releaseDate: movie.release_date.replaceAll("-", "."), // 2026-07-29 -> 2026.07.29
        overview: movie.overview,
        posterUrl: getTmdbPosterUrl(movie.poster_path),
    };
}

export function toMoviePage(response: TmdbMovieListResponse): MoviePage {
    return {
        movies: response.results.map(toMovieItem),
        page: response.page,
        totalPages: Math.min(response.total_pages, MAX_PAGE),
        totalResults: response.total_results,
    };
}

export function toMovieDetail(movie: TmdbMovieDetail): MovieDetail {
    return {
        ...toMovieItem(movie),
        tagline: movie.tagline,
        backdropUrl: getTmdbBackdropUrl(movie.backdrop_path),
        genreText: movie.genres.map((genre) => genre.name).join(", "),
        runtimeText:
            movie.runtime === null
                ? "상영 시간 정보가 없어요."
                : `${Math.floor(movie.runtime / 60)}시간 ${movie.runtime % 60}분`,
    };
}

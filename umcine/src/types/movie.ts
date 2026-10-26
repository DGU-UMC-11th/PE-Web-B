export interface MovieItem {
    id: number;
    title: string;
    originalTitle: string;
    releaseDate: string;
    overview: string;
    posterUrl: string | undefined;
}

export interface MovieDetail extends MovieItem {
    tagline: string;
    backdropUrl: string | undefined;
    genreText: string;
    runtimeText: string;
}

export interface MoviePage {
    movies: MovieItem[];
    page: number;
    totalPages: number;
    totalResults: number;
}

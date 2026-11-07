import { queryOptions } from "@tanstack/react-query";
import { getMovieDetail } from "./get-movie-detail";
import { searchMovies } from "./search-movies";
import { getMovies } from "./get-movies";

export const movieQueries = {
  list: (page: number) =>
    queryOptions({
      queryKey: ["movies", "list", { page }],
      queryFn: () => getMovies({ page }),
    }),

  search: (query: string) =>
    queryOptions({
      queryKey: ["movies", "search", { query }],
      queryFn: () => searchMovies({ query }),
    }),

  detail: (movieId: number) =>
    queryOptions({
      queryKey: ["movies", "detail", movieId],
      queryFn: () => getMovieDetail(movieId),
    }),
};

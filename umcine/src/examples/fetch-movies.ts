import { getMoviesWithFetch } from "../api/movies/get-movies-with-fetch";

getMoviesWithFetch(1)
    .then((response) => console.log(response.results))
    .catch((error) => console.log(error));
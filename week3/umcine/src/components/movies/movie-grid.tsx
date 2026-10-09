import { useState } from "react";
import { movies as initialMovies } from "../../data/movies";
import type { Movie } from "../../types/movie";
import MovieCard from "./movie-card";

export default function MovieGrid() {
    const [movies, setMovies] = useState<Movie[]>(initialMovies);

    function handleBookmarkToggle(id: number) {
        setMovies((currentMovies) =>
            currentMovies.map((movie) =>
                movie.id === id
                    ? { ...movie, isBookmarked: !movie.isBookmarked }
                    : movie
            )
        );
    }

    return (
        <ul className="grid grid-cols-1 gap-x-[18px] gap-y-[21px] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {movies.map((movie) => (
                <li key={movie.id}>
                    <MovieCard movie={movie} onBookmarkToggle={handleBookmarkToggle} />
                </li>
            ))}
        </ul>
    );
}

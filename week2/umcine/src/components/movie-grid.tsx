import { useState } from "react";
import { movies as initialMovies } from "../data/movies";
import type { Movie } from "../types/movie";
import MovieCard from "./movie-card";
import "./movie-grid.css";

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
        <ul className="movie-grid">
            {movies.map((movie) => (
                <li key={movie.id}>
                    <MovieCard movie={movie} onBookmarkToggle={handleBookmarkToggle} />
                </li>
            ))}
        </ul>
    );
}

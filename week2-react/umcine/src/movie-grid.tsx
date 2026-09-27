//movie-grid.tsx

import { useContext } from "react";
import { MovieContext } from "./movie-context";
import MovieCard from "./movie-card";
import { PageContext } from "./page-context";
import "./movie-grid.css";

export default function MovieGrid() {
    const {movies} = useContext(MovieContext);
    const {page} = useContext(PageContext);

    const START = 0;
    const COUNT = 3;

    const targetMovies = movies.slice(START+(page-1)*COUNT, START+COUNT*page);

    return (
        <div className="movie-grid">
            {targetMovies.length === 0
                ? <p>영화가 없습니다</p>
                : targetMovies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie}/>
                ))
            }
        </div>
    );
}
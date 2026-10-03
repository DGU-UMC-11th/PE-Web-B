//movie-grid.tsx

import { useContext } from "react";
import { MovieContext } from "../../contexts/movie-context";
import MovieCard from "./movie-card";
import { PAGE_SIZE, PageContext } from "../../contexts/page-bar-context";

export default function MovieGrid() {
    const {movies} = useContext(MovieContext);
    const {page} = useContext(PageContext);

    const targetMovies = movies.slice((page-1)*PAGE_SIZE, page*PAGE_SIZE);

    return (
        <div className="grid grid-cols-2 gap-4 gap-y-6 md:grid-cols-3 lg:grid-cols-5">
            {targetMovies.length === 0
                ? <p>영화가 없습니다</p>
                : targetMovies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie}/>
                ))
            }
        </div>
    );
}

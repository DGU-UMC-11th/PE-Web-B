//movie-grid.tsx

import MovieCard from "./movie-card";
import type { MovieItem } from "../../types/movie";

export default function MovieGrid({ movies }: { movies: MovieItem[] }) {
    return (
        <div className="grid grid-cols-2 gap-4 gap-y-6 md:grid-cols-3 lg:grid-cols-5">
            {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie}/>
            ))}
        </div>
    );
}

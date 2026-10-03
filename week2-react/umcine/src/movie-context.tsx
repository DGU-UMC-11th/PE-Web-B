//movie-context.tsx

import { createContext, useState } from "react";
import { type Movie } from "./types/movie";
import { movies } from "./data/movies";

const initialMovie: Movie[] = movies;

type MovieContextType = {
    movies: Movie[],
    toggleBookmark: (id:number) => void,
};
export const MovieContext = createContext<MovieContextType>({
    movies : initialMovie,
    toggleBookmark: () => {},
});

export function MovieProvider({ children }) {
    const [movies, setMovies] = useState<Movie[]>(initialMovie);

    const toggleBookmark = (id:number) => {
        setMovies(movies => movies.map((movie) => 
            movie.id === id 
                ? {...movie, isBookmarked: !movie.isBookmarked} 
                : movie
        ))
    }

    return (
        <MovieContext.Provider value={{movies, toggleBookmark}}>
            {children}
        </MovieContext.Provider>
    );
}
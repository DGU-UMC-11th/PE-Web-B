import { createContext, useState, type ReactNode, useEffect } from "react";
import { type Movie } from "../types/movie";
import { movies } from "../data/movies";
import { readBookmarkIds, saveBookmarkIds } from "../utils/.bookmark-storage";

const initialMovie: Movie[] = movies;

type MovieContextType = {
    movies: Movie[],
    toggleBookmark: (id:number) => void,
};
export const MovieContext = createContext<MovieContextType>({
    movies : initialMovie,
    toggleBookmark: () => {},
});

export function MovieProvider({ children }: { children: ReactNode }) {
    const [movies, setMovies] = useState<Movie[]>(() => {
        const savedBookmarks: Set<number> = new Set(readBookmarkIds());

        return initialMovie.map((movie) => (
            {...movie, isBookmarked: savedBookmarks.has(movie.id)}
        ));
    });

    useEffect(() => {
        saveBookmarkIds(
            movies.filter((movie) => movie.isBookmarked).map((movie) => movie.id)
        );
    }, [movies]);


    const toggleBookmark = (id:number) => {
        setMovies(movies => movies.map((movie) => 
            movie.id === id 
                ? {...movie, isBookmarked: !movie.isBookmarked} 
                : movie
        ));
    }

    return (
        <MovieContext.Provider value={{movies, toggleBookmark}}>
            {children}
        </MovieContext.Provider>
    );
}
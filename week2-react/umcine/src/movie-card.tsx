//movie-card.tsx

import { type Movie } from "./types/movie";
import { useContext } from "react";
import { MovieContext } from "./movie-context";
import "./movie-card.css";


type MovieCardProps = {
    movie : Movie
}

export default function MovieCard({movie} : MovieCardProps) {
    const {toggleBookmark} = useContext(MovieContext);


    return (
        <div className="movie-card">
            <img className="movie-card__poster" src={movie.posterPath}></img>
            <h3>{movie.title}</h3>
            <p>{movie.genres}</p>
            <p>{movie.releaseDate}</p>
            <button onClick={() => toggleBookmark(movie.id)} aria-pressed={movie.isBookmarked}>
                {movie.isBookmarked ? "북마크됨" : "북마크하기"}
            </button>
        </div>
    )    
}
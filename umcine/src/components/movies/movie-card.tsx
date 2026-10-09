//movie-card.tsx

import { type Movie } from "../../types/movie";
import { Link } from "@tanstack/react-router";
import { BookmarkButton } from "../bookmark-button";

type MovieCardProps = {
    movie : Movie
}

export default function MovieCard({movie} : MovieCardProps) {
    return (
        <article className="relative min-w-0">
            <Link to="/movies/$movieId" params={{movieId : String(movie.id)}}>
                <img className="block aspect-[221/250] w-full rounded-xl object-cover"
                    src={movie.posterPath}
                    alt={`${movie.title} 포스터`} />
                <h3 className="mt-2 truncate text-sm font-bold">{movie.title}</h3>
                <p className="text-xs text-gray-400">{movie.releaseDate}</p>
            </Link>
            <BookmarkButton movieId={movie.id} />
        </article>
    )
}
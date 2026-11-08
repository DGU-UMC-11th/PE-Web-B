//movie-card.tsx

import { Link } from "@tanstack/react-router";
import { BookmarkButton } from "../bookmark-button";
import Poster from "./poster";
import type { MovieItem } from "../../types/movie";

type MovieCardProps = {
    movie : MovieItem
};

export default function MovieCard({movie} : MovieCardProps) {
    return (
        <article className="relative min-w-0">
            <Link to="/movies/$movieId" params={{movieId : String(movie.id)}}>
                <Poster
                    className="block aspect-[221/250] w-full rounded-xl object-cover"
                    src={movie.posterUrl}
                    alt={`${movie.title} 포스터`} />
                <h3 className="mt-2 truncate text-sm font-bold">{movie.title}</h3>
                <p className="text-xs text-gray-400">{movie.releaseDate}</p>
            </Link>
            <BookmarkButton movieId={movie.id} />
        </article>
    )
}

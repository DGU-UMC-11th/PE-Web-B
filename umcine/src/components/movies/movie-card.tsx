//movie-card.tsx

import { type Movie } from "../../types/movie";
import { useContext } from "react";
import { MovieContext } from "../../contexts/movie-context";
import { Link } from "@tanstack/react-router";

import { cn } from "../../utils/cn";

type MovieCardProps = {
    movie : Movie
}

export default function MovieCard({movie} : MovieCardProps) {
    const {toggleBookmark} = useContext(MovieContext);

    return (
        <article className="relative min-w-0">
            <Link to="/movies/$movieId" params={{movieId : String(movie.id)}}>
                <img className="block aspect-[221/250] w-full rounded-xl object-cover"
                    src={movie.posterPath}
                    alt={`${movie.title} 포스터`} />
                <h3 className="mt-2 truncate text-sm font-bold">{movie.title}</h3>
                <p className="text-xs text-gray-400">{movie.releaseDate}</p>
            </Link>
            <button
                onClick={() => toggleBookmark(movie.id)}
                aria-pressed={movie.isBookmarked}
                aria-label={movie.isBookmarked ? "북마크 해제" : "북마크하기"}
                className={cn(
                    "absolute right-2 top-2 rounded-md border p-1",
                    movie.isBookmarked ? "border-brand bg-brand" : "border-white bg-black/60",
                )}>
                <img src={movie.isBookmarked ? "/icons/bookmark.svg" : "/icons/bookmark-outline.svg"} alt="" className="size-5 invert" />
            </button>
        </article>
    )
}

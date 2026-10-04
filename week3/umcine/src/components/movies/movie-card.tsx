import {Link} from "@tanstack/react-router";
import type { Movie } from "../../types/movie";
import {cn} from "../../utils/cn";

interface MovieCardProps {
    movie: Movie;
    onBookmarkToggle: (id: number) => void;
}

export default function MovieCard({ movie, onBookmarkToggle }: MovieCardProps) {
    return (
        <article className="flex flex-col gap-[4px]">
            <div className="relative h-[274px] overflow-hidden rounded-[10px] bg-[#f6f7f9]">
                <img className="h-full w-full object-cover" src={movie.posterPath} alt={movie.title} />
                <button type="button" className={cn("absolute top-2.5 right-2.5 flex h-[34px] w-[34px] items-center justify-center border rounded-lg", movie.isBookmarked ? "border-blue-600 bg-blue-600" : "border-white bg-[#17191e]")} onClick={() => onBookmarkToggle(movie.id)}>
                    {movie.isBookmarked ? (
                        <img className="brightness-0 invert" src="/icons/bookmark.svg" alt="북마크 켜짐" />
                    ) : (
                        <img className="brightness-0 invert" src="/icons/bookmark-outline.svg" alt="북마크 꺼짐" />
                    )}
                </button>
            </div>

            <Link
                to="/movies/$movieId"
                params={{ movieId: String(movie.id) }}
                className="block truncate pt-[5px] text-sm font-extrabold"
            >
                {movie.title}
            </Link>

            <div className="text-xs text-[#969da8]">
                {movie.releaseDate}
            </div>
        </article>
    );
}

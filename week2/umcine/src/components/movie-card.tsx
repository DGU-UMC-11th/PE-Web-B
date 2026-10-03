import "./movie-card.css";
import type { Movie } from "../types/movie";

interface MovieCardProps {
    movie: Movie;
    onBookmarkToggle: (id: number) => void;
}

export default function MovieCard({ movie, onBookmarkToggle }: MovieCardProps) {
    return (
        <article className="movie-card">
            <div className="movie-card__poster">
                <img src={movie.posterPath} alt={movie.title} />
                <button type="button" className={movie.isBookmarked ? "movie-card__bookmark movie-card__bookmark--active" : "movie-card__bookmark"} onClick={() => onBookmarkToggle(movie.id)}>
                    {movie.isBookmarked ? (
                        <img src="/icons/bookmark.svg" alt="북마크 켜짐" />
                    ) : (
                        <img src="/icons/bookmark-outline.svg" alt="북마크 꺼짐" />
                    )}
                </button>
            </div>

            <div className="movie-card__title">
                {movie.title}
            </div>

            <div className="movie-card__meta">
                {movie.releaseDate}
            </div>
        </article>
    );
}

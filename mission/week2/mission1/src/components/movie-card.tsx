import type { Movie } from "../types/movie";
import "./movie-card.css";

interface MovieCardProps {
  movie: Movie;
  onToggleBookmark: (movieId: number) => void;
}

export default function MovieCard({ movie, onToggleBookmark }: MovieCardProps) {
  return (
    <article className="movie-card">
      <div className="movie-card__poster">
        <img src={movie.posterPath} alt={`${movie.title} 포스터`} />

        <button
          type="button"
          className={
            movie.isBookmarked
              ? "movie-card__bookmark movie-card__bookmark--active"
              : "movie-card__bookmark"
          }
          aria-pressed={movie.isBookmarked}
          aria-label={
            movie.isBookmarked
              ? `${movie.title} 북마크 해제`
              : `${movie.title} 북마크 추가`
          }
          onClick={() => onToggleBookmark(movie.id)}
        >
          {/* 북마크 여부 */}
          <img
            className={movie.isBookmarked ? "icon-invert" : undefined}
            src={
              movie.isBookmarked
                ? "/icons/bookmark.svg"
                : "/icons/bookmark-outline.svg"
            }
            alt=""
          />
        </button>
      </div>

      <h2 className="movie-card__title">{movie.title}</h2>
      <p className="movie-card__date">{movie.releaseDate}</p>
    </article>
  );
}

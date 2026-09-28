import type { Movie } from "../types/movie";

interface MovieCardProps {
  movie: Movie;
  onToggleBookmark: (movieId: number) => void;
}

export default function MovieCard({ movie, onToggleBookmark }: MovieCardProps) {
  return (
    <article className="movie-card">
      <div className="movie-poster-wrap">
        <img
          className="movie-poster"
          src={movie.posterPath}
          alt={`${movie.title} 포스터`}
        />

        <button
          type="button"
          className="bookmark-button"
          aria-pressed={movie.isBookmarked}
          aria-label={`${movie.title} 북마크 ${
            movie.isBookmarked ? "해제" : "추가"
          }`}
          onClick={() => onToggleBookmark(movie.id)}
        >
          <img
            src={
              movie.isBookmarked
                ? "/icons/bookmark.svg"
                : "/icons/bookmark-outline.svg"
            }
            alt=""
          />
        </button>
      </div>{" "}
      {/* movie-poster-wrap 끝 */}
      
      <div className="movie-info">
        <h2>{movie.title}</h2>
        <p>{movie.releaseDate}</p>
      </div>
    </article>
  );
}

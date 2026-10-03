import type { Movie } from "../types/movie";
import styles from "./movie-card.module.css";

interface MovieCardProps {
  movie: Movie;
  onToggleBookmark: (id: number) => void;
  onSelectMovie?: (id: number) => void;
}

export default function MovieCard({
  movie,
  onToggleBookmark,
  onSelectMovie,
}: MovieCardProps) {
  const handleBookmarkClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onToggleBookmark(movie.id);
  };

  const handleCardClick = () => {
    if (onSelectMovie) {
      onSelectMovie(movie.id);
    }
  };

  return (
    <article className={styles.card} onClick={handleCardClick}>
      <div className={styles["poster-wrapper"]}>
        <img
          src={movie.posterPath}
          alt={movie.title}
          className={styles.poster}
          loading="lazy"
        />
        <button
          type="button"
          className={`${styles["bookmark-btn"]} ${
            movie.isBookmarked ? styles.bookmarked : ""
          }`}
          onClick={handleBookmarkClick}
          aria-label={movie.isBookmarked ? "북마크 해제" : "북마크 추가"}
        >
          <img
            src={
              movie.isBookmarked
                ? "/movie-icons/bookmark.svg"
                : "/movie-icons/bookmark-outline.svg"
            }
            alt=""
            className={styles["bookmark-icon"]}
          />
        </button>
      </div>

      <div className={styles.info}>
        <h3 className={styles.title} title={movie.title}>
          {movie.title}
        </h3>
        <p className={styles["release-date"]}>{movie.releaseDate}</p>
      </div>
    </article>
  );
}

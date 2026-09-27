import { useState } from "react";
import type { Movie } from "../types/movie";
import styles from "./movie-detail-page.module.css";

interface MovieDetailPageProps {
  movie: Movie;
  onBack: () => void;
  onToggleBookmark: (id: number) => void;
}

export default function MovieDetailPage({
  movie,
  onBack,
  onToggleBookmark,
}: MovieDetailPageProps) {
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>("");

  const handleSaveReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      alert("별점을 선택해 주세요.");
      return;
    }
    alert("평점이 저장되었습니다!");
  };

  return (
    <div className={styles["detail-page"]}>
      {/* Backdrop Banner */}
      <div className={styles["banner-wrapper"]}>
        <img
          src={movie.backdropPath}
          alt=""
          className={styles.backdrop}
        />
        <div className={styles["banner-overlay"]}>
          <div className={styles["banner-content"]}>
            <button type="button" className={styles["back-btn"]} onClick={onBack}>
              <img
                src="/movie-icons/chevron-left.svg"
                alt=""
                className={styles["back-icon"]}
              />
              영화 목록
            </button>
            <h1 className={styles["banner-title"]}>{movie.title}</h1>
            <p className={styles["banner-original"]}>{movie.originalTitle}</p>
            <p className={styles["banner-meta"]}>
              {movie.releaseDate} · {movie.genres.join(" · ")} · {movie.runtime}
            </p>
          </div>
        </div>
      </div>

      {/* Main Details */}
      <div className={styles.container}>
        <div className={styles["detail-layout"]}>
          {/* Left Poster */}
          <div className={styles["poster-col"]}>
            <img
              src={movie.posterPath}
              alt={movie.title}
              className={styles.poster}
            />
          </div>

          {/* Center Info */}
          <div className={styles["info-col"]}>
            <h2 className={styles.tagline}>{movie.tagline}</h2>
            <p className={styles.overview}>{movie.overview}</p>
            <button
              type="button"
              className={`${styles["bookmark-btn"]} ${
                movie.isBookmarked ? styles.bookmarked : ""
              }`}
              onClick={() => onToggleBookmark(movie.id)}
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
              즐겨찾기
            </button>
          </div>

          {/* Right Rating Box */}
          <aside className={styles["rating-col"]}>
            <h3 className={styles["rating-title"]}>내 평점</h3>
            <p className={styles["rating-caption"]}>
              별점은 필수, 후기는 선택이에요.
            </p>

            <form onSubmit={handleSaveReview}>
              <div className={styles["stars-row"]}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className={styles["star-btn"]}
                    onClick={() => setRating(star)}
                    aria-label={`${star}점`}
                  >
                    <img
                      src={
                        star <= rating
                          ? "/movie-icons/star.svg"
                          : "/movie-icons/star-outline.svg"
                      }
                      alt=""
                      className={styles["star-icon"]}
                    />
                  </button>
                ))}
              </div>

              <textarea
                className={styles.textarea}
                placeholder="영화를 보고 느낀 점을 남겨보세요."
                value={review}
                onChange={(e) => setReview(e.target.value)}
                rows={4}
              />

              <button type="submit" className={styles["save-review-btn"]}>
                평점 저장
              </button>
            </form>
          </aside>
        </div>
      </div>
    </div>
  );
}

import type { Movie } from "../types/movie";
import MovieCard from "./movie-card";
import Pagination from "./pagination";
import styles from "./profile-page.module.css";

interface ProfilePageProps {
  nickname: string;
  email: string;
  bookmarkedMovies: Movie[];
  onToggleBookmark: (id: number) => void;
  onNavigateEdit: () => void;
}

export default function ProfilePage({
  nickname,
  email,
  bookmarkedMovies,
  onToggleBookmark,
  onNavigateEdit,
}: ProfilePageProps) {
  return (
    <div className={styles["profile-page"]}>
      <div className={styles.container}>
        <div className={styles["header-row"]}>
          <h1 className={styles.title}>내 정보</h1>
          <button
            type="button"
            className={styles["edit-btn"]}
            onClick={onNavigateEdit}
          >
            정보 수정
          </button>
        </div>

        {/* 기본 정보 */}
        <section className={styles.section}>
          <h2 className={styles["section-title"]}>기본 정보</h2>
          <div className={styles["info-card"]}>
            <div className={styles["avatar-circle"]}>
              <img
                src="/movie-icons/person.svg"
                alt=""
                className={styles["avatar-icon"]}
              />
            </div>
            <div className={styles["info-group"]}>
              <span className={styles["info-label"]}>닉네임</span>
              <span className={styles["info-value"]}>{nickname}</span>
            </div>
            <div className={styles["info-group"]}>
              <span className={styles["info-label"]}>이메일</span>
              <span className={styles["info-value"]}>{email}</span>
            </div>
          </div>
        </section>

        {/* 내 즐겨찾기 */}
        <section className={styles.section}>
          <h2 className={styles["section-title"]}>내 즐겨찾기</h2>
          {bookmarkedMovies.length > 0 ? (
            <>
              <div className={styles["favorite-grid"]}>
                {bookmarkedMovies.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    onToggleBookmark={onToggleBookmark}
                  />
                ))}
              </div>
              <Pagination currentPage={1} totalPages={1} />
            </>
          ) : (
            <p className={styles["empty-text"]}>
              아직 즐겨찾기한 영화가 없습니다.
            </p>
          )}
        </section>
      </div>
    </div>
  );
}

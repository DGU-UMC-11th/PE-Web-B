import { useState } from "react";
import { searchMovies } from "../data/search-movies";
import styles from "./search-page.module.css";

interface SearchPageProps {
  onSelectMovie: (id: number) => void;
}

export default function SearchPage({ onSelectMovie }: SearchPageProps) {
  const [searchTerm, setSearchTerm] = useState("스파이더맨");
  const [isSearched, setIsSearched] = useState(true);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setIsSearched(true);
    }
  };

  const handleClear = () => {
    setSearchTerm("");
    setIsSearched(false);
  };

  return (
    <div className={styles["search-page"]}>
      <div className={styles.container}>
        {!isSearched ? (
          <div className={styles["empty-state"]}>
            <h1 className={styles["empty-title"]}>어떤 영화를 찾고 있나요?</h1>
            <form className={styles["search-bar-empty"]} onSubmit={handleSearch}>
              <img
                src="/movie-icons/search.svg"
                alt=""
                className={styles["search-icon"]}
              />
              <input
                type="text"
                className={styles["search-input"]}
                placeholder="예: 스파이더맨"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit" className={styles["submit-btn"]}>
                검색
              </button>
            </form>
          </div>
        ) : (
          <div className={styles["results-view"]}>
            <h1 className={styles.title}>영화 검색</h1>

            <form className={styles["search-bar-filled"]} onSubmit={handleSearch}>
              <img
                src="/movie-icons/search.svg"
                alt=""
                className={styles["search-icon"]}
              />
              <input
                type="text"
                className={styles["search-input"]}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  type="button"
                  className={styles["clear-btn"]}
                  onClick={handleClear}
                  aria-label="검색어 지우기"
                >
                  <img
                    src="/movie-icons/close.svg"
                    alt=""
                    className={styles["clear-icon"]}
                  />
                </button>
              )}
              <button type="submit" className={styles["re-search-btn"]}>
                다시 검색
              </button>
            </form>

            <div className={styles["results-header"]}>
              <h2 className={styles["results-query"]}>
                &apos;{searchTerm}&apos; 검색 결과
              </h2>
              <span className={styles["results-count"]}>영화 14편 · 1페이지</span>
            </div>

            <div className={styles["movies-grid"]}>
              {searchMovies.map((movie) => (
                <article key={movie.id} className={styles["movie-item"]}>
                  <div className={styles["poster-box"]}>
                    <img
                      src={movie.posterPath}
                      alt={movie.title}
                      className={styles.poster}
                    />
                  </div>
                  <div className={styles["item-info"]}>
                    <h3 className={styles["item-title"]}>{movie.title}</h3>
                    <p className={styles["item-meta"]}>
                      {movie.originalTitle} {movie.releaseDate}
                    </p>
                    <p className={styles["item-overview"]}>{movie.overview}</p>
                    <button
                      type="button"
                      className={styles["detail-link"]}
                      onClick={() => onSelectMovie(movie.id)}
                    >
                      상세 보기
                      <img
                        src="/movie-icons/arrow-right.svg"
                        alt=""
                        className={styles["arrow-icon"]}
                      />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

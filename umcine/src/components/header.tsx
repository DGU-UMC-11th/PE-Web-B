import styles from "./header.module.css";

interface HeaderProps {
  currentView: string;
  isLoggedIn?: boolean;
  onNavigate: (view: string) => void;
}

export default function Header({
  currentView,
  isLoggedIn = false,
  onNavigate,
}: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles["left-group"]}>
          <div
            className={styles.logo}
            onClick={() => onNavigate("movies")}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") onNavigate("movies");
            }}
          >
            <img
              src="/movie-icons/movie.svg"
              alt="UMCine Logo"
              className={styles["logo-icon"]}
            />
            <span className={styles["logo-text"]}>UMCine</span>
          </div>
          <nav className={styles["nav-menu"]}>
            <button
              type="button"
              className={`${styles["nav-item"]} ${
                currentView === "movies" || currentView === "movie-detail"
                  ? styles.active
                  : ""
              }`}
              onClick={() => onNavigate("movies")}
            >
              영화
            </button>
            <button
              type="button"
              className={`${styles["nav-item"]} ${
                currentView === "search" ? styles.active : ""
              }`}
              onClick={() => onNavigate("search")}
            >
              검색
            </button>
            <button
              type="button"
              className={`${styles["nav-item"]} ${
                currentView === "profile" || currentView === "profile-edit"
                  ? styles.active
                  : ""
              }`}
              onClick={() => onNavigate("profile")}
            >
              내 정보
            </button>
          </nav>
        </div>

        <div className={styles["right-group"]}>
          <button
            type="button"
            className={styles["search-btn"]}
            aria-label="영화 검색"
            onClick={() => onNavigate("search")}
          >
            <img
              src="/movie-icons/search.svg"
              alt=""
              className={styles["search-icon"]}
            />
          </button>
          {isLoggedIn ? (
            <button
              type="button"
              className={styles["mypage-btn"]}
              onClick={() => onNavigate("profile")}
            >
              마이페이지
            </button>
          ) : (
            <button
              type="button"
              className={styles["login-btn"]}
              onClick={() => onNavigate("login")}
            >
              로그인
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

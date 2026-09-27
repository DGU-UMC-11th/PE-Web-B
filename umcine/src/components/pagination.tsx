import styles from "./pagination.module.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  const handlePrev = () => {
    if (currentPage > 1 && onPageChange) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages && onPageChange) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <nav className={styles.pagination} aria-label="페이지 네비게이션">
      <button
        type="button"
        className={styles["nav-btn"]}
        onClick={handlePrev}
        disabled={currentPage <= 1}
        aria-label="이전 페이지"
      >
        <img
          src="/movie-icons/chevron-left.svg"
          alt=""
          className={styles["nav-icon"]}
        />
      </button>

      <div className={styles["page-list"]}>
        {pages.map((page) => (
          <button
            key={page}
            type="button"
            className={`${styles["page-btn"]} ${
              page === currentPage ? styles.active : ""
            }`}
            onClick={() => onPageChange && onPageChange(page)}
            aria-current={page === currentPage ? "page" : undefined}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        type="button"
        className={styles["nav-btn"]}
        onClick={handleNext}
        disabled={currentPage >= totalPages}
        aria-label="다음 페이지"
      >
        <img
          src="/movie-icons/chevron-right.svg"
          alt=""
          className={styles["nav-icon"]}
        />
      </button>
    </nav>
  );
}

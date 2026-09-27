import "./pagination.css";

const pageNumbers = [1, 2, 3, 4, 5];

const currentPage: number = 1;

export default function Pagination() {
  return (
    <nav className="pagination" aria-label="페이지 이동">
      <button
        type="button"
        className="pagination__arrow"
        aria-label="이전 페이지"
        disabled={currentPage === 1}
      >
        <img src="/icons/chevron-left.svg" alt="" />
      </button>

      <ul className="pagination__list">
        {pageNumbers.map((page) => (
          <li key={page}>
            <button
              type="button"
              className={
                page === currentPage
                  ? "pagination__page pagination__page--active"
                  : "pagination__page"
              }
              aria-current={page === currentPage ? "page" : undefined}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="pagination__arrow"
        aria-label="다음 페이지"
      >
        <img src="/icons/chevron-right.svg" alt="" />
      </button>
    </nav>
  );
}

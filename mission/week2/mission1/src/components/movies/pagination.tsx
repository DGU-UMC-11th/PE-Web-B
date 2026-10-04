import { cn } from "../../utils/cn";

const pageNumbers = [1, 2, 3, 4, 5];

const currentPage: number = 1;

export function Pagination() {
  return (
    <nav className="flex items-center justify-center gap-3" aria-label="페이지 이동">
      <button
        type="button"
        className="disabled:cursor-not-allowed"
        aria-label="이전 페이지"
        disabled={currentPage === 1}
      >
        <img src="/icons/chevron-left.svg" alt="" width={24} height={24} />
      </button>

      <ul className="flex items-center gap-1">
        {pageNumbers.map((page) => (
          <li key={page}>
            <button
              type="button"
              className={cn(
                "flex size-9 items-center justify-center rounded-[7px] text-[13px] font-bold",
                page === currentPage
                  ? "bg-ink text-white"
                  : "text-ink-secondary hover:bg-line",
              )}
              aria-current={page === currentPage ? "page" : undefined}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>

      <button type="button" aria-label="다음 페이지">
        <img src="/icons/chevron-right.svg" alt="" width={24} height={24} />
      </button>
    </nav>
  );
}

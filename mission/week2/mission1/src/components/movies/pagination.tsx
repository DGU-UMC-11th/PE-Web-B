import { cn } from "../../utils/cn";

const VISIBLE_PAGE_COUNT = 5;

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function getPageNumbers(currentPage: number, totalPages: number) {
  const count = Math.min(VISIBLE_PAGE_COUNT, totalPages);
  const start = Math.min(
    Math.max(1, currentPage - Math.floor(VISIBLE_PAGE_COUNT / 2)),
    totalPages - count + 1,
  );
  return Array.from({ length: count }, (_, index) => start + index);
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages < 1) return null;

  const pageNumbers = getPageNumbers(currentPage, totalPages);

  return (
    <nav className="flex items-center justify-center gap-3" aria-label="페이지 이동">
      <button
        type="button"
        className="disabled:cursor-not-allowed disabled:opacity-30"
        aria-label="이전 페이지"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
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
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="disabled:cursor-not-allowed disabled:opacity-30"
        aria-label="다음 페이지"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <img src="/icons/chevron-right.svg" alt="" width={24} height={24} />
      </button>
    </nav>
  );
}

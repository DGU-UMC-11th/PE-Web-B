import { cn } from "../../utils/cn";

// 한 번에 보여줄 페이지 번호 개수
const PAGE_WINDOW = 5;

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
  // 현재 페이지가 가운데 오도록 하되, 양 끝에서는 범위를 벗어나지 않게 맞춰요.
  const start = Math.max(
    1,
    Math.min(currentPage - Math.floor(PAGE_WINDOW / 2), totalPages - PAGE_WINDOW + 1),
  );
  const end = Math.min(totalPages, start + PAGE_WINDOW - 1);
  const pages = Array.from({ length: Math.max(0, end - start + 1) }, (_, index) => start + index);

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
    <nav className="mt-8 mb-4 flex items-center justify-center gap-2" aria-label="페이지 네비게이션">
      <button
        type="button"
        className="flex size-8 items-center justify-center rounded-md transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-transparent"
        onClick={handlePrev}
        disabled={currentPage <= 1}
        aria-label="이전 페이지"
      >
        <img
          src="/movie-icons/chevron-left.svg"
          alt=""
          className="size-[18px]"
        />
      </button>

      <div className="flex items-center gap-1">
        {pages.map((page) => (
          <button
            key={page}
            type="button"
            className={cn(
              "flex size-8 items-center justify-center rounded-md text-sm font-medium text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-900",
              page === currentPage &&
                "bg-gray-900 font-bold text-white hover:bg-gray-900 hover:text-white",
            )}
            onClick={() => onPageChange && onPageChange(page)}
            aria-current={page === currentPage ? "page" : undefined}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        type="button"
        className="flex size-8 items-center justify-center rounded-md transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-transparent"
        onClick={handleNext}
        disabled={currentPage >= totalPages}
        aria-label="다음 페이지"
      >
        <img
          src="/movie-icons/chevron-right.svg"
          alt=""
          className="size-[18px]"
        />
      </button>
    </nav>
  );
}

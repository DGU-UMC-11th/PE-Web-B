import { cn } from "../../utils/cn";

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

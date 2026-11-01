
import { cn } from "../../utils/cn";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const arrowClass =
    "grid size-9 place-items-center rounded-lg text-[#667085] hover:bg-gray-200 disabled:opacity-30";

  const startPage = Math.max(
    1,
    Math.min(currentPage - 2, totalPages - 4)
  );

  const visiblePages = Array.from(
    { length: Math.min(5, totalPages) },
    (_, index) => startPage + index
  );

  return (
    <nav
      className="mt-10 flex justify-center gap-1"
      aria-label="영화 목록 페이지"
    >
      <button
        type="button"
        className={arrowClass}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="이전 페이지"
      >
        <img
          className="size-5"
          src="/icons/chevron-left.svg"
          alt=""
        />
      </button>

      {visiblePages.map((page) => (
        <button
          key={page}
          type="button"
          className={cn(
            "size-9 rounded-lg text-sm font-semibold",
            currentPage === page
              ? "bg-[#191b1f] text-white"
              : "text-[#667085] hover:bg-gray-200"
          )}
          aria-label={`${page}페이지`}
          aria-current={currentPage === page ? "page" : undefined}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        className={arrowClass}
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="다음 페이지"
      >
        <img
          className="size-5"
          src="/icons/chevron-right.svg"
          alt=""
        />
      </button>
    </nav>
  );
}

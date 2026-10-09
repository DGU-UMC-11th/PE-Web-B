import { cn } from "../../utils/cn";

interface PaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, onPageChange }: PaginationProps) {
  return (
    <nav className="mt-10 flex justify-center gap-2" aria-label="영화 목록 페이지">
      {[1, 2, 3, 4, 5].map((page) => {
        const isActive = currentPage === page;

        return (
          <button
            key={page}
            type="button"
            className={cn(
              "size-10 rounded-lg border p-0 text-sm font-semibold",
              isActive
                ? "border-blue-600 bg-blue-600 text-white"
                : "border-[#e0e4eb] bg-white text-gray-600 hover:bg-blue-50",
            )}
            aria-label={`${page}페이지`}
            aria-current={isActive ? "page" : undefined}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        );
      })}
    </nav>
  );
}

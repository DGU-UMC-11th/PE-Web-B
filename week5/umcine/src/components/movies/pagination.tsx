import { cn } from "../../utils/cn";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (pageNumber: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
        <nav className="flex items-center justify-center gap-3" aria-label="페이지 이동">
            <button type="button" className="flex" aria-label="이전 페이지">
                <img src="/icons/chevron-left.svg" alt="" />
            </button>

            <ul className="flex items-center gap-1">
                {pageNumbers.map((number) => (
                    <li key={number}>
                        <button
                            type="button"
                            className={cn(
                                "h-9 w-9 rounded-[7px] text-[13px] font-bold",
                                currentPage === number ? "bg-[#17191e] text-white" : "text-[#606774]",
                            )}
                            aria-current={currentPage === number ? "page" : undefined}
                            onClick={() => onPageChange(number)}
                        >
                            {number}
                        </button>
                    </li>
                ))}
            </ul>

            <button type="button" className="flex" aria-label="다음 페이지">
                <img src="/icons/chevron-right.svg" alt="" />
            </button>
        </nav>
    );
}

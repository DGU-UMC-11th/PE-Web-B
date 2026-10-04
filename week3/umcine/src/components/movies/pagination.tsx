import { cn } from "../../utils/cn";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const arrowClass = "grid size-9 place-items-center rounded-lg text-[#667085] hover:bg-gray-200 disabled:opacity-30";
  return <nav className="mt-10 flex justify-center gap-1" aria-label="영화 목록 페이지">
    <button className={arrowClass} disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)} aria-label="이전 페이지"><img className="size-5" src="/icons/chevron-left.svg" alt="" /></button>
    {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => <button key={page} type="button" className={cn("size-9 rounded-lg text-sm font-semibold", currentPage === page ? "bg-[#191b1f] text-white" : "text-[#667085] hover:bg-gray-200")} aria-label={`${page}페이지`} aria-current={currentPage === page ? "page" : undefined} onClick={() => onPageChange(page)}>{page}</button>)}
    <button className={arrowClass} disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)} aria-label="다음 페이지"><img className="size-5" src="/icons/chevron-right.svg" alt="" /></button>
  </nav>;
}


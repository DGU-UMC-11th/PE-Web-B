import "./pagination.css";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (pageNumber: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
        <nav className="pagination" aria-label="페이지 이동">
            <button type="button" className="pagination__arrow" aria-label="이전 페이지">
                <img src="/icons/chevron-left.svg" alt="" />
            </button>

            <ul className="pagination__pages">
                {pageNumbers.map((number) => (
                    <li key={number}>
                        <button
                            type="button"
                            className={currentPage === number ? "pagination__page pagination__page--active" : "pagination__page"}
                            aria-current={currentPage === number ? "page" : undefined}
                            onClick={() => onPageChange(number)}
                        >
                            {number}
                        </button>
                    </li>
                ))}
            </ul>

            <button type="button" className="pagination__arrow" aria-label="다음 페이지">
                <img src="/icons/chevron-right.svg" alt="" />
            </button>
        </nav>
    );
}

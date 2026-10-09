//page-selector.tsx

import { PageContext } from "../../contexts/page-bar-context";
import { useContext } from "react";
import { cn } from "../../utils/cn";

export function PageSelector() {
    const {page, possiblePages, changePage} = useContext(PageContext);

    return (
        <nav aria-label="페이지" className="mt-8 flex justify-center gap-2">
            {possiblePages.map((pageNum) => (
                <button
                    key={pageNum}
                    onClick={() => changePage(pageNum)}
                    aria-current={page === pageNum ? "page" : undefined}
                    className={cn(
                        "size-9 rounded-lg border text-sm font-bold",
                        page === pageNum
                            ? "border-brand bg-brand text-white"
                            : "border-gray-200 bg-white text-gray-600",
                    )}>
                    {pageNum}
                </button>
            ))}
        </nav>
    );
}

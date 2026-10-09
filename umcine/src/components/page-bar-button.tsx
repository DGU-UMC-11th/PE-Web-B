//page-bar-button.tsx

import { usePageBarStore } from "../stores/page-bar-store";
import { cn } from "../utils/cn";

interface PageBarButtonProps {
    pageNum: number;
}

export function PageBarButton({ pageNum }: PageBarButtonProps) {
    const currentPage = usePageBarStore(
        (state) => state.currentPage,
    );
    
    const setPage = usePageBarStore(
        (state) => state.setPage,
    );

    return (<button
        key={pageNum}
        onClick={() => {setPage(pageNum)}}
        aria-current={currentPage === pageNum ? "page" : undefined}
        className={cn(
            "size-9 rounded-lg border text-sm font-bold",
            currentPage === pageNum
                ? "border-brand bg-brand text-white"
                : "border-gray-200 bg-white text-gray-600",
        )}>
        {pageNum}
    </button>);
}

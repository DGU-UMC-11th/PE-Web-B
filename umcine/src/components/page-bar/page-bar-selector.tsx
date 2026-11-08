//page-selector.tsx

import { cn } from "../../utils/cn";

interface PageSelectorProps {
    page: number;
    totalPages: number;
    onChange: (page: number) => void;
}

const buttonClass = "h-9 min-w-9 rounded-lg border border-gray-200 bg-white px-2 text-sm font-bold text-gray-600 disabled:opacity-40";

// 항상 5개 표시: 현재 페이지 ±2, 양 끝에서는 한쪽으로 밀어서 채움
export function PageSelector({ page, totalPages, onChange }: PageSelectorProps) {
    const start = Math.max(1, Math.min(page - 2, totalPages - 4));
    const end = Math.min(totalPages, start + 4);
    const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

    return (
        <nav aria-label="페이지" className="mt-8 flex justify-center gap-2">
            <button type="button" aria-label="맨 처음" disabled={page <= 1} onClick={() => onChange(1)} className={buttonClass}>
                &lt;&lt;
            </button>
            <button type="button" aria-label="이전" disabled={page <= 1} onClick={() => onChange(page - 1)} className={buttonClass}>
                &lt;
            </button>
            {pages.map((pageNum) => (
                <button
                    key={pageNum}
                    type="button"
                    onClick={() => onChange(pageNum)}
                    aria-current={pageNum === page ? "page" : undefined}
                    className={cn(buttonClass, pageNum === page && "border-brand bg-brand text-white")}
                >
                    {pageNum}
                </button>
            ))}
            <button type="button" aria-label="다음" disabled={page >= totalPages} onClick={() => onChange(page + 1)} className={buttonClass}>
                &gt;
            </button>
            <button type="button" aria-label="맨 끝" disabled={page >= totalPages} onClick={() => onChange(totalPages)} className={buttonClass}>
                &gt;&gt;
            </button>
        </nav>
    );
}

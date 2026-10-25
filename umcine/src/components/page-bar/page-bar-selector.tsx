//page-selector.tsx

import { PageBarButton } from "../page-bar-button";
import { possiblePages } from "../../contexts/page-bar-context";

export function PageSelector() {
    return (
        <nav aria-label="페이지" className="mt-8 flex justify-center gap-2">
            {possiblePages.map((pageNum) => (
                <PageBarButton pageNum={pageNum}/>
            ))}
        </nav>
    );
}

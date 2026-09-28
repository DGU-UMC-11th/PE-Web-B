//page-selector.tsx

import { PageContext } from "./page-context";
import {useContext} from "react";

export function PageSelector() {
    const {page, possiblePages, changePage} = useContext(PageContext);
    
    return (<div>
        {possiblePages.map((pageNum) => (
            <button onClick={() => changePage(pageNum)} aria-current="page">
                {page === pageNum ? `[ ${pageNum} ]` : pageNum}
            </button>
        ))}
    </div>);
}
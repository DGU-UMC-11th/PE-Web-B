//page-context.tsx

import { createContext, useState } from "react";

const initialPage: number = 1;
const possiblePages: number[] = [1,2,3,4];

type PageContextType = {
    page: number,
    possiblePages: number[],
    changePage: (page:number) => void,
};
export const PageContext = createContext<PageContextType>({
    page: initialPage,
    possiblePages: possiblePages,
    changePage: () => {},
});

export function PageProvider({ children }) {
    const [page, setPage] = useState<number>(initialPage);

    const changePage = (page: number) => {
        setPage(() => page);
    }

    return (
        <PageContext.Provider value={{page, possiblePages, changePage}}>
            {children}
        </PageContext.Provider>
    );
}
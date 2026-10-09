//page-context.tsx

import { createContext, useState, type ReactNode } from "react";
import { movies } from "../data/movies";

export const PAGE_SIZE = 5;

const initialPage: number = 1;
const possiblePages: number[] = Array.from(
    { length: Math.ceil(movies.length / PAGE_SIZE) },
    (_, i) => i + 1, //(현재 값, index) => 값
);
// const possiblePages: number[] = [1,2,3,4,5];

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

export function PageProvider({ children }: { children: ReactNode }) {
    const [page, setPage] = useState<number>(initialPage);

    return (
        <PageContext.Provider value={{page, possiblePages, changePage: setPage}}>
            {children}
        </PageContext.Provider>
    );
}

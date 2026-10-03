//pagination.tsx

import MovieGrid from "./movie-grid";
import { MovieProvider } from "./movie-context";
import { PageProvider } from "./page-context";
import { PageSelector } from "./page-selector";

export default function Pagination() {
    return (
        <PageProvider>
            <MovieProvider>
                <h2>영화 목록</h2>
                <MovieGrid></MovieGrid>
                <PageSelector></PageSelector>
            </MovieProvider>
        </PageProvider>
    );
}
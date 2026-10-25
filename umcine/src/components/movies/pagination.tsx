//pagination.tsx

import MovieGrid from "./movie-grid";
// import { PageProvider } from "../../contexts/page-bar-context";
import { PageSelector } from "../page-bar/page-bar-selector";

export default function Pagination() {
    return (
        <>
            <h1 className="mb-4 text-4xl font-extrabold">영화 목록</h1>
            <MovieGrid />
            <PageSelector />
        </>
    );
}

import Header from "./components/header";
import MovieGrid from "./components/movie-grid";
import Pagination from "./components/pagination";
import "./App.css";
import { useState } from "react";

export default function App() {
  const [page, setPage] = useState(1);

  return (
    <>
        <Header activeMenu="영화" />
            <main className="main">
                <h1>영화 목록</h1>

                <MovieGrid />

                <Pagination currentPage={page} totalPages={5} onPageChange={setPage} />
            </main>
    </>

  );
}

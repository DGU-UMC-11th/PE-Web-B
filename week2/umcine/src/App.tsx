import { useState } from "react";

import Header from "./components/header";
import MovieGrid from "./components/movie-grid";
import Pagination from "./components/pagination";
import { movies as initialMovies } from "./data/movie";

import "./App.css";

export default function App() {
  const [movies, setMovies] = useState(initialMovies);
  const [currentPage, setCurrentPage] = useState(1);

  function handleToggleBookmark(movieId: number) {
    setMovies((currentMovies) =>
      currentMovies.map((movie) =>
        movie.id === movieId
          ? { ...movie, isBookmarked: !movie.isBookmarked }
          : movie,
      ),
    );
  }

  return (
    <>
      <Header />

      <main className="main">
        <h1>영화 목록</h1>

        <MovieGrid
          movies={movies}
          onToggleBookmark={handleToggleBookmark}
        />

        <Pagination
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </main>
    </>
  );
}
import { useState } from "react";
import Header from "./components/header";
import MovieGrid from "./components/movie-grid";
import Pagination from "./components/pagination";
import { movies as initialMovies } from "./data/movies";
import type { Movie } from "./types/movie";
import "./App.css";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>(initialMovies);
  const [currentPage, setCurrentPage] = useState(1);

  const handleToggleBookmark = (movieId: number) => {
    setMovies((currentMovies) =>
      currentMovies.map((movie) =>
        movie.id === movieId
          ? { ...movie, isBookmarked: !movie.isBookmarked }
          : movie,
      ),
    );
  };

  return (
    <div className="page">
      <Header />

      <main className="container" id="movies">
        <h1 className="page-title">영화 목록</h1>

        <MovieGrid
          movies={movies}
          onToggleBookmark={handleToggleBookmark}
        />
        <Pagination currentPage={currentPage} onPageChange={setCurrentPage} />
      </main>

      <footer>
        <div className="footer-inner">
          <img src="/images/logos/tmdb-logo.svg" alt="TMDB" />
          <p>
            This product uses the TMDB API but is not endorsed or certified by{" "}
            <a href="https://www.themoviedb.org/">TMDB</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}

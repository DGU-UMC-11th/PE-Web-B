import { useState } from "react";
import Header from "./components/header";
import MovieGrid from "./components/movie-grid";
import Pagination from "./components/pagination";
import Footer from "./components/footer";
import SearchPage from "./components/search-page";
import LoginPage from "./components/login-page";
import SignupPage from "./components/signup-page";
import ProfilePage from "./components/profile-page";
import ProfileEditPage from "./components/profile-edit-page";
import MovieDetailPage from "./components/movie-detail-page";
import { movies as initialMovies } from "./data/movies";
import type { Movie } from "./types/movie";
import styles from "./App.module.css";

export type ViewType =
  | "movies"
  | "search"
  | "login"
  | "signup"
  | "profile"
  | "profile-edit"
  | "movie-detail";

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>("movies");
  const [selectedMovieId, setSelectedMovieId] = useState<number>(1);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [nickname, setNickname] = useState<string>("gs0428");
  const [email] = useState<string>("gwangsoo@cinemalab.kr");
  const [movies, setMovies] = useState<Movie[]>(initialMovies);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleToggleBookmark = (id: number) => {
    setMovies((prevMovies) =>
      prevMovies.map((movie) =>
        movie.id === id
          ? { ...movie, isBookmarked: !movie.isBookmarked }
          : movie
      )
    );
  };

  const handleSelectMovie = (id: number) => {
    setSelectedMovieId(id);
    setCurrentView("movie-detail");
  };

  const currentMovie =
    movies.find((m) => m.id === selectedMovieId) ?? movies[0];
  const bookmarkedMovies = movies.filter((m) => m.isBookmarked);

  return (
    <div className={styles.app}>
      <Header
        currentView={currentView}
        isLoggedIn={isLoggedIn}
        onNavigate={(view) => setCurrentView(view as ViewType)}
      />

      <main className={styles.main}>
        {currentView === "movies" && (
          <div className={styles.container}>
            <h1 className={styles.title}>영화 목록</h1>
            <MovieGrid
              movies={movies}
              onToggleBookmark={handleToggleBookmark}
              onSelectMovie={handleSelectMovie}
            />
            <Pagination
              currentPage={currentPage}
              totalPages={1}
              onPageChange={setCurrentPage}
            />
          </div>
        )}

        {currentView === "search" && (
          <SearchPage onSelectMovie={handleSelectMovie} />
        )}

        {currentView === "login" && (
          <LoginPage
            onLoginSuccess={() => {
              setIsLoggedIn(true);
              setCurrentView("profile");
            }}
            onNavigateSignup={() => setCurrentView("signup")}
          />
        )}

        {currentView === "signup" && (
          <SignupPage
            onNavigateLogin={() => setCurrentView("login")}
            onSignupSuccess={() => {
              alert("회원가입이 완료되었습니다! 로그인해 주세요.");
              setCurrentView("login");
            }}
          />
        )}

        {currentView === "profile" && (
          <ProfilePage
            nickname={nickname}
            email={email}
            bookmarkedMovies={bookmarkedMovies}
            onToggleBookmark={handleToggleBookmark}
            onNavigateEdit={() => setCurrentView("profile-edit")}
          />
        )}

        {currentView === "profile-edit" && (
          <ProfileEditPage
            currentNickname={nickname}
            currentEmail={email}
            onSave={(newNickname) => {
              setNickname(newNickname);
              alert("변경사항이 저장되었습니다.");
              setCurrentView("profile");
            }}
            onWithdraw={() => {
              setIsLoggedIn(false);
              alert("회원 탈퇴가 완료되었습니다.");
              setCurrentView("movies");
            }}
          />
        )}

        {currentView === "movie-detail" && (
          <MovieDetailPage
            movie={currentMovie}
            onBack={() => setCurrentView("movies")}
            onToggleBookmark={handleToggleBookmark}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}
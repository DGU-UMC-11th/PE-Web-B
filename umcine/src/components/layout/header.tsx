import { Link, useRouterState } from "@tanstack/react-router";
import { cn } from "../../utils/cn";

const navItem =
  "whitespace-nowrap py-1.5 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900";
const navItemActive = "font-bold text-gray-900";

export default function Header() {
  const pathname = useRouterState({ select: (r) => r.location.pathname });

  // 영화 상세(/movies/$movieId)도 영화 메뉴에 속해요.
  const isMovies = pathname === "/" || pathname.startsWith("/movies/");
  const isSearch = pathname === "/search";

  return (
    <header className="sticky top-0 z-50 h-16 w-full border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-full max-w-[1360px] items-center justify-between gap-3 px-4 sm:px-6 lg:px-10">
        <div className="flex items-center gap-4 sm:gap-9">
          <Link to="/" className="flex shrink-0 select-none items-center gap-2">
            <img src="/movie-icons/movie.svg" alt="UMCine Logo" className="size-6" />
            <span className="text-lg font-extrabold tracking-[-0.3px] text-gray-900 sm:text-xl">
              UMCine
            </span>
          </Link>
          <nav className="flex items-center gap-4 sm:gap-6">
            <Link
              to="/"
              className={cn(navItem, isMovies && navItemActive)}
              aria-current={isMovies ? "page" : undefined}
            >
              영화
            </Link>
            <Link
              to="/search"
              className={cn(navItem, isSearch && navItemActive)}
              aria-current={isSearch ? "page" : undefined}
            >
              검색
            </Link>
            <button type="button" className={navItem}>
              내 정보
            </button>
          </nav>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <Link
            to="/search"
            className="hidden size-9 items-center justify-center rounded-lg border border-gray-200 bg-white transition-colors hover:border-gray-300 hover:bg-gray-50 sm:flex"
            aria-label="영화 검색"
          >
            <img src="/movie-icons/search.svg" alt="" className="size-[18px]" />
          </Link>
          <button
            type="button"
            className="flex h-9 items-center justify-center whitespace-nowrap rounded-lg bg-blue-600 px-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 sm:px-4"
          >
            로그인
          </button>
        </div>
      </div>
    </header>
  );
}

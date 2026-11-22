import { Link, useRouterState } from "@tanstack/react-router";
import { useMeQuery } from "../../hooks/use-me-query.ts";
import { useAuthStore } from "../../stores/auth-store.ts";
import { cn } from "../../utils/cn";

const navItem =
  "whitespace-nowrap py-1.5 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900";
const navItemActive = "font-bold text-gray-900";
const actionButton =
  "flex h-9 items-center justify-center whitespace-nowrap rounded-lg px-3 text-sm font-semibold transition-colors sm:px-4";

// 로그인 상태에 따라 헤더 오른쪽 버튼을 바꿔요.
// 토큰 없음 → 로그인 / 내 정보 불러오는 중 → 스켈레톤 / 로그인됨 → 닉네임(내 정보로 이동)
function HeaderAuthAction() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const meQuery = useMeQuery();

  if (!accessToken) {
    return (
      <Link to="/login" className={cn(actionButton, "bg-blue-600 text-white hover:bg-blue-700")}>
        로그인
      </Link>
    );
  }

  // enabled가 false일 때는 isPending이 계속 true라서, 실제 요청 중인지 보려면 isLoading을 써요.
  if (meQuery.isLoading) {
    return <span className="h-9 w-24 animate-pulse rounded-lg bg-gray-200" aria-label="내 정보 불러오는 중" />;
  }

  return (
    <Link
      to="/me"
      className={cn(actionButton, "gap-2 border border-gray-200 bg-white text-gray-900 hover:border-gray-300 hover:bg-gray-50")}
    >
      <img src="/movie-icons/person.svg" alt="" className="size-[18px] opacity-60" />
      <span className="max-w-[96px] truncate">{meQuery.data?.nickname ?? "마이페이지"}</span>
    </Link>
  );
}

export default function Header() {
  const pathname = useRouterState({ select: (r) => r.location.pathname });

  // 영화 상세(/movies/$movieId)도 영화 메뉴에 속해요.
  const isMovies = pathname === "/" || pathname.startsWith("/movies/");
  const isSearch = pathname === "/search";
  const isProfile = pathname === "/me" || pathname.startsWith("/me/");

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
            <Link
              to="/me"
              className={cn(navItem, isProfile && navItemActive)}
              aria-current={isProfile ? "page" : undefined}
            >
              내 정보
            </Link>
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
          <HeaderAuthAction />
        </div>
      </div>
    </header>
  );
}

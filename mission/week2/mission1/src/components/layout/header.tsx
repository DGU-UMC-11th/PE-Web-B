import { Link } from "@tanstack/react-router";
import { useMeQuery } from "../../hooks/use-me-query";
import { useAuthStore } from "../../stores/auth-store";

const accountButtonClassName =
  "flex h-[42px] items-center rounded-lg bg-primary px-4 text-sm font-extrabold text-white hover:bg-primary-hover";

export function Header() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const meQuery = useMeQuery();

  return (
    <header className="border-b border-line bg-surface">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-20 py-6">
        <div className="flex items-center gap-[42px]">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="flex size-8 items-center justify-center rounded-lg border-2 border-ink">
              <img src="/icons/movie.svg" alt="" width={24} height={24} />
            </span>
            <span className="text-xl font-black tracking-[-0.7px]">UMCine</span>
          </Link>

          <nav className="flex items-center gap-[30px] text-sm font-bold text-ink-secondary">
            <Link to="/" className="hover:text-ink">
              영화
            </Link>
            <Link to="/search" className="hover:text-ink">
              검색
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            to="/search"
            aria-label="영화 검색"
            className="flex size-[42px] items-center justify-center rounded-lg border border-line bg-surface hover:bg-page"
          >
            <img src="/icons/search.svg" alt="" width={24} height={24} />
          </Link>
          {/* 토큰이 없으면 로그인, 첫 조회 중이면 로딩, 그 외에는 마이페이지 */}
          {!accessToken ? (
            <Link to="/login" className={accountButtonClassName}>
              로그인
            </Link>
          ) : meQuery.isLoading ? (
            <span className="h-[42px] w-24 animate-pulse rounded-lg bg-line" aria-label="내 정보 불러오는 중" />
          ) : (
            <Link to="/me" className={accountButtonClassName}>
              마이페이지
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

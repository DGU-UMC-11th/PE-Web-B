import { Link } from "@tanstack/react-router";

export function Header() {
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
            <Link to="/me" className="hover:text-ink">
              내 정보
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
          <Link
            to="/login"
            className="flex h-[42px] items-center rounded-lg bg-primary px-4 text-sm font-extrabold text-white hover:bg-primary-hover"
          >
            로그인
          </Link>
        </div>
      </div>
    </header>
  );
}

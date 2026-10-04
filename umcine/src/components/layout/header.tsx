import { Link } from "@tanstack/react-router";

const navLinkClass =
  "text-sm leading-5 text-gray-600 no-underline underline-offset-4 hover:text-[#191b1f]";

export function Header() {
  return (
    <header className="flex h-[90px] shrink-0 items-center border-b border-gray-200 bg-white">
      <div className="mx-auto flex w-full max-w-[1440px] items-center px-20">
        <Link
          to="/"
          className="flex items-center gap-2.5 text-xl tracking-[-0.6px] text-[#191b1f] no-underline"
          aria-label="UMCine 홈"
        >
          <span className="grid size-8 place-items-center rounded-lg border-2 border-current">
            <img className="size-6" src="/icons/movie.svg" alt="" />
          </span>
          <strong className="font-extrabold">UMCine</strong>
        </Link>

        <nav
          className="ml-11 flex items-center gap-8"
          aria-label="주 메뉴"
        >
          <Link
            to="/"
            className={navLinkClass}
          >
            영화
          </Link>
          <Link
            to="/search"
            className={navLinkClass}
          >
            검색
          </Link>
          <span className={`${navLinkClass} cursor-default`}>내 정보</span>
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <Link
            to="/search"
            className="grid size-[42px] place-items-center rounded-lg border border-[#e0e4eb] bg-white"
            aria-label="영화 검색"
          >
            <img className="size-[22px] opacity-65" src="/icons/search.svg" alt="" />
          </Link>
          <button
            type="button"
            className="h-10 rounded-md bg-blue-600 px-[18px] text-sm font-semibold text-white"
          >
            로그인
          </button>
        </div>
      </div>
    </header>
  );
}

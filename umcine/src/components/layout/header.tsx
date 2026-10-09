import { Link, useLocation } from "@tanstack/react-router";
import { cn } from "../../utils/cn";

const navLinkClass =
  "text-sm leading-5 text-gray-600 no-underline underline-offset-4 hover:text-[#191b1f]";
const activeNavLinkClass = "font-semibold text-[#191b1f] underline";

export function Header() {
  const pathname = useLocation({ select: (location) => location.pathname });
  const isMoviesActive = pathname === "/" || pathname.startsWith("/movies");
  const isSearchActive = pathname.startsWith("/search");

  return (
    <header className="flex h-auto min-h-[104px] shrink-0 items-center border-b border-gray-200 bg-white py-3 sm:h-[76px] sm:min-h-0 sm:py-0 md:h-[90px]">
      <div className="mx-auto flex w-full max-w-[1440px] flex-wrap items-center gap-y-3.5 px-4 sm:flex-nowrap sm:px-6 md:px-8 xl:px-20">
        <Link
          to="/"
          className="flex items-center gap-2.5 text-lg tracking-[-0.6px] text-[#191b1f] no-underline sm:text-xl"
          aria-label="UMCine 홈"
        >
          <span className="grid size-8 place-items-center rounded-lg border-2 border-current">
            <img className="size-6" src="/icons/movie.svg" alt="" />
          </span>
          <strong className="font-extrabold">UMCine</strong>
        </Link>

        <nav
          className="order-3 flex w-full items-center gap-5 sm:order-none sm:ml-7 sm:w-auto md:ml-11 md:gap-8"
          aria-label="주 메뉴"
        >
          <Link
            to="/"
            className={cn(navLinkClass, isMoviesActive && activeNavLinkClass)}
            aria-current={isMoviesActive ? "page" : undefined}
          >
            영화
          </Link>
          <Link
            to="/search"
            className={cn(navLinkClass, isSearchActive && activeNavLinkClass)}
            aria-current={isSearchActive ? "page" : undefined}
          >
            검색
          </Link>
          <span className={cn(navLinkClass, "cursor-default")}>내 정보</span>
        </nav>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <Link
            to="/search"
            className="grid size-9 place-items-center rounded-lg border border-[#e0e4eb] bg-white sm:size-[42px]"
            aria-label="영화 검색"
          >
            <img className="size-[22px] opacity-65" src="/icons/search.svg" alt="" />
          </Link>
          <button
            type="button"
            className="h-9 rounded-md bg-blue-600 px-3.5 text-sm font-semibold text-white sm:h-10 sm:px-[18px]"
          >
            로그인
          </button>
        </div>
      </div>
    </header>
  );
}

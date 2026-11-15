import { Link, useRouterState } from "@tanstack/react-router";
import { cn } from "../../utils/cn";

export function Header() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const navClass = (active: boolean) => cn("text-sm leading-5", active ? "font-semibold text-[#191b1f] underline underline-offset-4" : "text-[#667085] hover:text-[#191b1f]");
  return <header className="flex h-[90px] shrink-0 items-center border-b border-[#e0e4eb] bg-white max-[760px]:h-[76px] max-[540px]:h-auto max-[540px]:min-h-[104px] max-[540px]:py-3">
    <div className="mx-auto flex w-full max-w-[1440px] items-center px-20 max-[1100px]:px-8 max-[760px]:px-6 max-[540px]:flex-wrap max-[540px]:gap-y-[14px] max-[540px]:px-4">
      <Link className="flex items-center gap-[10px] text-xl tracking-[-0.6px]" to="/" aria-label="UMCine 홈"><span className="grid size-8 place-items-center rounded-lg border-2"><img className="size-6" src="/icons/movie.svg" alt="" /></span><strong className="font-extrabold">UMCine</strong></Link>
      <nav className="ml-11 flex items-center gap-8 max-[760px]:ml-7 max-[760px]:gap-5 max-[540px]:order-3 max-[540px]:ml-0 max-[540px]:w-full" aria-label="주 메뉴">
        <Link className={navClass(pathname === "/" || pathname.startsWith("/movies/"))} to="/">영화</Link>
        <Link className={navClass(pathname === "/search")} to="/search" search={{}}>검색</Link>
        <Link className={navClass(pathname.startsWith("/mypage"))} to="/mypage">내 정보</Link>
      </nav>
      <div className="ml-auto flex items-center gap-3 max-[540px]:gap-2">
        <Link to="/search" search={{}} className="grid size-[42px] place-items-center rounded-lg border border-[#e0e4eb] bg-white max-[540px]:size-9" aria-label="영화 검색"><img className="size-[22px] opacity-65" src="/icons/search.svg" alt="" /></Link>
        <Link to="/login" className="flex h-10 items-center rounded-md bg-[#2563eb] px-[18px] text-sm font-semibold text-white max-[540px]:h-9 max-[540px]:px-[14px]">로그인</Link>
      </div>
    </div>
  </header>;
}

